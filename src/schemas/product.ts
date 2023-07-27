import { z } from "zod";

export const createProductSchema  = z.object({
    url: z.string().url(),
})