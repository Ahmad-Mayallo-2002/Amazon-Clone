import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Relation,
} from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";
import { User } from "../user/user.entity";
import { OrderItem } from "./orderItem.entity";
import { OrderStatus } from "../enums/order-status.enum";
import { Address } from "../address/address.entity";
import { Payment } from "../payment/payment.entity";

@Entity({ name: "orders" })
export class Order extends AbstractEntity {
  @Column({ type: "decimal", default: 0, name: "total_price" })
  totalPrice: number;

  @Column({
    type: "enum",
    default: OrderStatus.PENDING,
    enum: OrderStatus,
  })
  status: OrderStatus;

  @Column({ type: "varchar", length: 255, name: "user_id" })
  userId: string;

  // Relations
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: Relation<OrderItem[]>;

  @JoinColumn({ name: "user" })
  @ManyToOne(() => User, (user) => user.orders)
  user: Relation<User>;

  @OneToOne(() => Address, (address) => address.order)
  addresse: Relation<Address>;

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Relation<Payment>;
}
