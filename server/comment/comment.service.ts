import { injectable } from "inversify";
import { Repository } from "typeorm";
import { Comment } from "./comment.entity";
import { AppDataSource } from "../data-source";
import AppError from "../utils/appError";
import { NOT_FOUND, NOT_FOUND_REASON } from "../utils/statusCodes";
import { Product } from "../product/product.entity";
import { CreateCommentType } from "./zod/comment.zod";
import { UpdateCategoryType } from "../category/zod/category.zod";

@injectable()
export class CommentService {
  private commentRepo: Repository<Comment> =
    AppDataSource.getRepository(Comment);
  private productRepo: Repository<Product> =
    AppDataSource.getRepository(Product);

  private async getProductById(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product)
      throw new AppError("Product not found", NOT_FOUND, NOT_FOUND_REASON);
    return product;
  }

  async createComment(
    data: CreateCommentType,
    productId: string,
    userId: string
  ): Promise<Comment> {
    await this.getProductById(productId);
    const comment = this.commentRepo.create({
      content: data.content,
      product: { id: productId },
      productId,
      user: { id: userId },
      userId,
    });
    return await this.commentRepo.save(comment);
  }

  async getAllComments(): Promise<Comment[]> {
    const comments = await this.commentRepo.find({
      relations: ["product", "user"],
    });
    if (!comments.length)
      throw new AppError("No comments found", NOT_FOUND, NOT_FOUND_REASON);
    return comments;
  }

  async getProductComments(productId: string): Promise<Comment[]> {
    const comments = await this.commentRepo.find({
      where: { product: { id: productId } },
      relations: ["user"],
    });
    if (!comments.length)
      throw new AppError("No comments found", NOT_FOUND, NOT_FOUND_REASON);
    return comments;
  }

  async getCommentById(id: string): Promise<Comment> {
    const comment = await this.commentRepo.findOne({
      where: { id },
      relations: ["product", "user"],
    });
    if (!comment)
      throw new AppError("Comment not found", NOT_FOUND, NOT_FOUND_REASON);
    return comment;
  }

  async updateComment(id: string, data: UpdateCategoryType): Promise<string> {
    const comment = await this.getCommentById(id);
    await this.commentRepo.save(Object.assign(comment, data));
    return "Comment updated successfully";
  }

  async deleteComment(id: string): Promise<string> {
    const comment = await this.getCommentById(id);
    await this.commentRepo.remove(comment);
    return "Comment deleted successfully";
  }
}
