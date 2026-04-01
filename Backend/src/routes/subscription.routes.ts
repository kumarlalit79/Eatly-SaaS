import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import * as controller from "../controllers/subscription.controller";

const router = new Hono();

router.get("/", authMiddleware, controller.getSubscription);
router.get("/usage", authMiddleware, controller.getUsage);

export default router;