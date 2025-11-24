import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";
import { Product } from "../product/product.entity";
import { User } from "../user/user.entity";

@Entity({ name: "comments" })
export class Comment extends AbstractEntity {
  @Column({ type: "text" })
  content: string;

  @Column({ type: "varchar", length: 255 })
  productId: string;

  @Column({ type: "varchar", length: 255 })
  userId: string;

  // Relations
  @JoinColumn({ name: "product_id" })
  @ManyToOne(() => Product, (product) => product.comments)
  product: Relation<Product>;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User, (user) => user.comments)
  user: Relation<User>;
}
