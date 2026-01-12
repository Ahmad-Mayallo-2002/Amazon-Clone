import { inject, injectable } from "inversify";
import { CartService } from "./cart.service";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { OK, OK_REASON } from "../utils/statusCodes";

@injectable()
export class CartController {
  constructor(@inject(CartService) private cartService: CartService) {}

  addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = await this.cartService.addToCart(
        req.params.productId,
        (req as any).user.id,
      );
      return sendResponse(res, message, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  deleteCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = await this.cartService.deleteById(req.params.id);
      return sendResponse(res, message, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  getByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cart = await this.cartService.getByUserId(req.params.userId);
      return sendResponse(res, cart, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skip, take } = req.query;
      const { data, pagination } = await this.cartService.getAll(
        Number(skip) || 0,
        Number(take) || 12
      );
      return sendResponse(res, data, OK, OK_REASON, pagination);
    } catch (error) {
      next(error);
    }
  };

  removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;
      const { cartId } = req.headers;
      const result = await this.cartService.removeFromCart(
        cartId as string,
        productId
      );
      return sendResponse(res, result, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };
}
