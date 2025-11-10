import { injectable } from "inversify";
import { Repository } from "typeorm";
import { Review } from "./review.entity";
import { AppDataSource } from "../data-source";
import AppError from "../utils/appError";
import { NOT_FOUND, NOT_FOUND_REASON } from "../utils/statusCodes";

@injectable()
export class ReviewService {
  private reviewRepo: Repository<Review>;

  constructor() {
    this.reviewRepo = AppDataSource.getRepository(Review);
  }

  async createReview(data: { value: number }): Promise<Review> {
    const review = this.reviewRepo.create(data);
    return await this.reviewRepo.save(review);
  }

  async getAllReviews(): Promise<Review[]> {
    const reviews = await this.reviewRepo.find({
      relations: ["product", "user"],
    });
    if (!reviews.length)
      throw new AppError("No reviews found", NOT_FOUND, NOT_FOUND_REASON);
    return reviews;
  }

  async getReviewById(id: string): Promise<Review> {
    const review = await this.reviewRepo.findOne({
      where: { id },
      relations: ["product", "user"],
    });
    if (!review)
      throw new AppError("Review not found", NOT_FOUND, NOT_FOUND_REASON);
    return review;
  }

  async getReviewsByProductId(productId: string): Promise<Review[]> {
    const reviews = await this.reviewRepo.find({
      where: { product: { id: productId } },
      relations: ["product", "user"],
    });
    if (!reviews.length)
      throw new AppError(
        "No reviews found for this product",
        NOT_FOUND,
        NOT_FOUND_REASON
      );
    return reviews;
  }

  async getAvarageReviewByProductId(productId: string): Promise<number> {
    const avg = await this.reviewRepo.average("value", {
      product: { id: productId },
    });
    return avg || 0;
  }

  async updateReview(id: string, data: any): Promise<string> {
    const review = await this.getReviewById(id);
    await this.reviewRepo.save(Object.assign(review, data));
    return "Review updated successfully";
  }

  async deleteReview(id: string): Promise<string> {
    const review = await this.getReviewById(id);
    await this.reviewRepo.remove(review);
    return "Review deleted successfully";
  }
}
