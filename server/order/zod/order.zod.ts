import { object, string, enum as enum_, infer as zInfer } from "zod";
import { PaymentProvider } from "../../enums/payment-provider.enum";

export const OrderSchema = object({
  street: string().max(255),
  city: string().max(100),
  country: string().max(100),
  state: string().max(100),
  postalCode: string().max(20),
  provider: enum_(PaymentProvider)
});

const updateOrder = OrderSchema.partial();

export type CreateOrder = zInfer<typeof OrderSchema>;
export type UpdateOrder = zInfer<typeof updateOrder>;
