import { Icons } from "@/components/icons";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation'
import MainNav from "@/components/layout/main-nav";
import UserAccountDropdown from "@/components/layout/user-account-dropdown";
import { SideNavigation } from "@/components/layout/side-nav";

export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const user = await currentUser();
    if(!user) redirect('/sign-in')

    return (
        <div className="flex w-screen h-screen flex-col">
            <MainNav>
                <nav className="flex gap-2 items-center">
                    <Link href="https://github.com/JaleelB">
                        <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                            <Icons.github className="h-5 w-5" />
                        </div>
                    </Link>
                    <Link href="https://twitter.com/jal_eelll">
                        <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                            <Icons.twitter className="h-5 w-5"/>
                        </div>
                    </Link>
                    <UserAccountDropdown/>
                </nav>
            </MainNav>
            <div className="container pl-4 grid flex-1 gap-12 md:grid-cols-[300px_1fr]">
                <aside className="hidden w-[300px] flex-col md:flex border-r">
                    <SideNavigation/>
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}