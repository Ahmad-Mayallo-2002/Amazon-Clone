import { log } from "console";
import { config } from "dotenv";
import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "./user/user.entity";
import { Vendor } from "./vendor/vendor.entity";
import { Product } from "./product/product.entity";
import { Cart } from "./cart/cart.entity";
import { CartItem } from "./cart/cartItem.entity";
import { WishItem } from "./wish/wishItem.entity";
import { Wish } from "./wish/wish.entity";
import { Category } from "./category/category.entity";
import { Comment } from "./comment/comment.entity";
import { Review } from "./review/review.entity";
import { Order } from "./order/order.entity";
import { OrderItem } from "./order/orderItem.entity";
import { Address } from "./address/address.entity";
import { Payment } from "./payment/payment.entity";

config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASS as string,
  database: process.env.DB_DATABASE as string,
  synchronize: true,
  entities: [
    User,
    Vendor,
    Product,
    Cart,
    CartItem,
    Wish,
    WishItem,
    Category,
    Comment,
    Review,
    Order,
    OrderItem,
    Address,
    Payment
  ],
});

async function connect() {
  try {
    await AppDataSource.initialize();
    log("Data Source has been initialized");
  } catch (error) {
    log("Error during Data Source initialization", error);
  }
}

connect();
