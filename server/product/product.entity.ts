import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";

@Entity({ name: "products" })
export class Product extends AbstractEntity {
  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "varchar", length: 255 })
  image: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "decimal", default: 0 })
  price: number;

  @Column({ type: "int", default: 1 })
  stock: number;

  @Column({ type: "float", default: 0 })
  discount: number;
}
