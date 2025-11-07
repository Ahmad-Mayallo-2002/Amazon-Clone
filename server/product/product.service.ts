import { injectable } from "inversify";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { AppDataSource } from "../data-source";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import AppError from "../utils/appError";
import { NOT_FOUND, NOT_FOUND_REASON } from "../utils/statusCodes";

@injectable()
export class ProductService {
  private productRepo: Repository<Product>;

  constructor() {
    this.productRepo = AppDataSource.getRepository(Product);
  }

  async createProduct(data: CreateProductDto) {
    const product = this.productRepo.create(data);
    return await this.productRepo.save(product);
  }

  async getAllProducts(): Promise<Product[]> {
    const products: Product[] = await this.productRepo.find();
    if (!products.length)
      throw new AppError("No products found", NOT_FOUND, NOT_FOUND_REASON);
    return products;
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product)
      throw new AppError("Product not found", NOT_FOUND, NOT_FOUND_REASON);
    return product;
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const products = await this.productRepo.find({
      where: { categoryId },
    });
    if (!products.length)
      throw new AppError("No products found", NOT_FOUND, NOT_FOUND_REASON);
    return products;
  }

  async updateProduct(id: string, data: UpdateProductDto): Promise<string> {
    const product = await this.getProductById(id);
    await this.productRepo.save(Object.assign(product, data));
    return "Product updated successfully";
  }

  async deleteProduct(id: string): Promise<string> {
    const product = await this.getProductById(id);
    await this.productRepo.remove(product);
    return "Product deleted successfully";
  }
}
