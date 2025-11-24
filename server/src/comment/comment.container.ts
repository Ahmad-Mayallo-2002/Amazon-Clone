import { Container } from "inversify";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";

export const commentContainer = new Container();

commentContainer.bind<CommentService>(CommentService).to(CommentService);
commentContainer
  .bind<CommentController>(CommentController)
  .to(CommentController);
