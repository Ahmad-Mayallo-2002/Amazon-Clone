import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { Order } from "./order.entity";
import { AppDataSource } from "../data-source";
import { OrderItem } from "./orderItem.entity";
import AppError from "../utils/appError";
import { NOT_FOUND, NOT_FOUND_REASON } from "../utils/statusCodes";
import { OrderStatus } from "../enums/order-status.enum";
import { Product } from "../product/product.entity";
import { AddressService } from "../address/address.service";
import { PaymentService } from "../payment/payment.service";
import { CartService } from "../cart/cart.service";

@injectable()
export class OrderService {
  private orderRepo: Repository<Order> = AppDataSource.getRepository(Order);
  private productRepo: Repository<Product> =
    AppDataSource.getRepository(Product);
  private orderItemRepo: Repository<OrderItem> =
    AppDataSource.getRepository(OrderItem);

  constructor(
    @inject(AddressService) private addressService: AddressService,
    @inject(PaymentService) private paymentService: AddressService,
    @inject(CartService) private cartService: AddressService
  ) {}

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderRepo.find({
      relations: {
        user: true,
        orderItems: true,
        address: true,
        payment: true,
      },
      order: { createdAt: "DESC" },
    });

    if (!orders.length)
      throw new AppError("No orders", NOT_FOUND, NOT_FOUND_REASON);

    return orders;
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    const orders = await this.orderRepo.find({
      where: { userId },
      relations: {
        orderItems: true,
        address: true,
        payment: true,
      },
      order: { createdAt: "DESC" },
    });

    if (!orders.length)
      throw new AppError("No orders", NOT_FOUND, NOT_FOUND_REASON);

    return orders;
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

  async createOrder(userId: string) {
    // Create order
    const newOrder = this.orderRepo.create({
      totalPrice: 0,
      address: {},
      payment: {},
      userId,
      user: { id: userId },
    });
    const order = await this.orderRepo.save(newOrder);
  }
}
