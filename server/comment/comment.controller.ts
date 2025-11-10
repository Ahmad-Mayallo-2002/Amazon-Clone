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
      const dto: any = req.body;
      const comment = await this.commentService.createComment(dto);
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
      const { productId } = req.params;
      const comments = await this.commentService.getProductComments(productId);
      return sendResponse(res, comments, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  getAllComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comments = await this.commentService.getAllComments();
      return sendResponse(res, comments, OK, OK_REASON);
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
      const dto: any = req.body;
      const updated = await this.commentService.updateComment(id, dto);
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
