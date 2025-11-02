import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";
import { Product } from "../product/product.entity";

@Entity({ name: "wish_items" })
export class WishItem extends AbstractEntity {
  @Column({ type: "varchar", length: 255, name: "product_id" })
  productId: string;

  // Relations
  @JoinColumn({ name: "product" })
  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Relation<Product>;
}
