import { Container } from "inversify";
import { WishService } from "./wish.service";
import { WishController } from "./wish.controller";

export const wishContainer = new Container();

wishContainer.bind<WishService>(WishService).toSelf();
wishContainer.bind<WishController>(WishController).toSelf();
