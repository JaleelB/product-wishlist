import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardHeaderLoader(){
    return (
        <header className="w-full">
            <Skeleton className="w-[50px] h-[10px] rounded-full mb-4" />
            <div className="sm:flex sm:items-start sm:justify-between w-full">
                <div className="mb-5 sm:mb-0 space-y-2">
                    <Skeleton className="w-[100px] h-3 rounded-full mb-4" />
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-[250px] sm:w-[450px]" />
                        <Skeleton className="h-3 w-[250px] sm:w-[450px]" />
                    </div>
                </div>
                <Skeleton className="h-12 w-[165px]" />
            </div>
        </header>
    )
}