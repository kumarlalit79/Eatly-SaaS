import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string(),

  // JWT
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default("7d"),

  // Firebase
  FIREBASE_SERVICE_ACCOUNT_PATH: z.string(),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),

  // Gemini
  GEMINI_API_KEY: z.string(),

  // Stripe
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_PRO_PRICE_ID: z.string(),
  STRIPE_PUBLISH_KEY: z.string().optional(),

  // Nodemailer
  SMTP_HOST: z.string().default("smtp.gmail.com"),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  FROM_EMAIL: z.string(),

  // App
  PORT: z.coerce.number().default(3000),
  FRONTEND_URL: z.string().default("http://localhost:5173"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
