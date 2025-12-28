import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { Order } from "./order.entity";
import { AppDataSource } from "../data-source";
import { OrderItem } from "./orderItem.entity";
import AppError from "../utils/appError";
import {
  BAD_REQUEST,
  BAD_REQUEST_REASON,
  NOT_FOUND,
  NOT_FOUND_REASON,
} from "../utils/statusCodes";
import { OrderStatus } from "../enums/order-status.enum";
import { Product } from "../product/product.entity";
import { Address } from "../address/address.entity";
import { Cart } from "../cart/cart.entity";
import { Payment } from "../payment/payment.entity";
import { config } from "dotenv";
import { CreateOrder } from "./zod/order.zod";
import { CartItem } from "../cart/cartItem.entity";
import { stripe } from "../utils/stripe";
import { calculatePagination } from "../utils/calculatePagination";
import { PaginatedDate } from "../interfaces/paginated-data.interface";

config();

@injectable()
export class OrderService {
  private orderRepo: Repository<Order> = AppDataSource.getRepository(Order);
  constructor(@inject(DataSource) private dataSource: DataSource) {}

  async getAllOrders(
    skip: number,
    take: number
  ): Promise<PaginatedDate<Order>> {
    const orders = await this.orderRepo.find({
      relations: {
        user: true,
        orderItems: true,
        address: true,
        payment: true,
      },
    });
    const counts = await this.orderRepo.count();
    if (!counts) throw new AppError("No orders", NOT_FOUND, NOT_FOUND_REASON);
    const pagination = calculatePagination(counts, skip, take);
    return { data: orders, pagination };
  }

  async getUserOrders(
    userId: string,
    skip: number,
    take: number
  ): Promise<PaginatedDate<Order>> {
    const orders = await this.orderRepo.find({
      where: { userId },
      relations: {
        orderItems: true,
        address: true,
        payment: true,
      },
    });
    const counts = await this.orderRepo.count({ where: { userId } });
    if (!counts) throw new AppError("No orders", NOT_FOUND, NOT_FOUND_REASON);
    const pagination = calculatePagination(counts, skip, take);
    return { data: orders, pagination };
  }

  async getOrder(orderId: string): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id: orderId },
      relations: {
        user: true,
        orderItems: true,
        address: true,
        payment: true,
      },
    });

    if (!order)
      throw new AppError("Order not found", NOT_FOUND, NOT_FOUND_REASON);

    return order;
  }

  async getOrdersItemsByVendorId(
    vendorId: string,
    take: number,
    skip: number,
    status?: OrderStatus
  ): Promise<PaginatedDate<OrderItem>> {
    const orderItemRepo = this.dataSource.getRepository(OrderItem);
    const find: any = {
      take,
      skip,
      where: {
        product: {
          vendorId,
        },
      },
      relations: {
        product: true,
        order: true,
      },
    };
    if (status) find.where.order.status = status;
    const items = await orderItemRepo.find(find);
    if (!items.length)
      throw new AppError("No orders found", NOT_FOUND, NOT_FOUND_REASON);
    const counts = await orderItemRepo.count({
      where: find.where,
    });
    const pagination = calculatePagination(counts, skip, take);
    return { data: items, pagination };
  }

  async deleteOrder(orderId: string): Promise<string> {
    const order = await this.getOrder(orderId);
    await this.orderRepo.remove(order);
    return "Order deleted successfully";
  }

  async updateOrderStatus(
    orderId: string,
    newStatus: OrderStatus
  ): Promise<string> {
    const order = await this.getOrder(orderId);
    order.status = newStatus;
    await this.orderRepo.save(order);
    return `Order now is ${newStatus}`;
  }

  async createOrder(userId: string, data: CreateOrder) {
    return await this.dataSource.transaction(async (manager) => {
      // Get User Cart
      const cart = await manager.getRepository(Cart).findOne({
        where: { userId },
        relations: ["cartItems", "cartItems.product"],
      });
      if (!cart || !cart.cartItems.length) {
        throw new AppError("Cart is empty", NOT_FOUND, NOT_FOUND_REASON);
      }
      const { cartItems, totalPrice } = cart;

      // Create New Order
      const newOrder = manager.getRepository(Order).create({
        totalPrice,
        userId,
        user: { id: userId },
      });
      const order = await manager.getRepository(Order).save(newOrder);
      let totalAmount: number = 0;

      // Create Order Items and Update Product Stock
      for (const item of cartItems) {
        const product = await manager.getRepository(Product).findOne({
          where: { id: item.productId },
        });
        if (!product)
          throw new AppError("Product not found", NOT_FOUND, NOT_FOUND_REASON);

        if (product.stock < item.amount)
          throw new AppError(
            "The quantity demanded is greater than the stock",
            BAD_REQUEST,
            BAD_REQUEST_REASON
          );

        product.stock -= item.amount;

        totalAmount += item.amount;
        const newItem = manager.getRepository(OrderItem).create({
          order: { id: order.id },
          orderId: order.id,
          product: { id: item.productId },
          productId: item.productId,
          totalPrice: item.priceAtPayment,
        });
        await manager.getRepository(Product).save(product);
        const orderItem = await manager.getRepository(OrderItem).save(newItem);
      }

      const { city, postalCode, state, street, country } = data;

      // Create Payment
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(+totalPrice * 100),
        currency: "usd",
        metadata: {
          orderId: order.id,
          userId,
        },
      });

      const newPayment = manager.getRepository(Payment).create({
        orderId: order.id,
        order: { id: order.id },
        providerPaymentId: paymentIntent.id,
      });
      const payment = await manager.getRepository(Payment).save(newPayment);

      // Clear Cart
      cart.totalPrice = `0`;
      await manager.getRepository(CartItem).delete({ cartId: cart.id });
      await manager.getRepository(Cart).save(cart);

      // Create Address
      const newAddress = manager.getRepository(Address).create({
        city,
        country,
        postalCode,
        state,
        street,
        order: { id: order.id },
        orderId: order.id,
        userId,
        user: { id: userId },
      });
      const address = await manager.getRepository(Address).save(newAddress);

      return {
        orderId: order.id,
        clientSecret: paymentIntent.client_secret,
      };
    });
  }
}
