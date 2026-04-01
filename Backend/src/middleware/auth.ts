import type { Context, Next } from "hono";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { env } from "../config/env";
import type { JwtPayload } from "../types";

export const authMiddleware = async (c: Context, next: Next) => {
  const header = c.req.header("Authorization");
  if (!header) return c.json({ error: "Unauthorized" }, 401);

  const token = header.split(" ")[1];
  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    const user = await prisma.users.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) return c.json({ error: "Unauthorized" }, 401);
    c.set("user", user);
    c.set("userId", user.id);

    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);
  }
};
