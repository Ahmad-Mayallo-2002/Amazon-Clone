import type { IdAndDate } from "./IdAndDate";
import type { Product } from "./product";
import type { User } from "./user";

export interface CartItem extends IdAndDate {
  product: Product;
  productId: string;
  amount: number;
  priceAtPayment: number;
  cartId: string;
}

export interface Cart extends IdAndDate {
  userId: string;
  user: User;
  totalPrice: number;
}
