import { Roles } from "../enums/role.enum";

export interface ILogin {
  id: string;
  role: Roles;
  vendorId?: string;
  token: string;
}