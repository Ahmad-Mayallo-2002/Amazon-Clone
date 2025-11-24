import { Container } from "inversify";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

export const userContainer = new Container();

userContainer.bind<UserService>(UserService).to(UserService);
userContainer.bind<UserController>(UserController).to(UserController);