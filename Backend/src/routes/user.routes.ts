import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import * as controller from "../controllers/user.controller";
import * as v from "../validators/user.validator";
import { authMiddleware } from "../middleware/auth";

const router = new Hono();

router.get("/profile", authMiddleware, controller.getProfile);

router.patch(
  "/profile",
  authMiddleware,
  zValidator("json", v.updateProfileSchema),
  controller.updateProfile,
);

router.patch(
  "/onboarding",
  authMiddleware,
  zValidator("json", v.onboardingSchema),
  controller.completeOnboarding
);

export default router;

