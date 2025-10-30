import { Column, Entity } from "typeorm";
import { Roles } from "../enums/role.enum";
import { AbstractEntity } from "../utils/abstractEntity";

@Entity({ name: "users" })
export class User extends AbstractEntity {
  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "enum", enum: Roles, default: Roles.USER })
  role: Roles;

  @Column({ type: "varchar", length: 255, unique: true })
  phone: string;
}
