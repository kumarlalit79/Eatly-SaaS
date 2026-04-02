import { z } from "zod";

export const renameScanSchema = z.object({
  restaurantName: z.string(),
});
