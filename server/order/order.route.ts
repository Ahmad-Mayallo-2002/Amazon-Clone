import { Router } from "express";
import { orderContainer } from "./order.container";
import { OrderController } from "./order.controller";
import { checkToken } from "../middlewares/checkToken.middleware";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware";
import { Roles } from "../enums/role.enum";

const controller = orderContainer.get(OrderController);
const router = Router();

router.get(
  "/get-orders",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  controller.getAllOrders
);

router.get(
  "/get-user-orders/:userId",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.USER),
  controller.getUserOrders
);

router.get(
  "/get-orders/:orderId",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.USER),
  controller.getOrder
);

router.delete(
  "/delete-order/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  controller.deleteOrder
);

router.patch(
  "/update-order-status/:orderId",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  controller.updateOrderStatus
);

router.post(
  "/create-order",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.USER),
  controller.createOrder
);

export default router;
