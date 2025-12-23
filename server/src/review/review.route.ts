import { Router } from "express";
import { reviewContainer } from "./review.container";
import { ReviewController } from "./review.controller";
import { checkToken } from "../middlewares/checkToken.middleware";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware";
import { Roles } from "../enums/role.enum";
import { validateZod } from "../middlewares/validate-zod.middleware";
import { ReviewSchema } from "./zod/review.zod";
import { adminOrOwner } from "../middlewares/adminOrOwner.middleware";

const container = reviewContainer.get<ReviewController>(ReviewController);
const router = Router();

router.get(
  "/get-reviews",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.getAllReviews
);
router.get(
  "/get-reviews/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.getReviewById
);
router.get(
  "/get-product-reviews/:productId",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.getReviewsByProductId
);
router.get(
  "/get-product-avg-review/:productId",
  container.getAvarageReviewByProductId
);
router.get(
  "/get-user-product-avg-review/:productId/:userId",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.USER),
  adminOrOwner((req) => req.params.userId),
  container.getAvarageReviewByProductId
);
router.patch(
  "/add-review/:productId",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.USER),
  validateZod(ReviewSchema),
  container.addReview
);
router.delete(
  "/delete-review/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.USER),
  container.deleteReview
);

export default router;
