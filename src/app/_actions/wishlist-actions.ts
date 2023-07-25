"use server";
import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";

interface CreateWishlistInput {
    name: string;
    userId: string;
    path: string;
}

export async function createWishlist({
    name,
    userId,
    path
}: CreateWishlistInput) {

    try {
        if (!userId) throw new Error('User not logged in');

        const wishlist = await prisma.wishlist.findFirst({
            where: {
                title: name,
                userId: userId,
            }
        });

        if (wishlist) throw new Error('Wishlist already exists');

        const newWishlist = await prisma.wishlist.create({
            data: {
                title: name,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });

        revalidatePath(path);
        return newWishlist;

    } catch (err) {
        console.error('Error creating wishlist:', err);
        return null;
    }
}
