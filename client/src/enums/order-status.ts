export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  PAID = "PAID",
}

export const OrderStatusColorMap: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "yellow",
  [OrderStatus.PROCESSING]: "blue",
  [OrderStatus.SHIPPED]: "cyan",
  [OrderStatus.DELIVERED]: "green",
  [OrderStatus.CANCELLED]: "red",
  [OrderStatus.PAID]: "teal",
};
