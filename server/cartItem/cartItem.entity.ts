import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";

@Entity({ name: "cart_items" })
export class CartItem extends AbstractEntity {
    
}
