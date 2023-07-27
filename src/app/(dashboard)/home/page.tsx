import DashboardHeader from "@/components/dashboard-header";
import { currentUser } from "@clerk/nextjs";
import EmptyState from "@/components/ui/empty-state"
import CreateWishlistDialog from "@/components/create-wishlist-dialog";
import { getUserWishlists } from "@/app/_actions/wishlist-actions";
import WishlistItem from "@/components/wishlist-item";
import { type WishlistWithProducts } from "@/types";

export default async function DashboardHome(){

    const user = await currentUser();
    const wishlists = await getUserWishlists({
        id: user?.id ?? '', 
        path: "/home"
    });
    const maxItemsPerRow = 4;
    const emptyItems = wishlists.length > maxItemsPerRow ? 0 : maxItemsPerRow - wishlists.length;

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
            <div className="w-full h-full relative">
                {
                    wishlists.length === 0 ?
                    (
                        <div className="absolute left-1/2 top-1/2 w-fit h-fit -translate-x-1/2 -translate-y-1/2">
                          <EmptyState
                                message="You don't have any wishlists yet!"
                                actionComponent={
                                    <CreateWishlistDialog
                                        pathname={"/home"}
                                        userId={user?.id ?? ''}
                                    />
                                }
                          />  
                        </div>
                    ):(
                        <div>
                            <div className="mt-4 wishlist-grid pt-4 pb-[180px]">
                                {
                                    wishlists.map((wishlist: WishlistWithProducts) => {
                                        return (
                                            <WishlistItem key={wishlist.id} wishlist={wishlist}/>
                                        )
                                    })
                                }
                                {Array(emptyItems).fill(<div></div>)}
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    )
}