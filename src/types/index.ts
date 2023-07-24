import type { LucideIcon } from "lucide-react"

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