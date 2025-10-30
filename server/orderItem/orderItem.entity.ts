import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";

@Entity({ name: "order_items" })
export class OrderItem extends AbstractEntity {
    
}
