import { Container } from "inversify";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";

export const reviewContainer = new Container();

reviewContainer.bind<ReviewService>(ReviewService).to(ReviewService);
reviewContainer.bind<ReviewController>(ReviewController).to(ReviewController);
