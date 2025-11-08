import { Router } from "express";
import { cartContainer } from "./cart.container";
import { CartController } from "./cart.controller";

const container = cartContainer.get<CartController>(CartController);
const router = Router();

export default router;