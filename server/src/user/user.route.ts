import { Router } from "express";
import { UserController } from "./user.controller";
import { userContainer } from "./user.container";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware";
import { Roles } from "../enums/role.enum";
import { checkToken } from "../middlewares/checkToken.middleware";
import { adminOrOwnerProfileMiddleware } from "../middlewares/adminOrOwnerProfile.middleware";
import { validateZod } from "../middlewares/validate-zod.middleware";
import { UserSchema } from "./zod/user.zod";

const router = Router();

const controller = userContainer.get<UserController>(UserController);

router.get(
  "/get-users",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  controller.getAllUsers
);

router.get(
  "/get-users/:id",
  checkToken,
  adminOrOwnerProfileMiddleware,
  controller.getUserById
);

router.put(
  "/update-user/:id",
  checkToken,
  adminOrOwnerProfileMiddleware,
  validateZod(UserSchema.partial()),
  controller.updateUser
);

router.delete(
  "/delete-user/:id",
  checkToken,
  adminOrOwnerProfileMiddleware,
  controller.deleteUser
);

export default router;
