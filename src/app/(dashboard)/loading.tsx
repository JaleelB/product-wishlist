import DashboardHeaderLoader from "@/components/loading/dashboard-header-loading";
import WishlistLoader from "@/components/loading/wishlist-loading";


export default  function DashboardLoading() {

    return (
        <div className="flex w-full flex-1 flex-col overflow-hidden pt-8">
            <DashboardHeaderLoader/>
            <div className="mt-12 sm:mt-24 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    Array.from({length: 12}).map((_, i) => {
                        return (
                            <div key={i} className="w-full]">
                                <WishlistLoader/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}