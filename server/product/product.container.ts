import { Container } from "inversify";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";

export const productContainer = new Container();

productContainer.bind<ProductService>(ProductService).to(ProductService);
productContainer
  .bind<ProductController>(ProductController)
  .to(ProductController);
