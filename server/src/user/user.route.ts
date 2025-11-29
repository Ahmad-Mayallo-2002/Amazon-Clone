import { Router } from "express";
import { UserController } from "./user.controller";
import { userContainer } from "./user.container";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware";
import { Roles } from "../enums/role.enum";
import { checkToken } from "../middlewares/checkToken.middleware";
import { adminOrOwner } from "../middlewares/adminOrOwner.middleware";
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
  adminOrOwner((req) => req.params.id),
  controller.getUserById
);

router.put(
  "/update-user/:id",
  checkToken,
  adminOrOwner((req) => req.params.id),
  validateZod(UserSchema.partial()),
  controller.updateUser
);

router.delete(
  "/delete-user/:id",
  checkToken,
  adminOrOwner((req) => req.params.id),
  controller.deleteUser
);

export default router;
