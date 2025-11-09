import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  Relation,
} from "typeorm";
import { Roles } from "../enums/role.enum";
import { AbstractEntity } from "../utils/abstractEntity";
import { Vendor } from "../vendor/vendor.entity";
import { Comment } from "../comment/comment.entity";
import { Review } from "../review/review.entity";
import { Cart } from "../cart/cart.entity";
import { Wish } from "../wish/wish.entity";
import { Order } from "../order/order.entity";
import { Address } from "../address/address.entity";

@Entity({ name: "users" })
export class User extends AbstractEntity {
  @Column({ type: "varchar", length: 255 })
  username: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255, default: "" })
  password: string;

  @Column({ type: "enum", enum: Roles, default: Roles.USER })
  role: Roles;

  @Column({ type: "varchar", length: 255, unique: true })
  phone: string;

  // Relations
  @OneToOne(() => Vendor, (vendor) => vendor.user)
  vendor: Relation<Vendor>;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Relation<Comment[]>;

  @OneToMany(() => Review, (reviews) => reviews.user)
  reviews: Relation<Review[]>;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Relation<Cart>;

  @OneToOne(() => Wish, (wish) => wish.user)
  wish: Relation<Wish>;

  @ManyToOne(() => Order, (order) => order.user)
  orders: Relation<Order[]>;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Relation<Address[]>;
}
