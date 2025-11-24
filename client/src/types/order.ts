// src/types/order.ts (Example)
export type CreateOrderData = {
  city: string;
  postalCode: string;
  provider: string; // e.g., 'stripe'
  state: string;
  street: string;
  country: string;
};

export type CreateOrderResponse = {
  orderId: string;
  clientSecret: string; // The key from your backend
};
