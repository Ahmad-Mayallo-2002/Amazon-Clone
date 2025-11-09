import { Router } from "express";
import { authContainer } from "./auth.container";
import { AuthController } from "./auth.controller";

const container = authContainer.get<AuthController>(AuthController);
const router = Router();

router.post("/register", container.register);
router.post("/login", container.login);
router.post("/forgot-password", container.forgotPassword)
router.post('/verify-code', container.verifyCode);
router.put('/reset-password', container.resetPassword);

export default router;