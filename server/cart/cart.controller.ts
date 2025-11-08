import { inject, injectable } from "inversify";
import { CartService } from "./cart.service";

@injectable()
export class CartController {
  constructor(@inject(CartService) private cartService: CartService) {}
}
