import { Router } from "express";
import { checkToken } from "../middlewares/checkToken.middleware";
import { productContainer } from "./product.container";
import { ProductController } from "./product.controller";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware";
import { Roles } from "../enums/role.enum";
import { validateZod } from "../middlewares/validate-zod.middleware";
import { ProductSchema } from "./zod/product.zod";
import { upload } from "../utils/multer";
import { adminOrProductOwner } from "../middlewares/adminOrProductOwner.middleware";

const router = Router();

const container = productContainer.get<ProductController>(ProductController);

router.get("/get-products", container.getAllProducts);

router.get("/get-products/:id", container.getProductById);

router.get("/get-products-by-category", container.getProductsByCategory);

router.get(
  "/get-products-by-vendorId/:vendorId",
  container.getProductsByVendorId
);

router.get("/search-products", container.searchProducts);

router.post(
  "/create-product",
  upload.single("image"),
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.VENDOR),
  validateZod(ProductSchema),
  container.createProduct
);

router.patch(
  "/update-product/:id/:vendorId",
  upload.single("image"),
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.VENDOR),
  adminOrProductOwner,
  validateZod(ProductSchema.partial()),
  container.updateProduct
);

router.delete(
  "/delete-product/:id/:vendorId",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.VENDOR),
  adminOrProductOwner,
  container.deleteProduct
);

export default router;
