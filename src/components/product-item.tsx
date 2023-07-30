/* eslint-disable @next/next/no-img-element */
import { type Product } from "@prisma/client";
import Link from "next/link";
import { Button } from "./ui/button";
import ProductOperations from "./product-operations";

export default function WishlistItem({
    product,
    path
}:{
    product: Product,
    path: string
}) {

    return (
        <div className="w-full aspect-[1/.75] h-full flex flex-col gap-4 shadow-sm border rounded-md p-2.5" >
           <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-contain rounded-md"
            />
            <h2 className="font-medium text-zinc-700 line-clamp-2">{product.name}</h2>
            <div className="text-muted-foreground text-sm line-clamp-2">{product.description}</div>
            <div className="w-full flex gap-4">
                <Link 
                    href={product.url}
                    className="w-full text-white text-[13px] sm:text-xs"
                >
                    <Button 
                        className="w-full"
                    >
                        Visit Product
                    </Button>
                </Link>
                <ProductOperations
                    wishlistId={product.wishlistId}
                    productId={product.id}
                    path={path}
                />
            </div>
            
        </div>
    )

}