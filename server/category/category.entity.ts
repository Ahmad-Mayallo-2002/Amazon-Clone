import { Column, Entity, OneToMany, Relation } from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";
import { Product } from "../product/product.entity";

@Entity({ name: "categories" })
export class Category extends AbstractEntity {
  @Column({ type: "varchar", length: 255 })
  name: string;

  // Relations
  @OneToMany(() => Product, (product) => product.category)
  productId: Relation<Product[]>;
}
