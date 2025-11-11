import { infer as zInfer, email, object, string } from "zod";

export const LoginShema = object({
  email: email({ pattern: /^[A-Za-z0-9][A-Za-z0-9._%+-]*@gmail\.com$/ }),
  password: string().min(8).max(20),
});

export type Login = zInfer<typeof LoginShema>;
