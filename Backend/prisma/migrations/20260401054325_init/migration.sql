-- CreateEnum
CREATE TYPE "plan_type" AS ENUM ('free', 'pro');

-- CreateEnum
CREATE TYPE "subscription_status" AS ENUM ('active', 'cancelled', 'past_due', 'trialing');

-- CreateEnum
CREATE TYPE "scan_status" AS ENUM ('pending', 'processing', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "veg_status_type" AS ENUM ('veg', 'non_veg', 'egg', 'seafood', 'unknown');

-- CreateEnum
CREATE TYPE "health_badge_type" AS ENUM ('healthy', 'moderate', 'avoid');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" TEXT,
    "google_id" VARCHAR(255),
    "avatar_url" TEXT,
    "is_onboarded" BOOLEAN NOT NULL DEFAULT false,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "plan" "plan_type" NOT NULL DEFAULT 'free',
    "status" "subscription_status" NOT NULL DEFAULT 'active',
    "stripe_customer_id" VARCHAR(255),
    "stripe_subscription_id" VARCHAR(255),
    "scans_used" INTEGER NOT NULL DEFAULT 0,
    "scans_limit" INTEGER DEFAULT 3,
    "current_period_start" TIMESTAMP(3),
    "current_period_end" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scans" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "restaurant_name" VARCHAR(255),
    "location" VARCHAR(255),
    "image_url" TEXT NOT NULL,
    "image_key" TEXT NOT NULL,
    "status" "scan_status" NOT NULL DEFAULT 'pending',
    "error_message" TEXT,
    "total_dishes" INTEGER NOT NULL DEFAULT 0,
    "healthy_count" INTEGER NOT NULL DEFAULT 0,
    "moderate_count" INTEGER NOT NULL DEFAULT 0,
    "avoid_count" INTEGER NOT NULL DEFAULT 0,
    "veg_count" INTEGER NOT NULL DEFAULT 0,
    "non_veg_count" INTEGER NOT NULL DEFAULT 0,
    "deleted_at" TIMESTAMP(3),
    "scanned_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dish_results" (
    "id" UUID NOT NULL,
    "scan_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "veg_status" "veg_status_type" NOT NULL DEFAULT 'unknown',
    "health_badge" "health_badge_type" NOT NULL DEFAULT 'moderate',
    "description" TEXT,
    "cooking_style" VARCHAR(100),
    "health_reason" TEXT,
    "best_for" TEXT,
    "avoid_if" TEXT,
    "ingredients" JSONB,
    "health_score" INTEGER,
    "is_recommended" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dish_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommendations" (
    "id" UUID NOT NULL,
    "scan_id" UUID NOT NULL,
    "dish_id" UUID NOT NULL,
    "reason" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_tokens" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "token_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe_webhook_events" (
    "id" UUID NOT NULL,
    "stripe_event_id" VARCHAR(255) NOT NULL,
    "event_type" VARCHAR(100) NOT NULL,
    "payload" JSONB NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stripe_webhook_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "users"("google_id");

-- CreateIndex
CREATE INDEX "scans_user_id_created_at_idx" ON "scans"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "scans_user_id_restaurant_name_idx" ON "scans"("user_id", "restaurant_name");

-- CreateIndex
CREATE INDEX "dish_results_scan_id_health_score_idx" ON "dish_results"("scan_id", "health_score" DESC);

-- CreateIndex
CREATE INDEX "dish_results_scan_id_veg_status_idx" ON "dish_results"("scan_id", "veg_status");

-- CreateIndex
CREATE INDEX "dish_results_scan_id_health_badge_idx" ON "dish_results"("scan_id", "health_badge");

-- CreateIndex
CREATE UNIQUE INDEX "recommendations_scan_id_rank_key" ON "recommendations"("scan_id", "rank");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_token_hash_key" ON "password_reset_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "password_reset_tokens_user_id_idx" ON "password_reset_tokens"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "stripe_webhook_events_stripe_event_id_key" ON "stripe_webhook_events"("stripe_event_id");

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scans" ADD CONSTRAINT "scans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dish_results" ADD CONSTRAINT "dish_results_scan_id_fkey" FOREIGN KEY ("scan_id") REFERENCES "scans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_scan_id_fkey" FOREIGN KEY ("scan_id") REFERENCES "scans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "dish_results"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
