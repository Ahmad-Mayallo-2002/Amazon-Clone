import { Router } from "express";
import { checkToken } from "../middlewares/checkToken.middleware";
import { commentContainer } from "./comment.container";
import { CommentController } from "./comment.controller";
import { validateZod } from "../middlewares/validate-zod.middleware";
import { CommentSchema } from "./zod/comment.zod";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware";
import { Roles } from "../enums/role.enum";

const container = commentContainer.get<CommentController>(CommentController);
const router = Router();

router.post(
  "/create-comment/:productId",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.USER),
  validateZod(CommentSchema),
  container.createComment
);
router.get("/get-product-comments/:productId", container.getProductComments);
router.get(
  "/get-comments",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.getAllComments
);
router.get(
  "/get-comments/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN),
  container.getCommentById
);
router.patch(
  "/update-comment/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.USER),
  validateZod(CommentSchema.partial()),
  container.updateComment
);
router.delete(
  "/delete-comment/:id",
  checkToken,
  authorizeRoles(Roles.ADMIN, Roles.USER),
  container.deleteComment
);

export default router;
