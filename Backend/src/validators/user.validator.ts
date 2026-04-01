import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().optional(),
  avatar_url: z.string().url().optional(),
});

export const onboardingSchema = z.object({
  is_onboarded: z.boolean(),
});
