import { inject, injectable } from "inversify";
import { WishService } from "./wish.service";
import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/sendResponse";
import { CREATED, CREATED_REASON, OK, OK_REASON } from "../utils/statusCodes";

@injectable()
export class WishController {
  constructor(@inject(WishService) private wishService: WishService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skip, take } = req.query;
      const { data, pagination } = await this.wishService.getAll(
        Number(skip) || 0,
        Number(take) || 12
      );
      return sendResponse(res, data, OK, OK_REASON, pagination);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const wish = await this.wishService.getById(id);
      return sendResponse(res, wish, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  getByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const wish = await this.wishService.getByUserId(userId);
      return sendResponse(res, wish, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  addToWish = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.wishService.addToWish(
        req.params.productId,
        (req as any).user.id
      );
      return sendResponse(res, result, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  removeFromWish = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;
      const { wishId } = req.headers;
      const result = await this.wishService.removeFromWish(
        productId,
        wishId as string
      );
      return sendResponse(res, result, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };
}
