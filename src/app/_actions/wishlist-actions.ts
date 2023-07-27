"use server";
import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";


export async function createWishlist({
    name,
    userId,
    path,
    description
}: {
    name: string;
    userId: string;
    path: string;
    description: string;
}) {

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
                description: description,
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

export async function getUserWishlists({
    id,
    path
}:{
    id: string;
    path: string;
}) {
    try {
        const wishlists = await prisma.wishlist.findMany({
            where: {
                userId: id
            },
            include: {
                products: true
            }
        });

        revalidatePath(path);
        return wishlists;
        
    } catch (err) {
        console.error('Error getting user wishlists:', err);
        return [];
    }
}

export async function deleteWishlist({
    wishlistId,
    userId,
    path
}: {
    wishlistId: string;
    userId: string;
    path: string;
}) {
    try {
        if (!userId) throw new Error('User not logged in');

        const wishlist = await prisma.wishlist.findFirst({
            where: {
                id: wishlistId,
                userId: userId,
            }
        });

        if (!wishlist) throw new Error('Wishlist does not exist');

        await prisma.wishlist.delete({
            where: {
                id: wishlistId,
            }
        });

        revalidatePath(path);
        return { success: true };

    } catch (err) {
        console.error('Error deleting wishlist:', err);
        return null;
    }
}

export async function updateWishlist({
    wishlistId,
    userId,
    newName,
    description,
    path
}: {
    wishlistId: string;
    userId: string;
    description?: string;
    newName?: string;
    path: string;
}) {
    try {
        if (!userId) throw new Error('User not logged in');

        const wishlist = await prisma.wishlist.findFirst({
            where: {
                id: wishlistId,
                userId: userId,
            }
        });

        if (!wishlist) throw new Error('Wishlist does not exist');

        if (newName === wishlist.title && description === wishlist.description) {
            console.log('No changes to wishlist');
            return { success: false };
        }

        const updateData: Partial<{ title: string, description: string }> = {};
        if (newName && newName !== wishlist.title ) updateData.title = newName;
        if (description && description !== wishlist.description) updateData.description = description;

        if (Object.keys(updateData).length === 0) {
            return { success: false };
        }

       await prisma.wishlist.update({
            where: {
                id: wishlistId,
            },
            data: updateData
        });

        revalidatePath(path);
        return { success: true };

    } catch (err) {
        console.error('Error updating wishlist:', err);
        return null;
    }
}
