import { Router } from "express";
import { wishContainer } from "./wish.container";
import { WishController } from "./wish.controller";
import { checkToken } from "../middlewares/checkToken.middleware";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware";
import { Roles } from "../enums/role.enum";

const container = wishContainer.get<WishController>(WishController);
const router = Router();

router.get(
  "/get-wish-items",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.getAll
);
router.get(
  "/get-wish-user-item/:userId",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.USER),
  container.getByUserId
);
router.delete(
  "/delete-wish0item/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.deleteById
);

router.post(
  "/add-to-wish",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.USER),
  container.addToWish
);

router.delete(
  "/remove-from-item",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.USER),
  container.removeFromWish
);

export default router;
