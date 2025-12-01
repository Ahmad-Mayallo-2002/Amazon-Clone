import { inject, injectable } from "inversify";
import { ReviewService } from "./review.service";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { CREATED, CREATED_REASON, OK, OK_REASON } from "../utils/statusCodes";

@injectable()
export class ReviewController {
  constructor(@inject(ReviewService) private reviewService: ReviewService) {}

  getAllReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skip, take } = req.query;
      const { data, pagination } = await this.reviewService.getAllReviews(
        Number(skip) || 0,
        Number(take) || 10
      );
      return sendResponse(res, data, OK, OK_REASON, pagination);
    } catch (error) {
      next(error);
    }
  };

  getReviewById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await this.reviewService.getReviewById(req.params.id);
      return sendResponse(res, review, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  getReviewsByProductId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reviews = await this.reviewService.getReviewsByProductId(
        req.params.productId
      );
      return sendResponse(res, reviews, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  getAvarageReviewByProductId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const avg = await this.reviewService.getAvarageReviewByProductId(
        req.params.productId
      );
      return sendResponse(res, avg, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  addReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = await this.reviewService.addReview(
        req.params.productId,
        req.body.value,
        (req as any).user.id
      );
      return sendResponse(res, message, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };

  deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = await this.reviewService.deleteReview(req.params.id);
      res.status(200).json({ message });
      return sendResponse(res, message, OK, OK_REASON);
    } catch (error) {
      next(error);
    }
  };
}
