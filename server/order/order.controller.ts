import { inject, injectable } from "inversify";
import { OrderService } from "./order.service";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { OK, OK_REASON } from "../utils/statusCodes";

@injectable()
export class OrderController {
  constructor(@inject(OrderService) private orderService: OrderService) {}

  getAllOrders = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await this.orderService.getAllOrders();
      return sendResponse(res, orders, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const orders = await this.orderService.getUserOrders(userId);
      return sendResponse(res, orders, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const order = await this.orderService.getOrder(id);
      return sendResponse(res, order, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const message = await this.orderService.deleteOrder(id);
      return sendResponse(res, message, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  updateOrderStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const message = await this.orderService.updateOrderStatus(id, req.body.status);
      return sendResponse(res, message, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };
  
  createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.orderService.createOrder((req as any).user.id, req.body)
    } catch (error) {
      next(error);
    }
  }
}
