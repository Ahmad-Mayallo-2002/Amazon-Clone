import { Router } from "express";
import { cartContainer } from "./cart.container";
import { CartController } from "./cart.controller";
import { checkToken } from "../middlewares/checkToken.middleware";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware";
import { Roles } from "../enums/role.enum";
import { adminOrOwner } from "../middlewares/adminOrOwner.middleware";

const container = cartContainer.get<CartController>(CartController);
const router = Router();

router.post(
  "/add-to-cart/:productId",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.USER),
  container.addToCart
);

router.get(
  "/get-user-cart/:userId",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.USER),
  adminOrOwner((req) => req.params.userId),
  container.getByUserId
);

router.get(
  "/get-carts",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.getAll
);

router.delete(
  "/delete-cart/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.deleteCart
);

router.delete(
  "/remove-from-cart/:productId",
  checkToken,
  authorizeRoles(Roles.USER, Roles.ADMIN),
  container.removeFromCart
);

export default router;
