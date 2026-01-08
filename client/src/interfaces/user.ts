import type { Roles } from "@/enums/roles";
import type { IdAndDate } from "./IdAndDate";

export interface User extends IdAndDate {
  email: string;
  username: string;
  phone: string;
  role: Roles;
  googleId: string;
}

export interface Vendor extends IdAndDate {
  storeDescription: string;
  storeName: string;
  isVerified: boolean;
  userId: string;
  user: User;
}