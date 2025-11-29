import { Router } from "express";
import { wishContainer } from "./wish.container";
import { WishController } from "./wish.controller";
import { checkToken } from "../middlewares/checkToken.middleware";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware";
import { Roles } from "../enums/role.enum";
import { adminOrOwner } from "../middlewares/adminOrOwner.middleware";

const container = wishContainer.get<WishController>(WishController);
const router = Router();

router.get(
  "/get-wish-items",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.getAll
);

router.get(
  "/get-wish-user-items/:userId",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.USER),
  adminOrOwner((req) => req.params.userId),
  container.getByUserId
);

router.delete(
  "/delete-wish-item/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.deleteById
);

router.post(
  "/add-to-wish/:productId",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.USER),
  container.addToWish
);

router.delete(
  "/remove-from-wish/:productId/:wishId",
  checkToken,
  container.removeFromWish
);

export default router;
