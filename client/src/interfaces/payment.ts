import type { PaymentStatus } from "@/enums/payment-status";
import type { IdAndDate } from "./IdAndDate";
import type { Order } from "./order";

export interface Payment extends IdAndDate {
  orderId: string;
  order: Order;
  status: PaymentStatus;
  providerPaymentId: string;
}
