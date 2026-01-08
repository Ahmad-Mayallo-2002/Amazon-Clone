import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  Relation,
} from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";
import { User } from "../user/user.entity";
import { Product } from "../product/product.entity";

@Entity({ name: "vendors" })
export class Vendor extends AbstractEntity {
  @Column({ type: "varchar", length: 255, name: "store_name" })
  storeName: string;

  @Column({ type: "text", name: "store_description" })
  storeDescription: string;

  @Column({ type: "boolean", default: false, name: "is_verified" })
  isVerified: boolean;

  @Column({ type: "varchar", length: 255, name: "user_id" })
  userId: string;

  // Relations
  @JoinColumn({ name: "user" })
  @OneToOne(() => User, (user) => user.vendor, { onDelete: "CASCADE" })
  user: Relation<User>;

  @OneToMany(() => Product, (product) => product.vendor)
  productsIds: Relation<Product[]>;
}
