import { Router } from "express";
import { vendorContainer } from "./vendor.container";
import { VendorController } from "./vendor.controller";
import { checkToken } from "../middlewares/checkToken.middleware";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware";
import { Roles } from "../enums/role.enum";
import { adminOrOwnerProfileMiddleware } from "../middlewares/adminOrOwnerProfile.middleware";

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
  adminOrOwnerProfileMiddleware,
  container.getVendorById
);

router.put(
  "/update-vendor/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.VENDOR),
  adminOrOwnerProfileMiddleware,
  container.updateVendor
);

router.delete(
  "/delete-vendor/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.VENDOR),
  adminOrOwnerProfileMiddleware,
  container.deleteVendor
);

router.put(
  "/verify-vendor/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.verifyVendorExists
);

export default router;
