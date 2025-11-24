import { Container } from "inversify";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";

export const categoryContainer = new Container();

categoryContainer.bind<CategoryService>(CategoryService).to(CategoryService);
categoryContainer
  .bind<CategoryController>(CategoryController)
  .to(CategoryController);
