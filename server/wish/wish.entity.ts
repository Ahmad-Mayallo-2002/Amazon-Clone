import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";

@Entity({ name: "wishes" })
export class Wish extends AbstractEntity {
    
}
