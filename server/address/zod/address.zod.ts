import { infer as zInfer, object, string } from "zod";

export const AddressSchema = object({
  street: string().max(255),
  city: string().max(100),
  state: string().max(100),
  postalCode: string().max(20),
});

const updateAddress = AddressSchema.partial();

export type CreateAddress = zInfer<typeof AddressSchema>;
export type UpdateAddress = zInfer<typeof updateAddress>;
