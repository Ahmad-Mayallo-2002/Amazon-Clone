import { Router } from "express";
import { checkToken } from "../middlewares/checkToken.middleware";
import { commentContainer } from "./comment.container";
import { CommentController } from "./comment.controller";

const container = commentContainer.get<CommentController>(CommentController);
const router = Router();

router.post("/create-comment", checkToken, container.createComment);
router.get("/get-product-comments/:productId", container.getProductComments);
router.get("/get-comments", container.getAllComments);
router.get("/get-comments/:id", container.getCommentById);
router.put("/update-comment/:id", checkToken, container.updateComment);
router.delete("/delete-comment/:id", checkToken, container.deleteComment);

export default router;
