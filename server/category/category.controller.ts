import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { sendResponse } from "../utils/sendResponse";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { CREATED, CREATED_REASON, OK, OK_REASON } from "../utils/statusCodes";

@injectable()
export class CategoryController {
  constructor(
    @inject(CategoryService) private categoryService: CategoryService
  ) {}

  createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CreateCategoryDto = req.body;
      const category = await this.categoryService.createCategory(dto);
      return sendResponse(res, category, CREATED, CREATED_REASON);
    } catch (error) {
      next(error);
    }
  };

  getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categories = await this.categoryService.getAllCategories();
      return sendResponse(res, categories, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const category = await this.categoryService.getCategoryById(id);
      return sendResponse(res, category, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const dto: UpdateCategoryDto = req.body;
      const category = await this.categoryService.updateCategory(id, dto);
      return sendResponse(res, category, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.categoryService.deleteCategory(id);
      return sendResponse(res, result, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };
}
