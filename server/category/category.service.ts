import { injectable } from "inversify";
import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { AppDataSource } from "../data-source";
import AppError from "../utils/appError";
import { NOT_FOUND, NOT_FOUND_REASON } from "../utils/statusCodes";
import { CreateCategoryType, UpdateCategoryType } from "./zod/category.zod";

@injectable()
export class CategoryService {
  private categoryRepo: Repository<Category>;

  constructor() {
    this.categoryRepo = AppDataSource.getRepository(Category);
  }

  async createCategory(data: CreateCategoryType): Promise<Category> {
    const category = this.categoryRepo.create(data);
    return await this.categoryRepo.save(category);
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepo.find();
    if (!categories.length)
      throw new AppError("No categories found", NOT_FOUND, NOT_FOUND_REASON);
    return categories;
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category)
      throw new AppError("Category not found", NOT_FOUND, NOT_FOUND_REASON);
    return category;
  }

  async updateCategory(id: string, data: UpdateCategoryType): Promise<string> {
    const category = await this.getCategoryById(id);
    await this.categoryRepo.save(Object.assign(category, data));
    return "Category updated successfully";
  }

  async deleteCategory(id: string): Promise<string> {
    const category = await this.getCategoryById(id);
    await this.categoryRepo.remove(category);
    return "Category deleted successfully";
  }
}
