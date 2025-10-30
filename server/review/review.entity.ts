import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";

@Entity({ name: "reviews" })
export class Review extends AbstractEntity {}
