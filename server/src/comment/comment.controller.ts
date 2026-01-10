import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import { CommentService } from "./comment.service";
import { sendResponse } from "../utils/sendResponse";
import { CREATED, CREATED_REASON, OK, OK_REASON } from "../utils/statusCodes";

@injectable()
export class CommentController {
  constructor(@inject(CommentService) private commentService: CommentService) {}

  createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comment = await this.commentService.createComment(
        req.body,
        req.params.productId,
        (req as any).user.id
      );
      return sendResponse(res, comment, CREATED, CREATED_REASON);
    } catch (error) {
      next(error);
    }
  };

  getProductComments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { skip, take } = req.query;
      const { productId } = req.params;
      const { data, pagination } = await this.commentService.getProductComments(
        productId,
        Number(skip) || 0,
        Number(take) || 12
      );
      return sendResponse(res, data, OK, OK_REASON, pagination);
    } catch (error) {
      next(error);
    }
  };

  getAllComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skip, take } = req.query;
      const { data, pagination } = await this.commentService.getAllComments(
        Number(skip) || 0,
        Number(take) || 12
      );
      return sendResponse(res, data, OK, OK_REASON, pagination);
    } catch (error) {
      next(error);
    }
  };

  getCommentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const comment = await this.commentService.getCommentById(id);
      return sendResponse(res, comment, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const updated = await this.commentService.updateComment(id, content);
      return sendResponse(res, updated, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.commentService.deleteComment(id);
      return sendResponse(res, result, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };
}
