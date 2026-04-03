import type { Context } from "hono";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (err: Error, c: Context) => {
  console.error("Error:", err.message);

  if (err instanceof AppError) {
    return c.json({ error: err.message }, err.statusCode as any);
  }

  
  return c.json({ error: err.message || "Internal server error" }, 500);
};
