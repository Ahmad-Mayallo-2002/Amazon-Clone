import { Router } from "express";
import { checkToken } from "../middlewares/checkToken.middleware";
import { commentContainer } from "./comment.container";
import { CommentController } from "./comment.controller";
import { validateZod } from "../middlewares/validate-zod.middleware";
import { CommentSchema } from "./zod/comment.zod";

const container = commentContainer.get<CommentController>(CommentController);
const router = Router();

router.post(
  "/create-comment/:productId",
  checkToken,
  validateZod(CommentSchema),
  container.createComment
);
router.get("/get-product-comments/:productId", container.getProductComments);
router.get("/get-comments", container.getAllComments);
router.get("/get-comments/:id", container.getCommentById);
router.put(
  "/update-comment/:id",
  checkToken,
  validateZod(CommentSchema.partial()),
  container.updateComment
);
router.delete("/delete-comment/:id", checkToken, container.deleteComment);

export default router;
