import type { IdAndDate } from "./IdAndDate";
import type { Product } from "./product";
import type { User } from "./user";

export interface Comment extends IdAndDate {
  productId: string;
  product: Product;
  content: string;
  userId: string;
  user: User;
}
