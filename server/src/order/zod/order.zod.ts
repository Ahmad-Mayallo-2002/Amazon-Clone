import { object, string, infer as zInfer } from "zod";

export const OrderSchema = object({
  street: string().max(255),
  city: string().max(100),
  country: string().max(100),
  state: string().max(100),
  postalCode: string().max(20),
});

const updateOrder = OrderSchema.partial();

export type CreateOrder = zInfer<typeof OrderSchema>;
export type UpdateOrder = zInfer<typeof updateOrder>;
