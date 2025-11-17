import { Container } from "inversify";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { PaymentService } from "../payment/payment.service";
import { AddressService } from "../address/address.service";
import { CartService } from "../cart/cart.service";

export const orderContainer = new Container();

// Core Services
orderContainer.bind(OrderService).toSelf();
orderContainer.bind(OrderController).toSelf();

// Additional Services
orderContainer.bind(PaymentService).toSelf();
orderContainer.bind(AddressService).toSelf();
orderContainer.bind(CartService).toSelf();