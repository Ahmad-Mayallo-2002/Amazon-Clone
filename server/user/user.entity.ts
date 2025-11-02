import { Column, Entity, OneToOne, Relation } from "typeorm";
import { Roles } from "../enums/role.enum";
import { AbstractEntity } from "../utils/abstractEntity";
import { Vendor } from "../vendor/vendor.entity";

@Entity({ name: "users" })
export class User extends AbstractEntity {
  @Column({ type: "varchar", length: 255 })
  username: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255, default: "" })
  password: string;

  @Column({ type: "enum", enum: Roles, default: Roles.USER })
  role: Roles;

  @Column({ type: "varchar", length: 255, unique: true })
  phone: string;

  // Relations
  @OneToOne(() => Vendor, (vendor) => vendor.user)
  vendorId: Relation<Vendor>;
}
