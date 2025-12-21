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
import { PaginatedDate } from "../interfaces/paginated-data.interface";
import { calculatePagination } from "../utils/calculatePagination";

@injectable()
export class WishService {
  private wishRepo: Repository<Wish> = AppDataSource.getRepository(Wish);
  private wishItemRepo: Repository<WishItem> =
    AppDataSource.getRepository(WishItem);

  async getAll(skip: number = 0, take: number): Promise<PaginatedDate<Wish>> {
    const [wishes, count] = await this.wishRepo.findAndCount({
      relations: ["user", "wishItems"],
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!wishes.length)
      throw new AppError("No wishes found", NOT_FOUND, NOT_FOUND_REASON);
    const pagination = calculatePagination(count, skip, take);
    return { data: wishes, pagination };
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
      relations: ["wishItems", "wishItems.product"],
    });
    if (!wish)
      throw new AppError(
        "Wish not found for this user",
        NOT_FOUND,
        NOT_FOUND_REASON
      );
    return wish;
  }

  async addToWish(productId: string, userId: string): Promise<string> {
    // 1. Check if user already has a wishlist
    let wish = await this.wishRepo.findOne({
      where: { userId },
    });

    // If no wishlist → create one
    if (!wish) {
      wish = this.wishRepo.create({ userId, user: { id: userId } });
      await this.wishRepo.save(wish);
    }

    // 2. Check if the product already exists in wish items
    const existingItem = await this.wishItemRepo.findOne({
      where: { wishId: wish.id, productId },
    });

    if (existingItem) {
      throw new AppError(
        "This product already exists in your wish list",
        BAD_REQUEST,
        BAD_REQUEST_REASON
      );
    }

    // 3. Create new wish item
    const newItem = this.wishItemRepo.create({
      productId,
      wishId: wish.id,
      wish: { id: wish.id },
      product: { id: productId },
    });

    await this.wishItemRepo.save(newItem);

    return "Item added to wish list successfully";
  }

  async removeFromWish(productId: string, wishId: string): Promise<string> {
    const item = await this.wishItemRepo.find({ where: { productId, wishId } });
    if (!item) throw new AppError("No item found", NOT_FOUND, NOT_FOUND_REASON);
    await this.wishItemRepo.remove(item);
    return "Item removed successfully";
  }
}
