import { infer as zInfer, email, object, string } from "zod";

export const UserSchema = object({
  username: string().min(5).max(20),
  email: email({
    pattern: /^[A-Za-z0-9][A-Za-z0-9._%+-]*@gmail\.com$/,
  }),
  password: string().min(8).max(20),
  phone: string().regex(/^\+[1-9]\d{1,14}$/),
});

const updateUser = UserSchema.partial();

export type CreateUser = zInfer<typeof UserSchema>;
export type UpdateUser = zInfer<typeof updateUser>;
