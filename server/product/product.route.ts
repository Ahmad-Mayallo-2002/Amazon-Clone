import { Router } from "express";
import { checkToken } from "../middlewares/checkToken.middleware";
import { productContainer } from "./product.container";
import { ProductController } from "./product.controller";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware";
import { Roles } from "../enums/role.enum";

 const router = Router();

const container = productContainer.get<ProductController>(ProductController);

router.get("/get-products", container.getAllProducts);

router.get("/get-product/:id", container.getProductById);

router.get(
  "/get-products-by-category/:category",
  container.getProductsByCategory
);

router.post(
  "/create-product",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.VENDOR),
  container.createProduct
);

router.put(
  "/update-product/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.VENDOR),
  container.updateProduct
);

router.delete(
  "/delete-product/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.VENDOR),
  container.deleteProduct
);

export default router;