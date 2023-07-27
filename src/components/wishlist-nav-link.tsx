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
        <div className={cn("flex items-center justify-between w-full h-full group gap-2 text-muted-foreground hover:bg-accent rounded-md font-semibold py-1.5 px-4")}>
            <Link className="inline-flex gap-2 items-center" href={`/wishlist/${wishlistId}`}>
                <Icons.hash className={cn("h-4 w-4")} />
                <h4 className="text-sm font-normal line-clamp-1 group-hover:text-clip">{title}</h4>
            </Link>
            <WishlistOperations
                wishlistId={wishlistId}
                path={path}
            />
        </div>
    )
}