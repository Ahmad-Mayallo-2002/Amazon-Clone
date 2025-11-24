import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";
import { Product } from "../product/product.entity";
import { Cart } from "./cart.entity";

@Entity({ name: "cart_items" })
export class CartItem extends AbstractEntity {
  @Column({ type: "int", default: 0 })
  amount: number;

  @Column({ type: "decimal", default: 0, name: "price_at_payment" })
  priceAtPayment: number;

  @Column({ type: "varchar", length: 255, name: "product_id" })
  productId: string;

  @Column({ type: "varchar", length: 255, name: "cart_id" })
  cartId: string;

  // Relations
  @JoinColumn({ name: "product" })
  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Relation<Product>;

  @JoinColumn({ name: "cart" })
  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Relation<Cart>;
}
