import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardHeaderLoader(){
    return (
        <header className="w-full">
            <Skeleton className="w-[100px] h-5 rounded-full" />
            <div className="sm:flex sm:items-start sm:justify-between w-full">
                <div className="mb-5 sm:mb-0 space-y-2">
                    <Skeleton className="w-[50px] h-[20px] rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
                <Skeleton className="h-6 w-[165px]" />
            </div>
        </header>
    )
}