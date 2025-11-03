import { Column, Entity, JoinColumn, OneToMany, OneToOne, Relation } from "typeorm";
import { AbstractEntity } from "../utils/abstractEntity";
import { User } from "../user/user.entity";
import { WishItem } from "../wishItem/wishItem.entity";

@Entity({ name: "wishes" })
export class Wish extends AbstractEntity {
  @Column({ type: "varchar", length: 255, name: "user_id" })
  userId: string;

  // Relations
  @JoinColumn({ name: "user" })
  @OneToOne(() => User, (user) => user.wish)
  user: Relation<User>;

  @OneToMany(() => WishItem, (wishItem) => wishItem.wish)
  wishItems: Relation<WishItem[]>;
}
