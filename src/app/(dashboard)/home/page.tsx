"use client"
import { createUser } from "@/app/_actions/user-actions";
import DashboardHeader from "@/components/dashboard-header";
import { useUser } from "@clerk/nextjs";
import React from "react";
import EmptyState from "@/components/ui/empty-state"
import { usePathname } from "next/navigation";
import CreateWishlistDialog from "@/components/create-wishlist-dialog";

export default function DashboardHome(){

    const [isPending, startTransition] = React.useTransition();
    const { user } = useUser();
    const pathname = usePathname();
    const [isWishlistOpen, setIsWishlistOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        startTransition(() =>
            createUser({
                username: `${user?.firstName} ${user?.lastName}`,
                email: user?.emailAddresses[0]?.emailAddress ?? '',
                id: user?.id ?? '',
            })
        );
    }, [user?.emailAddresses, user?.firstName, user?.id, user?.lastName])

    return (
        <section className="py-6 lg:pl-8 lg:py-8 w-full h-full flex flex-col gap-8 overflow-y-auto">
            <DashboardHeader
                title="Product Wishlist"
                description="Welcome to your Wishlist Dashboard! Here, you can manage all your product wishlists at a glance."
                buttonText="Create Wishlist"
                segment="Home"
                action={() => {
                    startTransition(() => setIsWishlistOpen(true));
                }}
            />
            <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
                <EmptyState/>
            </div>
            <CreateWishlistDialog
                open={isWishlistOpen}
                onClose={() => setIsWishlistOpen(false)}
                pathname={pathname}
                userId={user?.id ?? ''}
            />
        </section>
    )
}