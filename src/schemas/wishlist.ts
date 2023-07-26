import { z } from "zod";

export const createWishlistSchema = z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
});

export const updateWishlistSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
}).refine(data => data.name?.trim() !== "" || data.description?.trim() !=="", {
    message: "At least one of name or description must be provided",
});
