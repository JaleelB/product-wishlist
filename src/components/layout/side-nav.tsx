"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Icons } from "../ui/icons"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import React from "react"
import { getUserWishlists } from "@/app/_actions/wishlist-actions"
import { useUser } from "@clerk/nextjs"
import WishlistNavItem from "../wishlist-nav-link"
import { type Wishlist } from "@prisma/client"
  

export function SideNavigation() {

    const [isOpen, setIsOpen] = React.useState(true)
    const pathname = usePathname()
    const { user } = useUser();
    const [wishlists, setWishlists] = React.useState<Wishlist[]>([]);

    React.useEffect(() => {
        async function fetchWishlists(){
            if(!user?.id) return;
            const wishlists = await getUserWishlists({
                id: user?.id ?? '',
                path: pathname,
            });
            if (wishlists) {
                setWishlists(wishlists);
            }
        };
    
        void fetchWishlists();
    }, [user?.id, pathname]);

    return (
        <div className="w-full pr-4 py-6 lg:py-8 text-sm overflow-y-auto">
           <Link href="/home" className={cn("py-2 px-4 w-full flex gap-2 rounded-md bg-primary text-secondary")}>
                <Icons.home className={cn("h-5 w-4")} />
                <h4 className="text-sm">Home</h4>
           </Link>

           <Collapsible 
                open={isOpen}
                onOpenChange={setIsOpen}
                className={cn("mt-5")}
            >
                <CollapsibleTrigger className={cn("w-full text-muted-foreground hover:bg-accent rounded-md font-semibold py-2 px-4 inline-flex justify-between")}>
                    <div className="inline-flex gap-2">
                        <Icons.list className={cn("h-5 w-5")} />
                        Wishlists 
                    </div>
                    
                    <Icons.chevronRight className={cn(`h-5 w-5 ml-auto transition ${isOpen && 'rotate-90' }`)} />
                </CollapsibleTrigger>
                <CollapsibleContent className={cn("mt-2 ml-4 text-muted-foreground transition")}>
                    {
                        wishlists.length !== 0 ?
                        wishlists.map((wishlist: Wishlist) => {
                            return (
                                <WishlistNavItem
                                    key={wishlist.id}
                                    path={pathname}
                                    title={wishlist.title}
                                    wishlistId={wishlist.id}
                                />
                            )
                        })
                        :
                        <div className="text-muted-foreground pl-4">No wishlists here.</div>
                    }
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}