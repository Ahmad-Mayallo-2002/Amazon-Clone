import { inject, injectable } from "inversify";
import { PaymentService } from "./payment.service";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { CREATED, CREATED_REASON, OK, OK_REASON } from "../utils/statusCodes";

@injectable()
export class PaymentController {
  constructor(@inject(PaymentService) private paymentService: PaymentService) {}

  getAllPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skip, take } = req.query;
      const { data, pagination } = await this.paymentService.getAllPayments(
        Number(skip) || 0,
        Number(take) || 10
      );
      return sendResponse(res, data, OK, OK_REASON, pagination);
    } catch (error) {
      next(error);
    }
  };

  getPaymentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const payment = await this.paymentService.getPaymentById(id);
      return sendResponse(res, payment, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payment = await this.paymentService.createPayment(req.body);
      return sendResponse(res, payment, CREATED, CREATED_REASON);
    } catch (error) {
      next(error);
    }
  };

  updatePaymentStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const message = await this.paymentService.updatePaymentStatus(
        id,
        req.body.status
      );
      return sendResponse(res, message, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  deletePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const message = await this.paymentService.deletePayment(id);
      return sendResponse(res, message, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };
}
