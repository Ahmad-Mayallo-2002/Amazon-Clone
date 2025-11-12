import { Router } from "express";
import { authContainer } from "./auth.container";
import { AuthController } from "./auth.controller";
import { validateZod } from "../middlewares/validate-zod.middleware";
import { UserSchema } from "../user/zod/user.zod";
import { LoginShema } from "./zod/login.zod";
import { VendorSchema } from "../vendor/zod/vendor.zod";

const container = authContainer.get<AuthController>(AuthController);
const router = Router();

router.post("/register", validateZod(UserSchema), container.register);
router.post(
  "/register-vendor",
  validateZod(UserSchema, VendorSchema),
  container.registerVendor
);
router.post("/login", validateZod(LoginShema), container.login);
router.post("/forgot-password", container.forgotPassword);
router.post("/verify-code", container.verifyCode);
router.put("/reset-password", container.resetPassword);
router.get("/seed-admin", container.seedAdmin);

export default router;
