import type { IdAndDate } from "./IdAndDate";
import type { Product } from "./product";

export interface Wish extends IdAndDate {
  userId: string;
  products: Product[];
}
