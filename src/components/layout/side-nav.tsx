"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Icons } from "../icons"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import React from "react"
  

export function SideNavigation() {

    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()

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
                <CollapsibleTrigger className={cn("w-full text-muted-foreground hover:bg-accent rounded-md font-semibold py-2 px-4 mb-1 inline-flex justify-between")}>
                    Wishlists
                    <Icons.chevronRight className={cn(`h-5 w-5 ml-auto transition ${isOpen && 'rotate-90' }`)} />
                </CollapsibleTrigger>
                <CollapsibleContent className={cn("pl-4 mt-2 text-muted-foreground transition")}>
                    <span className="text-zinc-400 font-normal">No wishlists inside</span>
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}