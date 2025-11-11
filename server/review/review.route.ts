import { Router } from "express";
import { reviewContainer } from "./review.container";
import { ReviewController } from "./review.controller";
import { checkToken } from "../middlewares/checkToken.middleware";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware";
import { Roles } from "../enums/role.enum";
import { validateZod } from "../middlewares/validate-zod.middleware";
import { ReviewSchema } from "./zod/review.zod";

const container = reviewContainer.get<ReviewController>(ReviewController);
const router = Router();

router.get("/get-reviews", container.getAllReviews);
router.get("/get-reviews/:id", container.getReviewById);
router.get("/get-product-reviews/:productId", container.getReviewsByProductId);
router.get(
  "/get-product-avg-review/:productId",
  container.getAvarageReviewByProductId
);
router.put(
  "/add-review/:productId",
  checkToken,
  validateZod(ReviewSchema),
  container.addReview
);
router.delete(
  "/delete-review/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.deleteReview
);

export default router;
