import { z } from "zod";

export const renameScanSchema = z.object({
  restaurant_name: z.string(),
});
