import { Hono } from "hono";
import { cors } from "hono/cors";
import dotenv from "dotenv";
dotenv.config();

const app = new Hono().basePath("/api");

app.use(
  "*",
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

// app.route("/auth", authRoutes);
// app.route("/users", userRoutes);
// app.route("/scans", scanRoutes);
// app.route("/subscription", subscriptionRoutes);
// app.route("/webhooks", webhookRoutes);

app.get("/health", (c) => c.json({ status: "ok" }));

// app.onError(errorHandler);

export default {
  port: process.env.PORT,
  fetch: app.fetch,
};
