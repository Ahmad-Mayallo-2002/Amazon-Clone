import type { OrderStatus } from "@/enums/order-status";
import type { IdAndDate } from "./IdAndDate";
import type { Product } from "./product";
import type { User } from "./user";

export interface OrderItem extends IdAndDate {
    totalPrice: number;
    productId: string;
    product: Product;
    orderId: string;
}

export interface Order extends IdAndDate {
  userId: string;
  user: User;
  totalPrice: number;
  status: OrderStatus;
}
