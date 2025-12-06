import type { IdAndDate } from "./IdAndDate";
import type { User } from "./user";

export interface Address extends IdAndDate {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  userId: string;
  orderId: string;
  user: User;
}
