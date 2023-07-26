/* eslint-disable @typescript-eslint/no-misused-promises */
"use client"
import { useRouter } from "next/navigation"
import * as React from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "./ui/icons"
import { deleteWishlist, updateWishlist } from "@/app/_actions/wishlist-actions"
import { useUser } from "@clerk/nextjs"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateWishlistSchema } from "@/schemas/wishlist"
import { type z } from "zod"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

type FormData = z.infer<typeof updateWishlistSchema>

export default function WishlistOperations({
    wishlistId,
    path,
}:{
    wishlistId: string,
    path: string,
}){

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<FormData>({
        resolver: zodResolver(updateWishlistSchema)
    });

    const router = useRouter()
    const { user } = useUser()
    const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
    const [showEditDialog, setShowEditDialog] = React.useState<boolean>(false)
    const [isPending, startTransition] = React.useTransition()

    function deleteUserWishlist(){
        startTransition(async() => {
            try{
                const deleteResponse  = await deleteWishlist({
                    userId: user?.id ?? '',
                    path: path,
                    wishlistId: wishlistId
                })

                if(!deleteResponse || !deleteResponse.success) throw new Error()

                toast({
                    title: "Wishlist deleted",
                    description: "Your wishlist has been deleted.",
                })

            }catch(error){
                toast({
                    title: "Error",
                    description: "Something went wrong. Your wishlist cannot be deleted. Please try again.",
                    variant: "destructive",
                })
            }
        })
    }

    function editUserWishlist(data: FormData){
        startTransition(async() => {
            try{
                const updateResponse  = await updateWishlist({
                    userId: user?.id ?? '',
                    path: path,
                    newName: data.name,
                    wishlistId: wishlistId,
                    description: data.description,
                });

                if(!updateResponse || !updateResponse.success) throw new Error();

                toast({
                    title: "Hooray!",
                    description: "Your wishlist has been updated.",
                });

                setShowEditDialog(false);

            }catch(error){
                toast({
                    title: "Ooops!",
                    description: "Something went wrong. Your wishlist cannot be updated. Please try again.",
                    variant: "destructive",
                });
            }
        })
        
    }

    return(
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="invisible group-hover:visible">
                    <Icons.ellipsis className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                        onSelect={() => setShowDeleteAlert(true)}
                    >
                        Delete
                    </DropdownMenuItem>
                    </DropdownMenuContent>
            </DropdownMenu>

            {/* delete alert */}
            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this wishlist?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                deleteUserWishlist()
                                router.refresh()
                            }}
                            className="bg-red-600 focus:ring-red-600 text-white"
                        >
                            {isPending ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Icons.trash className="mr-2 h-4 w-4" />
                            )}
                            <span>Delete</span>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* edit dialog */}
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit wishlist</DialogTitle>
                        <DialogDescription>
                            Make changes to your wishlist here. Click save when you&nbsp;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="grid gap-4 py-4" onSubmit={handleSubmit(editUserWishlist)}>
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
                        <Button type="submit" onClick={handleSubmit(editUserWishlist)}>
                            { isPending && <Icons.spinner className="animate-spin h-4 w-4 text-white mr-2" />}
                            Save changes
                        </Button>
                    </form>
                    <Button 
                        onClick={()=> setShowEditDialog(false)} 
                        variant="outline" 
                        className="-mt-6"
                    >
                        Cancel
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    )
}