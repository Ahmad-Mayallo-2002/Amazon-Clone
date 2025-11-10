import { injectable } from "inversify";
import { Repository } from "typeorm";
import { Cart } from "./cart.entity";
import { AppDataSource } from "../data-source";
import { CartItem } from "./cartItem.entity";
import AppError from "../utils/appError";
import { NOT_FOUND, NOT_FOUND_REASON } from "../utils/statusCodes";
import { ProductService } from "../product/product.service";
import { Product } from "../product/product.entity";

@injectable()
export class CartService {
  private cartRepo: Repository<Cart> = AppDataSource.getRepository(Cart);
  private cartItemRepo: Repository<CartItem> =
    AppDataSource.getRepository(CartItem);
  private productService: ProductService;

  async getAll(): Promise<Cart[]> {
    const carts = await this.cartRepo.find({
      relations: ["user", "cartItems"],
    });
    if (!carts.length)
      throw new AppError("No carts found", NOT_FOUND, NOT_FOUND_REASON);
    return carts;
  }

  private async getById(id: string): Promise<Cart> {
    const cart = await this.cartRepo.findOne({
      where: { id },
      relations: ["user", "cartItems"],
    });
    if (!cart)
      throw new AppError("Cart not found", NOT_FOUND, NOT_FOUND_REASON);
    return cart;
  }

  async getByUserId(userId: string): Promise<Cart> {
    const cart = await this.cartRepo.findOne({
      where: { userId },
      relations: ["user", "cartItems"],
    });
    if (!cart)
      throw new AppError(
        "Cart not found for this user",
        NOT_FOUND,
        NOT_FOUND_REASON
      );
    return cart;
  }

  async create(data: {}): Promise<Cart> {
    const cart = this.cartRepo.create(data);
    return await this.cartRepo.save(cart);
  }

  async deleteById(id: string): Promise<string> {
    const cart = await this.getById(id);
    await this.cartRepo.remove(cart);
    return "Cart deleted successfully";
  }

  // async addToCart(cartId: string, productId: string): Promise<string> {
  //   const product = await this.productService.getProductById(productId) as Product;
  //   const cart = await this.getById(cartId) as Cart;
  //   const currentItem = await this.cartItemRepo.findOne({where: {productId, cartId}});

  // }
}
