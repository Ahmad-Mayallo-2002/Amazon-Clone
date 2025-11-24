import { Container } from "inversify";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
export const orderContainer = new Container();

orderContainer.bind(OrderService).toSelf();
orderContainer.bind(OrderController).toSelf();
orderContainer.bind(DataSource).toDynamicValue(() => AppDataSource);
