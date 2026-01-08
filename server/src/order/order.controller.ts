import { inject, injectable } from "inversify";
import { OrderService } from "./order.service";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { CREATED, CREATED_REASON, OK, OK_REASON } from "../utils/statusCodes";
import { OrderStatus } from "../enums/order-status.enum";

@injectable()
export class OrderController {
  constructor(@inject(OrderService) private orderService: OrderService) {}

  getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skip, take } = req.query;
      const { data, pagination } = await this.orderService.getAllOrders(
        Number(skip) || 0,
        Number(take)
      );
      return sendResponse(res, data, OK, OK_REASON, pagination);
    } catch (error) {
      next(error);
    }
  };

  getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const { skip, take } = req.query;
      const { data, pagination } = await this.orderService.getUserOrders(
        userId,
        Number(skip) || 0,
        Number(take)
      );
      return sendResponse(res, data, OK, OK_REASON, pagination);
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

  getOrdersItemsByVendorId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { vendorId } = req.params;
      const { take, skip, status } = req.query;
      const { data, pagination } =
        await this.orderService.getOrdersItemsByVendorId(
          vendorId,
          Number(take),
          Number(skip) || 0,
          status as OrderStatus
        );
      return sendResponse(res, data, OK, OK_REASON, pagination);
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
      const { status } = req.body;
      const message = await this.orderService.updateOrderStatus(id, status);
      return sendResponse(res, message, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.orderService.createOrder(
        (req as any).user.id,
        req.body
      );
      return sendResponse(res, result, CREATED, CREATED_REASON);
    } catch (error) {
      next(error);
    }
  };
}
