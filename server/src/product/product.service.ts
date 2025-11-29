import { injectable } from "inversify";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { AppDataSource } from "../data-source";
import AppError from "../utils/appError";
import { NOT_FOUND, NOT_FOUND_REASON } from "../utils/statusCodes";
import { CreateProduct, UpdateProduct } from "./zod/product.zod";
import { UploadContext } from "../utils/uploadContext";
import { Image } from "../types/image.type";
import { LocalUpload } from "../utils/localUpload";
import { unlinkSync } from "fs";
import { join } from "path";
import { log } from "console";
import { PaginatedDate } from "../interfaces/paginated-data.interface";

@injectable()
export class ProductService {
  private productRepo: Repository<Product> =
    AppDataSource.getRepository(Product);

  async createProduct(data: CreateProduct, vendorId: string) {
    const strategy = new UploadContext(new LocalUpload());
    const result = await strategy.performStrategy(data.image);
    const image: Image = {
      public_id: "",
      url: "",
    };
    if (typeof result === "string") {
      image.url = result;
    } else {
      image.url = result.secure_url;
      image.public_id = result.public_id;
    }
    const product = this.productRepo.create({
      ...data,
      image,
      vendorId,
      vendor: { id: vendorId },
      category: { id: data.categoryId },
    });
    return await this.productRepo.save(product);
  }

  async getAllProducts(): Promise<PaginatedDate<Product>> {
    const products: Product[] = await this.productRepo.find({
      relations: ["category"],
    });
    const counts = await this.productRepo.count();
    if (!products.length)
      throw new AppError("No products found", NOT_FOUND, NOT_FOUND_REASON);
    return {
      data: products,
      counts,
    };
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ["category"],
    });
    if (!product)
      throw new AppError("Product not found", NOT_FOUND, NOT_FOUND_REASON);
    return product;
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const products = await this.productRepo.find({
      where: { categoryId },
      relations: ["category"],
    });
    if (!products.length)
      throw new AppError("No products found", NOT_FOUND, NOT_FOUND_REASON);
    return products;
  }

  async updateProduct(
    id: string,
    data: UpdateProduct,
    vendorId: string
  ): Promise<string> {
    const product = await this.productRepo.findOne({where: { id, vendorId } });
    if (!product)
      throw new AppError("Product not found", NOT_FOUND, NOT_FOUND_REASON);
    const body: Record<any, any> = { ...data };
    if (body.categoryId) body.category = { id: data.categoryId };
    if (data.image) {
      const context = new UploadContext(new LocalUpload());
      const res = await context.performStrategy(data.image);
      if (typeof res === "string") body.image = { url: res, public_id: "" };
      unlinkSync(join(__dirname, "../images/", product.image.url));
    }
    await this.productRepo.save(Object.assign(product, body));
    return "Product updated successfully";
  }

  async deleteProduct(id: string, vendorId: string): Promise<string> {
    const product = await this.productRepo.findOne({ where: { id, vendorId } });
    if (!product)
      throw new AppError("Product not found", NOT_FOUND, NOT_FOUND_REASON);
    unlinkSync(join(__dirname, "../images/", product.image.url));
    await this.productRepo.remove(product);
    return "Product deleted successfully";
  }
}
