import type { Category } from "./category";
import type { IdAndDate } from "./IdAndDate";

export interface Product extends IdAndDate {
  title: string;
  description: string;
  price: number;
  stock: number;
  discount: number;
  vendorId: string;
  categoryId: string;
  category: Category;
}
