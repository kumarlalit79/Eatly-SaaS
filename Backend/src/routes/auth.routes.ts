import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import * as controller from "../controllers/auth.controller";
import * as v from "../validators/auth.validator";
import { authMiddleware } from "../middleware/auth";

const router = new Hono()

router.post("/signup", zValidator("json", v.signupSchema), controller.signup);
router.post("/login", zValidator("json", v.loginSchema), controller.login);
router.post("/google", zValidator("json", v.googleAuthSchema), controller.googleAuth);
router.post("/forgot-password", zValidator("json", v.forgotPasswordSchema), controller.forgotPassword);
router.post("/reset-password", zValidator("json", v.resetPasswordSchema), controller.resetPassword);

router.get("/me", authMiddleware, controller.getMe);

export default router;