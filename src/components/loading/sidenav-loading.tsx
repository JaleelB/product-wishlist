import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export default function SideNavLoading(){
    return (
        <div className="w-full pr-4 py-6 lg:py-8 text-sm overflow-y-auto">
           <Skeleton className="h-4 w-[250px]" />
        
           <div className={cn("mt-5")}>
                <Skeleton className="h-4 w-[250px] mb-2" />

                <div className="flex gap-2">
                    <Skeleton className={cn("w-5 h-5 mb-1")} />
                    <Skeleton className={cn("w-[200px] h-4 mb-1")} />
                </div>
                
                <div className="flex gap-2">
                    <Skeleton className={cn("w-5 h-5 mb-1")} />
                    <Skeleton className={cn("w-[200px] h-4 mb-1")} />
                </div>

                <div className="flex gap-2">
                    <Skeleton className={cn("w-5 h-5 mb-1")} />
                    <Skeleton className={cn("w-[200px] h-4 mb-1")} />
                </div>

                <div className="flex gap-2">
                    <Skeleton className={cn("w-5 h-5 mb-1")} />
                    <Skeleton className={cn("w-[200px] h-4 mb-1")} />
                </div>
            </div>
        </div>
    )
}