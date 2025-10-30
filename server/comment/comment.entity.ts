import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";

@Entity({ name: "comments" })
export class Comment extends AbstractEntity {
    
}
