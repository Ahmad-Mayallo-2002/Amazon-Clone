import { Router } from "express";
import { reviewContainer } from "./review.container";
import { ReviewController } from "./review.controller";
import { checkToken } from "../middlewares/checkToken.middleware";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware";
import { Roles } from "../enums/role.enum";

const container = reviewContainer.get<ReviewController>(ReviewController);
const router = Router();

router.post("/create-review", checkToken, container.createReview);
router.get("/get-reviews", container.getAllReviews);
router.get("/get-reviews/:id", container.getReviewById);
router.get("/get-product-reviews/:productId", container.getReviewsByProductId);
router.get(
  "/get-product-avg-review/:productId",
  container.getAvarageReviewByProductId
);
router.put("/update-review/:id", checkToken, container.updateReview);
router.delete("/delete-review/:id", checkToken, authorizeRoles(Roles.ADMIN),container.deleteReview);

export default router;
