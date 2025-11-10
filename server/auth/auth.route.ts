import { Router } from "express";
import { authContainer } from "./auth.container";
import { AuthController } from "./auth.controller";
import { validateZod } from "../middlewares/validate-zod.middleware";
import { CreateUserSchema } from "../user/zod/createUserSchema.zod";

const container = authContainer.get<AuthController>(AuthController);
const router = Router();

router.post("/register", validateZod(CreateUserSchema), container.register);
router.post("/login", container.login);
router.post("/forgot-password", container.forgotPassword);
router.post("/verify-code", container.verifyCode);
router.put("/reset-password", container.resetPassword);
router.get("/seed-admin", container.seedAdmin);

export default router;
