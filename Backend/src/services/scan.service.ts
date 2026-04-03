import prisma from "../lib/prisma";
import { handleUpload } from "./upload.service";
import { analyzeMenu } from "./ai.service";
import type { DishFilters } from "../types";

export const createScan = async (userId: string, file: File) => {
  const sub = await prisma.subscriptions.findFirst({
    where: { user_id: userId },
  });

  if (!sub) {
    throw new Error("Subscription not found");
  }

  if (sub.scans_limit !== null && sub.scans_used >= sub.scans_limit) {
    throw new Error("Scan limit reached");
  }

  const { imageUrl, imageKey } = await handleUpload(file);

  const scan = await prisma.scans.create({
    data: {
      user_id: userId,
      image_url: imageUrl,
      image_key: imageKey,
    },
  });

  
  processScan(scan.id, imageUrl, userId);
  return scan;
};

export const processScan = async (
  scanId: string,
  imageUrl: string,
  userId: string,
) => {
  try {
    await prisma.scans.update({
      where: { id: scanId },
      data: { status: "processing" },
    });

    const res = await fetch(imageUrl);
    const buffer = Buffer.from(await res.arrayBuffer());
    const base64 = buffer.toString("base64");

    const dishes = await analyzeMenu(base64);

    let healthy = 0,
      moderate = 0,
      avoid = 0,
      veg = 0,
      nonVeg = 0;

    const created = await Promise.all(
      dishes.map((d: any, i: number) => {
        if (d.healthBadge === "healthy") healthy++;
        if (d.healthBadge === "moderate") moderate++;
        if (d.healthBadge === "avoid") avoid++;

        if (d.vegStatus === "veg") veg++;
        if (d.vegStatus === "non_veg") nonVeg++;

        return prisma.dish_results.create({
          data: {
            scan_id: scanId,
            name: d.name,
            veg_status: d.vegStatus,
            health_badge: d.healthBadge,
            description: d.description,
            cooking_style: d.cookingStyle,
            health_reason: d.healthReason,
            best_for: d.bestFor,
            avoid_if: d.avoidIf,
            ingredients: d.ingredients,
            health_score: d.healthScore,
            is_recommended: d.isRecommended ?? false,
            sort_order: i,
          },
        });
      }),
    );

   
    const recommendationPairs: { created: any; dish: any }[] = [];
    for (let i = 0; i < created.length; i++) {
      if (dishes[i].isRecommended) {
        recommendationPairs.push({ created: created[i], dish: dishes[i] });
      }
    }

    const topRecommendations = recommendationPairs.slice(0, 5);

    let rank = 1;
    for (const pair of topRecommendations) {
      await prisma.recommendations.create({
        data: {
          scan_id: scanId,
          dish_id: pair.created.id,
          reason: pair.dish.recommendationReason || pair.dish.healthReason || "Recommended",
          rank: rank++,
        },
      });
    }

    await prisma.scans.update({
      where: { id: scanId },
      data: {
        status: "completed",
        total_dishes: dishes.length,
        healthy_count: healthy,
        moderate_count: moderate,
        avoid_count: avoid,
        veg_count: veg,
        non_veg_count: nonVeg,
        scanned_at: new Date(),
      },
    });

    await prisma.subscriptions.updateMany({
      where: { user_id: userId },
      data: {
        scans_used: { increment: 1 },
      },
    });

    await prisma.users.update({
      where: { id: userId },
      data: { is_onboarded: true },
    });
  } catch (err: any) {
    await prisma.scans.update({
      where: { id: scanId },
      data: {
        status: "failed",
        error_message: err.message,
      },
    });
  }
};

export const getScanById = async (userId: string, id: string) => {
  return prisma.scans.findFirst({
    where: { id, user_id: userId },
  });
};

export const getScanHistory = async (
  userId: string,
  page: number,
  limit: number,
  search?: string,
) => {
  const where: any = {
    user_id: userId,
    deleted_at: null,
  };

  if (search) {
    where.restaurant_name = {
      contains: search,
      mode: "insensitive" as const,
    };
  }

  return prisma.scans.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { created_at: "desc" },
  });
};

export const getRecentScans = async (userId: string) => {
  return prisma.scans.findMany({
    where: {
      user_id: userId,
      status: "completed",
      deleted_at: null,
    },
    take: 3,
    orderBy: { created_at: "desc" },
  });
};

export const getDishes = async (scanId: string, filters: DishFilters) => {
  const where: any = { scan_id: scanId };

  if (filters.vegStatus) where.veg_status = filters.vegStatus;
  if (filters.badge) where.health_badge = filters.badge;

  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 20;

  return prisma.dish_results.findMany({
    where,
    orderBy:
      filters.sort === "healthiest"
        ? { health_score: "desc" }
        : filters.sort === "unhealthiest"
        ? { health_score: "asc" }
        : filters.sort === "alphabetical"
        ? { name: "asc" }
        : { sort_order: "asc" },
    skip: (page - 1) * limit,
    take: limit,
  });
};

export const getDishDetail = async (dishId: string) => {
  return prisma.dish_results.findUnique({
    where: { id: dishId },
  });
};

export const getRecommendations = async (scanId: string) => {
  return prisma.recommendations.findMany({
    where: { scan_id: scanId },
    include: { dish: true },
    orderBy: { rank: "asc" },
  });
};

export const renameScan = async (id: string, name: string) => {
  return prisma.scans.update({
    where: { id },
    data: { restaurant_name: name },
  });
};

export const softDeleteScan = async (id: string) => {
  return prisma.scans.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
};