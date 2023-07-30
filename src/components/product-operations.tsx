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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "./ui/icons"
import { Button } from "./ui/button"
import { deleteProduct } from "@/app/_actions/product-actions"


export default function ProductOperations({
    wishlistId,
    productId,
    path,
}:{
    wishlistId: string,
    productId: string,
    path: string,
}){

    const router = useRouter()
    const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
    const [isPending, startTransition] = React.useTransition();

    function deleteUserProduct(){
        startTransition(async() => {
            try{
                const deleteResponse  = await deleteProduct({
                    productId: productId,
                    path: path,
                    wishlistId: wishlistId
                })

                if(!deleteResponse || !deleteResponse.success) throw new Error()

                toast({
                    title: "Product deleted",
                    description: "Your product has been deleted.",
                })

            }catch(error){
                toast({
                    title: "Error",
                    description: "Something went wrong. Your product cannot be deleted. Please try again.",
                    variant: "destructive",
                })
            }
        })
    }


    return(
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button 
                        size="icon" 
                        className="px-2" 
                        variant="outline"
                    >
                        <Icons.ellipsis className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
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
                        <AlertDialogTitle>Are you sure you want to delete this product?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                deleteUserProduct()
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
        </>
    )
}