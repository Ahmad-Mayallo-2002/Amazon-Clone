import { Router } from "express";
import { vendorContainer } from "./vendor.container";
import { VendorController } from "./vendor.controller";
import { checkToken } from "../middlewares/checkToken.middleware";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware";
import { Roles } from "../enums/role.enum";
import { adminOrOwner } from "../middlewares/adminOrOwner.middleware";
import { validateZod } from "../middlewares/validate-zod.middleware";
import { VendorSchema } from "./zod/vendor.zod";

const router = Router();

const container = vendorContainer.get<VendorController>(VendorController);

router.get(
  "/get-vendors",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.getVendors
);

router.get(
  "/get-vendors/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.VENDOR),
  adminOrOwner,
  container.getVendorById
);

router.patch(
  "/update-vendor/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.VENDOR),
  adminOrOwner,
  validateZod(VendorSchema.partial()),
  container.updateVendor
);

router.delete(
  "/delete-vendor/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.VENDOR),
  adminOrOwner,
  container.deleteVendor
);

router.patch(
  "/verify-vendor/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.verifyVendorExists
);

export default router;
