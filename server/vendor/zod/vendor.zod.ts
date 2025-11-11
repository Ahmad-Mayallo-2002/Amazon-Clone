import { infer as zInfer, object, string } from "zod";
import { UserSchema } from "../../user/zod/user.zod";

export const VendorSchema = object({
  ...UserSchema,
  storeName: string(),
  storeDescription: string(),
});

const updateVendor = UserSchema.partial();

export type CreateVendor = zInfer<typeof UserSchema>;
export type UpdateVendor = zInfer<typeof updateVendor>;
