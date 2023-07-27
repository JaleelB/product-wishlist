import type { LucideIcon } from "lucide-react"
import { type Product, type Wishlist } from '@prisma/client';
export interface NavItem {
    title: string
    href: string
    icon?: LucideIcon
}

export interface AuthUser {
    id: string
    username: string
    email: string
}

export interface WishlistWithProducts extends Wishlist {
  products: Product[];
}