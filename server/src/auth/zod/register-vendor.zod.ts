import { infer as zInfer, email, object, string, uuid } from "zod";

export const RegisterVendorSchema = object({
  username: string().min(5).max(20),
  email: email({
    pattern: /^[A-Za-z0-9][A-Za-z0-9._%+-]*@gmail\.com$/,
  }),
  password: string().min(8).max(20),
  phone: string().regex(/^\+[1-9]\d{1,14}$/),
  storeName: string(),
  storeDescription: string(),
});

export type RegisterVendor = zInfer<typeof RegisterVendorSchema>;
