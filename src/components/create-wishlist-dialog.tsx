/* eslint-disable @typescript-eslint/no-misused-promises */
"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createWishlistSchema } from "@/schemas/wishlist"
import { useForm } from "react-hook-form"
import { type z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { createWishlist } from "@/app/_actions/wishlist-actions"
import { toast } from "./ui/use-toast"
import { Icons } from "./ui/icons"
import React from "react"
import { cn } from "@/lib/utils"

type FormData = z.infer<typeof createWishlistSchema>

export default function CreateWishlistDialog({
    pathname,
    userId,
}:{
    pathname: string,
    userId: string
}) {

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<FormData>({
        resolver: zodResolver(createWishlistSchema)
    });
    
    const [isWishlistOpen, setIsWishlistOpen] = React.useState<boolean>(false);
    const [isPending, startTransition] = React.useTransition();

    function onSubmit(data: FormData){
        
        startTransition(async () => {
        
            try{
                const wishList = await createWishlist({
                    name: data.name,
                    userId: userId,
                    path: pathname,
                    description: data.description,
                })

                if(!wishList) throw new Error('Wishlist could not be created.');

                setIsWishlistOpen(false);
                toast({
                    title: "All done!",
                    description: "Your wishlist was successfully created.",
                })
    
            }catch(err){
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Your wishlist could not be created.",
                })
            }
        })

    }

    return (
        <Dialog open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
            <DialogTrigger asChild>
                <Button 
                    className={cn("font-normal flex gap-2")}
                    onClick={()=> setIsWishlistOpen(true)}
                >
                    <Icons.add className="h-4 w-4 text-white" />
                    Create Wishlists
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Wishlist</DialogTitle>
                    <DialogDescription>
                        Create your product wishlist here. Click save when you&nbsp;re done.
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-right">Wishlist Name</Label>
                        <Input 
                            {...register('name')}
                            type="text" 
                            id="name"
                            placeholder="Add a descriptive name.."
                            className='w-full'
                            disabled={isPending}
                        />
                        {errors.name && typeof errors.name.message === 'string' && <p className='mt-2 text-sm text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2 mb-4">
                        <Label htmlFor="description" className="text-right">Wishlist Description</Label>
                        <Input 
                            {...register('description')}
                            type="text" 
                            id="descripition"
                            placeholder="Add a description.."
                            className='w-full'
                            disabled={isPending}
                        />
                        {errors.description && typeof errors.description.message === 'string' && <p className='mt-2 text-sm text-red-500'>{errors.description.message}</p>}
                    </div>
                    <Button type="submit">
                        { isPending && <Icons.spinner className="animate-spin h-4 w-4 text-white mr-2" />}
                        Add wishlist
                    </Button>
                </form>
                <Button 
                    onClick={()=> setIsWishlistOpen(false)} 
                    variant="outline" 
                    className="-mt-6"
                >
                    Cancel
                </Button>
            </DialogContent>
        </Dialog>
    )
}
