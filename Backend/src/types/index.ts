export interface JwtPayload {
  userId: string;
  email: string;
}

export interface DishFromAI {
  name: string;
  vegStatus: "veg" | "non_veg" | "egg" | "seafood" | "unknown";
  healthBadge: "healthy" | "moderate" | "avoid";
  healthScore: number;
  description: string;
  cookingStyle: string;
  healthReason: string;
  bestFor: string;
  avoidIf: string;
  ingredients: string[];
  isRecommended: boolean;
  recommendationReason: string;
}

export interface DishFilters {
  vegStatus?: string;
  badge?: string;
  sort?: string;
  page: number;
  limit: number;
}
