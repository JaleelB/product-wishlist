"use server";
import { prisma } from "@/server/db";
import { type Metadata } from "@/types";
import { revalidatePath } from "next/cache";
import { getMetadata } from "../_metadata";

export async function createProduct({
    url,
    wishlistId,
    path,
}: {
    url: string;
    wishlistId: string;
    path: string;
}) {
    try {
    
        const wishlist = await prisma.wishlist.findFirst({
            where: {
                id: wishlistId
            },
        });
    
        if (!wishlist) throw new Error("Wishlist does not exist");
        
        const metadata: Metadata = await getMetadata(url)

        if (!metadata.isProduct) throw new Error("This is not a product page");

        const product = await prisma.product.findFirst({
            where: {
                url: metadata.url.trim(),
                name: metadata.title.trim(),
            },
        });

        if (product) throw new Error("Product already exists");

        await prisma.product.create({
            data: {
                name: metadata.title.trim(),
                url: metadata.url.trim(),
                imageUrl: metadata.image.trim(),
                description: metadata.description.trim(),
                wishlist: {
                    connect: {
                        id: wishlistId,
                    },
                },
            },
        });
    
        revalidatePath(path);
        return { success: true };
    } catch (err) {
        console.error("Error creating product:", err);
        return null;
    }
}

export async function deleteProduct({
    wishlistId,
    productId,
    path,
}: {
    wishlistId: string;
    productId: string;
    path: string;
}) {
    try {
        
        const product = await prisma.product.findFirst({
            where: {
                id: productId,
                wishlistId: wishlistId,
            }
        });

        if (!product) throw new Error('Product does not exist');

        await prisma.product.delete({
            where: {
                id: product.id,
            }
        });

        revalidatePath(path);
        return { success: true };

    } catch (err) {
        console.error('Error deleting product:', err);
        return null;
    }
}