import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import * as c from "../controllers/scan.controller";
import { zValidator } from "@hono/zod-validator";
import { renameScanSchema } from "../validators/scan.validator";

const router = new Hono();

router.post("/", authMiddleware, c.createScan);
router.get("/", authMiddleware, c.history);
router.get("/recent", authMiddleware, c.recent);

router.get("/:id", authMiddleware, c.getScan);
router.get("/:id/dishes", authMiddleware, c.dishes);
router.get("/:id/dishes/:dishId", authMiddleware, c.dishDetail);
router.get("/:id/recommendations", authMiddleware, c.recommendations);

router.patch(
  "/:id",
  authMiddleware,
  zValidator("json", renameScanSchema),
  c.rename,
);
router.delete("/:id", authMiddleware, c.remove);

export default router;
