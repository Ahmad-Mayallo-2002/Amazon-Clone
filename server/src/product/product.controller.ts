import { inject, injectable } from "inversify";
import { ProductService } from "./product.service";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { CREATED, CREATED_REASON, OK, OK_REASON } from "../utils/statusCodes";

@injectable()
export class ProductController {
  constructor(@inject(ProductService) private productService: ProductService) {}

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body.image = req.file;
      const product = await this.productService.createProduct(
        req.body,
        (req as any).user.vendorId
      );
      return sendResponse(res, product, CREATED, CREATED_REASON);
    } catch (error) {
      console.log(req.body);
      next(error);
    }
  };

  getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skip, take } = req.query;
      const { data, pagination } = await this.productService.getAllProducts(
        Number(skip) || 0,
        Number(take)
      );
      return sendResponse(res, data, OK, OK_REASON, pagination);
    } catch (error) {
      next(error);
    }
  };

  getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.productService.getProductById(req.params.id);
      return sendResponse(res, product, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  getProductsByCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { skip, take, category } = req.query;
      const { data, pagination } =
        await this.productService.getProductsByCategory(
          String(category),
          Number(skip) || 0,
          Number(take)
        );
      return sendResponse(res, data, OK, OK_REASON, pagination);
    } catch (error) {
      next(error);
    }
  };

  searchProducts = async (req: Request, res: Response, next: NextFunction) => {
    const { search, skip, take } = req.query;
    const { data, pagination } = await this.productService.searchProducts(
      String(search) || "",
      Number(skip) || 0,
      Number(take)
    );
    return sendResponse(res, data, OK, OK_REASON, pagination);
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.file) req.body.image = req.file;
      const { id, vendorId } = req.params;
      const message = await this.productService.updateProduct(
        id,
        req.body,
        vendorId
      );
      return sendResponse(res, message, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, vendorId } = req.params;
      const message = await this.productService.deleteProduct(id, vendorId);
      return sendResponse(res, message, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };
}
