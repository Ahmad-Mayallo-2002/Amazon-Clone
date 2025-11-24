import { infer as zInfer, object, string } from "zod";

export const VendorSchema = object({
  storeName: string(),
  storeDescription: string(),
});

const updateVendor = VendorSchema.partial();

export type CreateVendor = zInfer<typeof VendorSchema>;
export type UpdateVendor = zInfer<typeof updateVendor>;
