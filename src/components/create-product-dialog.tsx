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
import { useForm } from "react-hook-form"
import { type z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "./ui/use-toast"
import { Icons } from "./ui/icons"
import React from "react"
import { cn } from "@/lib/utils"
import { createProductSchema } from "@/schemas/product"
import { createProduct } from "@/app/_actions/product-actions"

type FormData = z.infer<typeof createProductSchema>

export default function CreateProdcuctDialog({
    pathname,
    wishlistId,
}:{
    pathname: string,
    wishlistId: string
}) {

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<FormData>({
        resolver: zodResolver(createProductSchema)
    });
    
    const [isProductDialogOpen, setIsProductDialogOpen] = React.useState<boolean>(false);
    const [isPending, startTransition] = React.useTransition();

    function onSubmit(data: FormData){
        
        startTransition(async () => {
        
            try{
                const wishList = await createProduct({
                    url: data.url,
                    path: pathname,
                    wishlistId: wishlistId
                })

                if(!wishList) throw new Error('Product could not be created.');

                setIsProductDialogOpen(false);
                toast({
                    title: "All done!",
                    description: "Your product was successfully created.",
                })
    
            }catch(err){
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Your product could not be created.",
                })
            }
        })

    }

    return (
        <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
            <DialogTrigger asChild>
                <Button 
                    className={cn("font-normal flex gap-2")}
                    onClick={()=> setIsProductDialogOpen(true)}
                    disabled={isPending}
                >
                    <Icons.add className="h-4 w-4 text-white" />
                    Create a Product
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Product</DialogTitle>
                    <DialogDescription>
                        Create your product by adding the product url here. Click save when you&nbsp;re done.
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <Label htmlFor="url" className="text-right">Product Url</Label>
                        <Input 
                            {...register('url')}
                            type="text" 
                            id="name"
                            placeholder="Add a descriptive name.."
                            className='w-full'
                            disabled={isPending}
                        />
                        {errors.url && typeof errors.url.message === 'string' && <p className='mt-2 text-sm text-red-500'>{errors.url.message}</p>}
                    </div>
                    <Button 
                        type="submit"
                        disabled={isPending}
                    >
                        { isPending && <Icons.spinner className="animate-spin h-4 w-4 text-white mr-2" />}
                        Add Product
                    </Button>
                </form>
                <Button 
                    onClick={()=> setIsProductDialogOpen(false)} 
                    variant="outline" 
                    className="-mt-6"
                    disabled={isPending}
                >
                    Cancel
                </Button>
            </DialogContent>
        </Dialog>
    )
}
