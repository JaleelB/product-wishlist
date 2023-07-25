import DashboardHeader from "@/components/dashboard-header";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import EmptyState from "@/components/ui/empty-state"
import CreateWishlistDialog from "@/components/create-wishlist-dialog";
import { getUserWishlists } from "@/app/_actions/wishlist-actions";
import { type Wishlist } from "@prisma/client";

export default async function DashboardHome(){

    const user = await currentUser();
    const wishlists = await getUserWishlists({
        id: user?.id ?? '', 
        path: "/home"
    });

    return (
        <section className="py-6 lg:pl-8 lg:py-8 w-full h-full flex flex-col gap-8 overflow-y-auto">
            <DashboardHeader
                title="Product Wishlist"
                description="Welcome to your Wishlist Dashboard! Here, you can manage all your product wishlists at a glance."
                buttonText="Create Wishlist"
                segment="Home"
                actionComponent={
                    <CreateWishlistDialog
                        pathname={"/home"}
                        userId={user?.id ?? ''}
                    />
                }
            />
            <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
                
                {
                    wishlists.length === 0 ?
                    (
                        <EmptyState/>
                    ):(
                        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
                            {
                                wishlists.map((wishlist: Wishlist) => {
                                    return (
                                        <div key={wishlist.id}>
                                            {wishlist.title}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        </section>
    )
}