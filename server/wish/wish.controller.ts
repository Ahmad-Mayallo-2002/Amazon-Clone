import { inject, injectable } from "inversify";
import { WishService } from "./wish.service";
import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/sendResponse";
import { CREATED, CREATED_REASON, OK, OK_REASON } from "../utils/statusCodes";
import { CreateWishDTO } from "./dto/create-wish.dto";

@injectable()
export class WishController {
  constructor(@inject(WishService) private wishService: WishService) {}

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const wishes = await this.wishService.getAll();
      return sendResponse(res, wishes, OK, OK_REASON);
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

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CreateWishDTO = req.body;
      const wish = await this.wishService.create(dto);
      return sendResponse(res, wish, CREATED, CREATED_REASON);
    } catch (error) {
      next(error);
    }
  };

  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.wishService.deleteById(id);
      return sendResponse(res, result, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  addToWish = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { wishId, productId } = req.body;
      const result = await this.wishService.addToWish(productId, wishId);
      return sendResponse(res, result, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  removeFromWish = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { wishId, productId } = req.body;
      const result = await this.wishService.removeFromWish(productId, wishId);
      return sendResponse(res, result, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };
}
