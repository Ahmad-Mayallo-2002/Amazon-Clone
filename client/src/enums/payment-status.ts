export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export const PaymentStatusColorMap: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: "yellow",
  [PaymentStatus.PAID]: "green",
  [PaymentStatus.FAILED]: "red",
  [PaymentStatus.REFUNDED]: "purple",
};
