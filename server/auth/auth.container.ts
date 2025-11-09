import { Container } from "inversify";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

export const authContainer = new Container();

authContainer.bind<AuthService>(AuthService).toSelf();
authContainer.bind<AuthController>(AuthController).toSelf();
