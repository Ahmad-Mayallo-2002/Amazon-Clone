import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import { CategoryService } from "./category.service";
import { sendResponse } from "../utils/sendResponse";
import { CREATED, CREATED_REASON, OK, OK_REASON } from "../utils/statusCodes";

@injectable()
export class CategoryController {
  constructor(
    @inject(CategoryService) private categoryService: CategoryService
  ) {}

  createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.categoryService.createCategory(req.body);
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
      const { skip, take } = req.query;
      const { data, pagination } = await this.categoryService.getAllCategories(
        Number(skip) || 0,
        Number(take) || 12
      );
      return sendResponse(res, data, OK, OK_REASON, pagination);
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
      const category = await this.categoryService.updateCategory(id, req.body);
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
