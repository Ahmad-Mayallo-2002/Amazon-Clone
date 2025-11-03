import { Column, Entity, JoinColumn, OneToMany, OneToOne, Relation } from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";
import { CartItem } from "../cartItem/cartItem.entity";
import { User } from "../user/user.entity";

@Entity({ name: "carts" })
export class Cart extends AbstractEntity {
  @Column({ type: "int", name: "total_price", default: 0 })
  totalPrice: number;

  @Column({ type: "varchar", length: 255, name: "user_id" })
  userId: string;

  // Relations
  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: Relation<CartItem[]>;

  @JoinColumn({ name: "user" })
  @OneToOne(() => User, (user) => user.cart)
  user: Relation<User>;
}
