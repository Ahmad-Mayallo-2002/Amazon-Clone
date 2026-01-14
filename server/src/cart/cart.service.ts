import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { Cart } from "./cart.entity";
import { AppDataSource } from "../data-source";
import { CartItem } from "./cartItem.entity";
import AppError from "../utils/appError";
import { NOT_FOUND, NOT_FOUND_REASON } from "../utils/statusCodes";
import { ProductService } from "../product/product.service";
import { Product } from "../product/product.entity";
import { calculatePagination } from "../utils/calculatePagination";
import { PaginatedDate } from "../interfaces/paginated-data.interface";

@injectable()
export class CartService {
  private cartRepo: Repository<Cart> = AppDataSource.getRepository(Cart);
  private cartItemRepo: Repository<CartItem> =
    AppDataSource.getRepository(CartItem);
  constructor(@inject(ProductService) private productService: ProductService) {}

  async getAll(skip: number, take: number): Promise<PaginatedDate<Cart>> {
    const carts = await this.cartRepo.find({
      relations: ["user", "cartItems"],
    });
    const counts = await this.cartRepo.count();
    if (!counts)
      throw new AppError("No carts found", NOT_FOUND, NOT_FOUND_REASON);
    const pagination = calculatePagination(counts, skip, take);
    return { data: carts, pagination };
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

  private async getItemByProductId(
    productId: string,
    cartId: string
  ): Promise<CartItem> {
    const item = await this.cartItemRepo.findOne({
      where: { productId, cartId },
      relations: ["product"],
    });
    if (!item)
      throw new AppError("Item not found", NOT_FOUND, NOT_FOUND_REASON);
    return item;
  }

  async getByUserId(userId: string): Promise<Cart> {
    const cart = await this.cartRepo.findOne({
      where: { userId },
      relations: ["cartItems", "cartItems.product"],
      order: { cartItems: { createdAt: "ASC" } },
    });
    if (!cart)
      throw new AppError(
        "Cart not found for this user",
        NOT_FOUND,
        NOT_FOUND_REASON
      );
    return cart;
  }

  async deleteById(id: string): Promise<string> {
    const cart = await this.getById(id);
    await this.cartRepo.remove(cart);
    return "Cart deleted successfully";
  }

  async addToCart(
    productId: string,
    userId: string,
    amount: number
  ): Promise<string> {
    const product = (await this.productService.getProductById(
      productId
    )) as Product;
    // Check if cart is exist or not
    let cart = await this.cartRepo.findOne({
      where: { userId },
    });
    // if not exist
    if (!cart) {
      // create one and save it
      cart = this.cartRepo.create({ userId, user: { id: userId } });
      await this.cartRepo.save(cart);
      console.log("New Cart");
    }
    const discount: number = 1 - product.discount;
    // Calculate the price at payment of product
    const price: number = +product.price * discount * amount;
    // Check if cart item is exist or not
    let currentItem = await this.cartItemRepo.findOne({
      where: { productId, cartId: cart.id },
    });
    // If exist
    if (currentItem) {
      currentItem.amount = amount;
      currentItem.priceAtPayment = `${price}`;
      console.log("Update");
    } else {
      // If not exist
      // Calculate price of payment
      // Create new cart item
      currentItem = this.cartItemRepo.create({
        productId,
        cartId: cart.id,
        product: { id: productId },
        cart: { id: cart.id, totalPrice: `${price}` },
        priceAtPayment: `${price}`,
        amount,
      });
      console.log("Create");
    }
    // Save new cart item
    await this.cartItemRepo.save(currentItem);

    let total: number = 0;
    const items = await this.cartItemRepo.find({ where: { cartId: cart.id } });
    for (const item of items) total += +item.priceAtPayment;
    cart.totalPrice = `${total}`;

    await this.cartRepo.save(cart);

    return "Product added to cart successfully";
  }

  async removeFromCart(cartId: string, productId: string): Promise<string> {
    const item = await this.getItemByProductId(productId, cartId);
    const cart = await this.getById(cartId);
    cart.totalPrice = `${+cart.totalPrice - +item?.priceAtPayment}`;
    await this.cartRepo.save(cart);
    await this.cartItemRepo.remove(item);
    return "Item removed from cart successfully";
  }
}
