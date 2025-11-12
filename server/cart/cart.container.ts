import { Container } from "inversify";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { ProductService } from "../product/product.service";

export const cartContainer = new Container();

cartContainer.bind<CartService>(CartService).toSelf();
cartContainer.bind<ProductService>(ProductService).toSelf();
cartContainer.bind<CartController>(CartController).toSelf();
