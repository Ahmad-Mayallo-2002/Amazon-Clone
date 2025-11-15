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
      const products = await this.productService.getAllProducts();
      return sendResponse(res, products, OK, OK_REASON);
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
      const products = await this.productService.getProductsByCategory(
        req.params.categoryId
      );
      return sendResponse(res, products, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = await this.productService.updateProduct(
        req.params.id,
        req.body
      );
      return sendResponse(res, message, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = await this.productService.deleteProduct(req.params.id);
      return sendResponse(res, message, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };
}
