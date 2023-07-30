import CreateProdcuctDialog from "@/components/create-product-dialog"
import DashboardHeader from "@/components/dashboard-header"
import ProductItem from "@/components/product-item";
import EmptyState from "@/components/ui/empty-state";
import { prisma } from "@/server/db"
import { type Product } from "@prisma/client";
import { redirect } from "next/navigation";


export default async function WishlistPage({ params }: { params: { slug: string } }){

    const wishlist = await prisma.wishlist.findUnique({
        where: {
          id: params.slug,
        },
        select: {
            title: true,
            description: true
        }
    });

    const products = await prisma.product.findMany({
        where: {
            wishlistId: params.slug
        }
    });

    if (!wishlist) {
       redirect('/home')
    }

    const maxItemsPerRow = 4;
    const emptyItems = products.length > maxItemsPerRow ? 0 : maxItemsPerRow - products.length;


    return (
        <section className="py-6 lg:pl-8 lg:py-8 w-full h-full flex flex-col gap-8 overflow-y-auto">
            <DashboardHeader
                title={wishlist?.title ?? ''}
                description={(wishlist.description as string) || "View and organize you wishlist's products here."}
                buttonText="Create a product"
                segment={wishlist?.title ?? ''}
                actionComponent={
                    <CreateProdcuctDialog
                        pathname={`/wishlist/${params.slug}`}
                        wishlistId={params.slug}
                    />
                }
            />
            <div className="w-full h-full relative">
                {
                    products.length === 0 ?
                    (
                        <div className="absolute left-1/2 top-1/2 w-fit h-fit -translate-x-1/2 -translate-y-1/2">
                            <EmptyState
                                message="You haven't created any products yet"
                                actionComponent={
                                    <CreateProdcuctDialog
                                        pathname={`/wishlist/${params.slug}`}
                                        wishlistId={params.slug}
                                    />
                                }
                            /> 
                        </div>
                    ):(
                        <div>
                            <div className="mt-4 product-grid pt-4 pb-[180px]">
                                {
                                    products.map((product: Product) => {
                                        return (
                                            <ProductItem key={product.id} product={product} path={`/wishlist/${params.slug}`} />
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