import type { Roles } from "@/enums/roles";

export interface ILogin {
  token: string;
  id: string;
  role: Roles;
}
