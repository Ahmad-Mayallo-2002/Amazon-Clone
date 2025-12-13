import type { Category } from "./category";
import type { IdAndDate } from "./IdAndDate";

export interface Product extends IdAndDate {
  title: string;
  description: string;
  price: number;
  stock: number;
  image: {
    url: string;
    public_id: string;
  };
  discount: number;
  vendorId: string;
  categoryId: string;
  category: Category;
  rating: number;
}
