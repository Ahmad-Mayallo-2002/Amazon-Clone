import type { OrderStatus } from "@/enums/order-status";
import type { IdAndDate } from "./IdAndDate";
import type { Product } from "./product";
import type { User } from "./user";
import type { Payment } from "./payment";
import type { Address } from "./address";

export interface OrderItem extends IdAndDate {
  totalPrice: number;
  productId: string;
  product: Product;
  orderId: string;
  amount: number;
}

export interface Order extends IdAndDate {
  userId: string;
  user: User;
  totalPrice: number;
  status: OrderStatus;
  orderItems: OrderItem[];
  payment: Payment;
  address: Address;
}

export interface CreateOrderRequest {
  fullName: string;
  state: string;
  country: string;
  city: string;
  postalCode: string;
}

export interface CreateOrderResponse {
  clientSecret: string;
  orderId: string;
}
