import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";

@Entity({ name: "carts" })
export class Cart extends AbstractEntity {
    
}
