import { Router } from "express";
import { categoryContainer } from "./category.container";
import { CategoryController } from "./category.controller";
import { checkToken } from "../middlewares/checkToken.middleware";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware";
import { Roles } from "../enums/role.enum";
import { validateZod } from "../middlewares/validate-zod.middleware";
import { CategorySchema } from "./zod/category.zod";

const router = Router();

const container = categoryContainer.get<CategoryController>(CategoryController);

router.get("/get-categories", container.getAllCategories);

router.get("/get-categories/:id", container.getCategoryById);

router.post(
  "/create-category",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  validateZod(CategorySchema),
  container.createCategory
);

router.patch(
  "/update-category/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  validateZod(CategorySchema.partial()),
  container.updateCategory
);

router.delete(
  "/delete-category/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.deleteCategory
);

export default router;
