import { z } from "zod";

export const wishlistSchema = z.object({
    name: z.string().nonempty(),
});
  