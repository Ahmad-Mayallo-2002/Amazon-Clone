import type { IdAndDate } from "./IdAndDate";
import type { Product } from "./product";

export interface WishItem extends IdAndDate {
  product: Product;
  wishId: string;
}

export interface Wish extends IdAndDate {
  userId: string;
  wishItems: WishItem[];
}
