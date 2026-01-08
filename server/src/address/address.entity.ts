import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Relation,
} from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";
import { User } from "../user/user.entity";
import { Order } from "../order/order.entity";

@Entity({ name: "addresses" })
export class Address extends AbstractEntity {
  @Column({ length: 255 })
  street: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  state: string;

  @Column({ length: 20 })
  postalCode: string;

  @Column({ length: 100 })
  country: string;

  @Column({ length: 100 })
  orderId: string;

  @Column({ length: 100 })
  userId: string;

  // Relations
  @JoinColumn({ name: "user" })
  @ManyToOne(() => User, (user) => user.addresses)
  user: Relation<User>;

  @JoinColumn({ name: "order" })
  @OneToOne(() => Order, (order) => order.address, {
    onDelete: "CASCADE",
  })
  order: Relation<Order>;
}
