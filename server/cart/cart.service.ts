import { injectable } from "inversify";
import { Repository } from "typeorm";
import { Cart } from "./cart.entity";
import { AppDataSource } from "../data-source";

@injectable()
export class CartService {
    private cartRepo: Repository<Cart> = AppDataSource.getRepository(Cart);
}