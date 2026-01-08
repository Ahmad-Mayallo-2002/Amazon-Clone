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
  totalPrice: string;

  @Column({
    type: "enum",
    default: OrderStatus.PENDING,
    enum: OrderStatus,
  })
  status: OrderStatus;

  @Column({ type: "varchar", length: 255, name: "user_id" })
  userId: string;

  // Relations
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
    onDelete: "CASCADE",
  })
  orderItems: Relation<OrderItem[]>;

  @JoinColumn({ name: "user" })
  @ManyToOne(() => User, (user) => user.orders)
  user: Relation<User>;

  @OneToOne(() => Address, (address) => address.order, {
    cascade: true,
    onDelete: "CASCADE",
  })
  address: Relation<Address>;

  @OneToOne(() => Payment, (payment) => payment.order, {
    cascade: true,
    onDelete: "CASCADE",
  })
  payment: Relation<Payment>;
}
