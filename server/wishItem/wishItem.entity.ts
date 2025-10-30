import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";

@Entity({ name: "wish_items" })
export class Wish extends AbstractEntity {}
