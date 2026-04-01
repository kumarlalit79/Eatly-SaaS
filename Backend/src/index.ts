import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import scanRoutes from "./routes/scan.routes";
import subscriptionRoutes from "./routes/subscription.routes";

const app = new Hono().basePath("/api");

app.use(
  "*",
  cors({
    origin: env.FRONTEND_URL,
  }),
);

app.route("/auth", authRoutes);
app.route("/users", userRoutes);
app.route("/scans", scanRoutes);
app.route("/subscription", subscriptionRoutes);

app.get("/health", (c) => c.json({ status: "ok" }));

app.onError(errorHandler);

export default {
  port: env.PORT,
  fetch: app.fetch,
};
