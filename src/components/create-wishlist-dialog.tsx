/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { wishlistSchema } from "@/schemas/wishlist"
import { useForm } from "react-hook-form"
import { type z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { createWishlist } from "@/app/_actions/wishlist-actions"
import { toast } from "./ui/use-toast"

type FormData = z.infer<typeof wishlistSchema>

export default function CreateWishlistDialog({
    open,
    onClose,
    pathname,
    userId,
}:{
    open: boolean, 
    onClose: () => void,
    pathname: string,
    userId: string
}) {

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<FormData>({
        resolver: zodResolver(wishlistSchema)
    });

    async function onSubmit(data: FormData){
        
        try{
            const wishList = await createWishlist({
                name: data.name,
                userId: userId,
                path: pathname,
            })

            if(!wishList) throw new Error('Wishlist could not be created.');

            onClose();
            
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

    }

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>New Wishlist</DialogTitle>
                <DialogDescription>
                    Create your product wishlist here. Click save when you&nbsp;re done.
                </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2 mb-4">
                        <Label htmlFor="name" className="text-right">Wishlist Name</Label>
                        <Input 
                            {...register('name')}
                            type="text" 
                            id="name"
                            placeholder="Add a descriptive name.."
                            className='w-full'
                        />
                        {errors.name && typeof errors.name.message === 'string' && <p className='mt-2 text-sm text-red-500'>{errors.name.message}</p>}
                    </div>
                    <Button type="submit">Add wishlist</Button>
                </form>
                <Button 
                    onClick={onClose} 
                    variant="outline" 
                    className="-mt-6"
                >
                    Cancel
                </Button>
            </DialogContent>
        </Dialog>
    )
}
