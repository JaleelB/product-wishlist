import { type WishlistWithProducts } from "@/types";
import Link from "next/link";

export default function WishlistItem({wishlist}:{wishlist: WishlistWithProducts}) {
    
    const angle = Math.floor(Math.random() * 360);

    return (
        <Link
            href={`/wishlist/${wishlist.id}`}
            className="w-full aspect-[1/.75] h-full flex flex-col shadow-sm border rounded-md"
        >
            <div 
                className="w-full h-full rounded-t-md border-b"
                style={{
                    backgroundColor: '#4158D0',
                    backgroundImage: `linear-gradient(${angle}deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)`
                }}
            ></div>
            <div className="w-full p-2.5 flex gap-2 items-center">
                <h2 className="text-base font-medium text-zinc-700 line-clamp-1">{wishlist.title}</h2>
            </div>
            <div className="text-muted-foreground text-sm px-2.5 line-clamp-1">{wishlist.description}</div>
            <div className="text-white text-[13px] sm:text-xs px-2.5 pt-2.5 pb-3.5 mt-1">
                <span className="py-1 px-2 rounded-sm text-muted-foreground bg-zinc-200/75">{wishlist.products.length} products</span>
            </div>
        </Link>
    )

}