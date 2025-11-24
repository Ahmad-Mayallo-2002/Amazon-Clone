import { object, string, uuid, infer as zInfer, enum as enum_ } from "zod";
import { PaymentStatus } from "../../enums/payment-status.enum";

export const PaymentSchema = object({
  status: enum_(PaymentStatus).default(PaymentStatus.PENDING),
  providerPaymentId: string(),
  orderId: uuid(),
});

const updatePayment = PaymentSchema.partial();

export type CreatePayment = zInfer<typeof PaymentSchema>;
export type UpdatePayment = zInfer<typeof updatePayment>;
