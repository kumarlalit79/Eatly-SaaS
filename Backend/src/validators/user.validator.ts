import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().optional(),
  avatarUrl: z.string().url().optional(),
});

export const onboardingSchema = z.object({
  isOnboarded: z.boolean(),
});
