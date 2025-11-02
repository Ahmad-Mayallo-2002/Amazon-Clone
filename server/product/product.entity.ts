import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";
import { Vendor } from "../vendor/vendor.entity";
import { Category } from "../category/category.entity";
import { Comment } from "../comment/comment.entity";
import { Review } from "../review/review.entity";
import { CartItem } from "../cartItem/cartItem.entity";
import { OrderItem } from "../orderItem/orderItem.entity";
import { WishItem } from "../wishItem/wishItem.entity";

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

  @Column({ type: "varchar", length: 255 })
  vendorId: string;

  @Column({ type: "varchar", length: 255 })
  categoryId: string;

  // Relations
  @JoinColumn({ name: "vendor_id" })
  @ManyToOne(() => Vendor, (vendor) => vendor.productsIds)
  vendor: Relation<Vendor>;

  @JoinColumn({ name: "category_id" })
  @ManyToOne(() => Category, (category) => category.productId)
  category: Relation<Category>;

  @OneToMany(() => Comment, (comment) => comment.product)
  comments: Relation<Comment[]>;

  @OneToMany(() => Review, (reviews) => reviews.product)
  reviews: Relation<Review[]>;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: Relation<Product[]>;

  @OneToMany(() => OrderItem, (orderItems) => orderItems.product)
  orderItems: Relation<Product[]>;

  @OneToMany(() => WishItem, (wishItems) => wishItems.product)
  wishItems: Relation<Product[]>;
}
