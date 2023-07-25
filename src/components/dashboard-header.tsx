"use client"
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Icons } from "./ui/icons";

export default function DashboardHeader({
    title,
    description,
    buttonText,
    segment,
    action
}:{
    title: string,
    description: string,
    buttonText: string,
    segment: string,
    action: () => void
}){

    return (
        <header className="w-full">
            <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
                <span>Wishlists</span>
                <svg 
                    viewBox="0 0 15 15" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4"
                >
                    <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
                <span className="capitalize text-primary">{segment}</span>
            </div>
            <div className="sm:flex sm:items-start sm:justify-between w-full">
                <div className="mb-5 sm:mb-0 space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-medium">{title}</h1>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-md">{description}</p>
                </div>
                <Button 
                    className={cn("font-normal flex gap-2")}
                    onClick={action}
                >
                    <Icons.add className="h-4 w-4 text-white" />
                    {buttonText}
                </Button>
            </div>
        </header>
    )
}