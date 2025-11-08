import { Container } from "inversify";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";

export const cartContainer = new Container();

cartContainer.bind<CartService>(CartService).toSelf();
cartContainer.bind<CartController>(CartController).toSelf();
