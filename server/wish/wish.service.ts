import { injectable } from "inversify";
import { Repository } from "typeorm";
import { Wish } from "./wish.entity";
import { AppDataSource } from "../data-source";
import { WishItem } from "./wishItem.entity";
import AppError from "../utils/appError";
import {
  BAD_REQUEST,
  BAD_REQUEST_REASON,
  NOT_FOUND,
  NOT_FOUND_REASON,
} from "../utils/statusCodes";

@injectable()
export class WishService {
  private wishRepo: Repository<Wish> = AppDataSource.getRepository(Wish);
  private wishItemRepo: Repository<WishItem> =
    AppDataSource.getRepository(WishItem);

  async getAll(): Promise<Wish[]> {
    const wishes = await this.wishRepo.find({
      relations: ["user", "wishItems"],
    });
    if (!wishes.length)
      throw new AppError("No wishes found", NOT_FOUND, NOT_FOUND_REASON);
    return wishes;
  }

  async getById(id: string): Promise<Wish> {
    const wish = await this.wishRepo.findOne({
      where: { id },
      relations: ["user", "wishItems"],
    });
    if (!wish)
      throw new AppError("Wish not found", NOT_FOUND, NOT_FOUND_REASON);
    return wish;
  }

  async getByUserId(userId: string): Promise<Wish> {
    const wish = await this.wishRepo.findOne({
      where: { userId },
      relations: ["user", "wishItems"],
    });
    if (!wish)
      throw new AppError(
        "Wish not found for this user",
        NOT_FOUND,
        NOT_FOUND_REASON
      );
    return wish;
  }

  async create(data: {}): Promise<Wish> {
    const wish = this.wishRepo.create(data);
    return await this.wishRepo.save(wish);
  }

  async deleteById(id: string): Promise<string> {
    const wish = await this.getById(id);
    await this.wishRepo.remove(wish);
    return "Wish deleted successfully";
  }

  async addToWish(productId: string, wishId: string): Promise<string> {
    const currentItem = await this.wishItemRepo.findOne({
      where: { wishId, productId },
    });
    if (currentItem)
      throw new AppError(
        "This item already exist in wish item",
        BAD_REQUEST,
        BAD_REQUEST_REASON
      );
    const newItem = this.wishItemRepo.create({ productId, wishId });
    await this.wishItemRepo.save(newItem);
    return "Item added successfully";
  }

  async removeFromWish(productId: string, wishId: string): Promise<string> {
    const item = await this.wishItemRepo.find({ where: { productId, wishId } });
    if (!item) throw new AppError("No item found", NOT_FOUND, NOT_FOUND_REASON);
    await this.wishItemRepo.remove(item);
    return "Item removed successfully";
  }
}
