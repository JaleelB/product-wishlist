"use client"
import { createUser } from "@/app/_actions/user-actions";
import DashboardHeader from "@/components/dashboard-header";
import { useUser } from "@clerk/nextjs";
import React from "react";
import EmptyState from "@/components/empty-state"

export default function DashboardHome(){

    const [isPending, startTransition] = React.useTransition();
    const { user } = useUser()

    React.useEffect(() => {
        if(!user) return;
        startTransition(() =>
            createUser({
                username: `${user.firstName} ${user.lastName}`,
                email: user?.emailAddresses[0]?.emailAddress ?? '',
                id: user.id,
            })
        );
    })

    return (
        <section className="py-6 lg:pl-8 lg:py-8 w-full h-full flex flex-col gap-8 overflow-y-auto">
            <DashboardHeader
                title="Product Wishlist"
                description="Welcome to your Wishlist Dashboard! Here, you can manage all your product wishlists at a glance."
                buttonText="Create Wishlist"
                segment="Home"
                action={() => console.log('Create Wishlist')}
            />
            <div className="w-full h-full flex items-center justify-center">
                <EmptyState/>
            </div>
        </section>
    )
}