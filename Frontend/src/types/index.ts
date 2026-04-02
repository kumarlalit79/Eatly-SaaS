export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  isOnboarded: boolean;
  emailVerified: boolean;
  createdAt: string;
}

export interface Subscription {
  id: string;
  plan: "FREE" | "PRO";
  status: "ACTIVE" | "CANCELLED" | "PAST_DUE" | "TRIALING";
  scansUsed: number;
  scansLimit: number | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
}

export interface Scan {
  id: string;
  userId: string;
  restaurantName: string | null;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  imageUrl: string;
  totalDishes: number;
  healthyCount: number;
  moderateCount: number;
  avoidCount: number;
  vegCount: number;
  nonVegCount: number;
  errorMessage: string | null;
  createdAt: string;
}

export interface Dish {
  id: string;
  scanId: string;
  name: string;
  description: string;
  vegStatus: "VEG" | "NON_VEG" | "EGG" | "SEAFOOD" | "UNKNOWN";
  healthBadge: "HEALTHY" | "MODERATE" | "AVOID";
  healthScore: number;
  ingredients: string[];
  cookingStyle: string;
  healthReason: string;
  bestFor: string;
  avoidIf: string;
  sortOrder: number;
}

export interface Recommendation {
  id: string;
  scanId: string;
  rank: number;
  reason: string;
  dish: Dish;
}

export interface UsageInfo {
  scansUsed: number;
  scansLimit: number | null;
  remaining: number | null;
  isUnlimited: boolean;
}
