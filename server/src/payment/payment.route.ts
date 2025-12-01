import { Router } from "express";
import { paymentContainer } from "./payment.container";
import { PaymentController } from "./payment.controller";
import { checkToken } from "../middlewares/checkToken.middleware";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware";
import { Roles } from "../enums/role.enum";
import { validateZod } from "../middlewares/validate-zod.middleware";
import { PaymentSchema } from "./zod/payment.zod";

const controller = paymentContainer.get<PaymentController>(PaymentController);
const router = Router();

router.get(
  "/get-payments",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  controller.getAllPayments
);

router.get(
  "/get-payments/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.USER),
  controller.getPaymentById
);

router.patch(
  "/update-payment-status/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  validateZod(PaymentSchema.pick({ status: true })),
  controller.updatePaymentStatus
);

router.delete(
  "/delete-payment/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  controller.deletePayment
);

export default router;
