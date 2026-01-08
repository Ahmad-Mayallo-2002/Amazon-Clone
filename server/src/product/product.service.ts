import { injectable } from "inversify";
import {
  ILike,
  Raw,
  Repository,
  MoreThanOrEqual,
  LessThanOrEqual,
  Between,
  Equal,
} from "typeorm";
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
import { calculatePagination } from "../utils/calculatePagination";
import { SortBy } from "../types/sortBy.type";
import { OrderBy } from "../enums/order-by.enum";
import { CloudinaryUpload } from "../utils/cloudinaryUpload";
import { v2 } from "cloudinary";

@injectable()
export class ProductService {
  private productRepo: Repository<Product> =
    AppDataSource.getRepository(Product);

  async createProduct(data: CreateProduct, vendorId: string) {
    const strategy = new UploadContext(new CloudinaryUpload());
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

  async getAllProducts(
    skip: number,
    take: number,
    category: string,
    rating: number,
    minPrice: number,
    maxPrice: number,
    sortBy: SortBy,
    orderBy: OrderBy
  ): Promise<PaginatedDate<Product>> {
    const options: any = {
      take,
      skip,
      relations: { category: true },
      where: {},
      order: {},
    };

    if (category) options.where.category = { name: category };
    if (rating)
      options.where.rating =
        rating < 5 ? Between(rating, rating + 1) : Equal(5);
    if (!isNaN(minPrice)) options.where.price = MoreThanOrEqual(minPrice);
    if (!isNaN(maxPrice)) options.where.price = LessThanOrEqual(maxPrice);
    if (sortBy) options.order = { [sortBy]: orderBy };

    const [products, counts] = await this.productRepo.findAndCount(options);

    if (!counts)
      throw new AppError("No products found", NOT_FOUND, NOT_FOUND_REASON);

    const pagination = calculatePagination(counts, skip, take);
    return { data: products, pagination };
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

  async getProductsByCategory(
    category: string,
    skip: number,
    take: number
  ): Promise<PaginatedDate<Product>> {
    const products = await this.productRepo.find({
      where: { category: { name: ILike(category) } },
      relations: ["category"],
      take,
      skip,
    });
    const counts = await this.productRepo.count({
      where: { category: { name: ILike(category) } },
    });
    if (!counts)
      throw new AppError("No products found", NOT_FOUND, NOT_FOUND_REASON);
    const pagination = calculatePagination(counts, skip, take);
    return { data: products, pagination };
  }

  async getProductsByVendorId(
    vendorId: string,
    take: number,
    skip: number,
    category?: string,
    stockStatus?: boolean
  ): Promise<PaginatedDate<Product>> {
    const find: any = {
      take,
      skip,
      where: { vendorId },
      relations: {
        category: true,
      },
    };
    if (category) find.where.category = { name: category };
    if (stockStatus !== undefined)
      find.where.stock = stockStatus ? MoreThanOrEqual(0) : 0;
    const products = await this.productRepo.find({
      take,
      skip,
      where: { vendorId },
      relations: {
        category: true,
      },
      order: {
        createdAt: "ASC",
      },
    });
    if (!products.length)
      throw new AppError("No products found", NOT_FOUND, NOT_FOUND_REASON);
    const counts = await this.productRepo.count({ where: { vendorId } });
    const pagination = calculatePagination(counts, skip, take);
    return { data: products, pagination };
  }

  async searchProducts(
    search: string,
    skip: number,
    take: number
  ): Promise<PaginatedDate<Product>> {
    const [products, counts] = await this.productRepo.findAndCount({
      skip,
      take,
      where: {
        title: Raw((alias) => `${alias} ~* :pattern`, { pattern: search }),
      },
    });
    if (!counts)
      throw new AppError("No products found", NOT_FOUND, NOT_FOUND_REASON);
    const pagination = calculatePagination(counts, skip, take);
    return { data: products, pagination };
  }

  async updateProduct(
    id: string,
    data: UpdateProduct,
    vendorId: string
  ): Promise<string> {
    const product = await this.productRepo.findOne({ where: { id, vendorId } });
    if (!product)
      throw new AppError("Product not found", NOT_FOUND, NOT_FOUND_REASON);
    const body: Record<any, any> = { ...data };
    if (body.categoryId) body.category = { id: data.categoryId };
    if (data.image) {
      const context = new UploadContext(new CloudinaryUpload());
      const res = await context.performStrategy(data.image);
      if (typeof res === "string") {
        body.image = { url: res, public_id: "" };
        unlinkSync(join(__dirname, "../images/", product.image.url));
      } else {
        body.image = { url: res.secure_url, public_id: res.public_id };
        await v2.api.delete_resources([product.image.public_id]);
      }
    }
    await this.productRepo.save(Object.assign(product, body));
    return "Product updated successfully";
  }

  async deleteProduct(id: string, vendorId: string): Promise<string> {
    const product = await this.productRepo.findOne({ where: { id, vendorId } });
    if (!product)
      throw new AppError("Product not found", NOT_FOUND, NOT_FOUND_REASON);
    if (product.image.public_id)
      await v2.api.delete_resources([product.image.public_id]);
    else unlinkSync(join(__dirname, "../images/", product.image.url));

    await this.productRepo.remove(product);
    return "Product deleted successfully";
  }
}
