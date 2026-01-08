import { injectable } from "inversify";
import { Repository } from "typeorm";
import { Payment } from "./payment.entity";
import { AppDataSource } from "../data-source";
import AppError from "../utils/appError";
import { NOT_FOUND, NOT_FOUND_REASON } from "../utils/statusCodes";
import { PaymentStatus } from "../enums/payment-status.enum";
import { CreatePayment } from "./zod/payment.zod";
import { PaginatedDate } from "../interfaces/paginated-data.interface";
import { calculatePagination } from "../utils/calculatePagination";
import { stripe } from "../utils/stripe";

@injectable()
export class PaymentService {
  private paymentRepo: Repository<Payment> =
    AppDataSource.getRepository(Payment);

  getAllPayments = async (
    skip: number = 0,
    take: number
  ): Promise<PaginatedDate<Payment>> => {
    const [payments, count] = await this.paymentRepo.findAndCount({
      order: { createdAt: "DESC" },
      take,
      skip,
      relations: {
        order: true,
      },
    });
    if (!payments.length)
      throw new AppError("No payments found", NOT_FOUND, NOT_FOUND_REASON);
    const pagination = calculatePagination(count, skip, take);
    return { data: payments, pagination };
  };

  getPaymentById = async (id: string): Promise<Payment> => {
    const payment = await this.paymentRepo.findOne({ where: { id } });
    if (!payment)
      throw new AppError("No payment found", NOT_FOUND, NOT_FOUND_REASON);
    return payment;
  };

  deletePayment = async (id: string): Promise<string> => {
    const payment = await this.getPaymentById(id);
    await this.paymentRepo.remove(payment);
    return "Payment deleted successfully";
  };

  updatePaymentStatus = async (
    id: string,
    status: PaymentStatus
  ): Promise<string> => {
    const payment = await this.getPaymentById(id);
    if (status === PaymentStatus.REFUNDED) {
      await stripe.refunds.create({
        payment_intent: payment.providerPaymentId,
      });
    }
    payment.status = status;
    await this.paymentRepo.save(payment);
    return `Payment is ${status}`;
  };

  createPayment = async (data: CreatePayment): Promise<Payment> => {
    const payment = this.paymentRepo.create(data);
    return await this.paymentRepo.save(payment);
  };
}
