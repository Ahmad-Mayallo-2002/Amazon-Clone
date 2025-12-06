import type { IdAndDate } from "./IdAndDate";
import type { Product } from "./product";
import type { User } from "./user";

export interface Review extends IdAndDate {
  value: number;
  productId: string;
  userId: string;
  product: Product;
  user: User;
}
