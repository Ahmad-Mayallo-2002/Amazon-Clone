import { Container } from "inversify";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";

export const orderContainer = new Container();

orderContainer.bind(OrderService).toSelf();
orderContainer.bind(OrderController).toSelf();
