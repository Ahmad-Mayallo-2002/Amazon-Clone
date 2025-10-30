import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";

@Entity({ name: "categories" })
export class Category extends AbstractEntity {

}
