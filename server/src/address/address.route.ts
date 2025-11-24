import { Router } from "express";
import { addressContainer } from "./address.container";
import { AddressController } from "./address.controller";
import { checkToken } from "../middlewares/checkToken.middleware";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware";
import { Roles } from "../enums/role.enum";
import { validateZod } from "../middlewares/validate-zod.middleware";
import { AddressSchema } from "./zod/address.zod";

const container = addressContainer.get<AddressController>(AddressController);
const router = Router();

router.get(
  "/get-addresses",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.getAllAddresses
);
router.get(
  "/get-addresses/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.getAddressById
);
router.get(
  "/get-user-addresses/:userId",
  authorizeRoles(Roles.ADMIN, Roles.USER),
  container.getAddressesByUserId
);
router.put(
  "/update-address/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  validateZod(AddressSchema),
  container.updateAddress
);
router.delete(
  "/delete-address/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.deleteAddress
);

export default router;
