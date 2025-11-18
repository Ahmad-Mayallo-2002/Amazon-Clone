import { Column, Entity, JoinColumn, OneToOne, Relation } from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";
import { PaymentProvider } from "../enums/payment-provider.enum";
import { PaymentStatus } from "../enums/payment-status.enum";
import { Order } from "../order/order.entity";

@Entity({ name: "payments" })
export class Payment extends AbstractEntity {
  @Column({ type: "varchar", length: 100 })
  orderId: string;

  @Column({ type: "varchar", length: 100, name: "provider_payment_id" })
  providerPaymentId: string;

  @Column({ type: "enum", enum: PaymentProvider })
  provider: PaymentProvider;

  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  // Relations
  @JoinColumn({ name: "order" })
  @OneToOne(() => Order, (order) => order.payment)
  order: Relation<Order>;
}
