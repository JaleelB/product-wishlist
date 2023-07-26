import { cn } from "@/lib/utils"
import Link from "next/link"
import { Icons } from "./ui/icons"
import WishlistOperations from "./wishlist-operations"

export default function WishlistNavItem({
    path,
    title,
    wishlistId
}:{
    path: string,
    title: string,
    wishlistId: string
}){
    return (
        <Link 
            href={path}
            className={cn("flex items-center justify-between w-full h-full group gap-2 text-muted-foreground hover:bg-accent rounded-md font-semibold py-1.5 px-4")}
        >
            <div className="inline-flex gap-2 items-center">
                <Icons.hash className={cn("h-4 w-4")} />
                <h4 className="text-sm font-normal">{title}</h4>
            </div>
            <WishlistOperations
                wishlistId={wishlistId}
                path={path}
            />
        </Link>
    )
}