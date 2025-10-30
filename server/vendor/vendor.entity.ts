import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";

@Entity({ name: "vendors" })
export class Vendor extends AbstractEntity {
    
}
