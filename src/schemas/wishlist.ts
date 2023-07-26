import { z } from "zod";

export const createWishlistSchema = z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
});

export const updateWishlistSchema = z.object({
    name: z.string().nonempty().optional(),
    description: z.string().nonempty().optional(),
}).refine(data => data.name ?? data.description, {
    message: "At least one of name or description must be provided",
});