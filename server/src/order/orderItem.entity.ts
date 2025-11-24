import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";
import { Product } from "../product/product.entity";
import { Order } from "./order.entity";

@Entity({ name: "order_items" })
export class OrderItem extends AbstractEntity {
  @Column({ type: "decimal", default: 0, name: "total_price" })
  totalPrice: number;

  @Column({ type: "varchar", length: 255, name: "product_id" })
  productId: string;

  @Column({ type: "varchar", length: 255, name: "order_id" })
  orderId: string;

  // Relations
  @JoinColumn({ name: "product" })
  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Relation<Product>;

  @JoinColumn({ name: "order" })
  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Relation<Order>;
}
