import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation'
import MainNav from "@/components/layout/main-nav";
import UserAccountDropdown from "@/components/layout/user-account-dropdown";
import { SideNavigation } from "@/components/layout/side-nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


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
                <Button 
                    variant="outline"
                    className={cn("mx-8 inline-flex items-center rounded-md font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:mx-0 md:w-96 lg:w-[30rem]")}
                >
                    <Icons.search className="h-4 w-4 mr-4"/> 
                    Search
                </Button>
                <nav className="flex gap-2 items-center">
                    <Link href="https://github.com/JaleelB" className="hidden md:block">
                        <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                            <Icons.github className="h-5 w-5" />
                        </div>
                    </Link>
                    <Link href="https://twitter.com/jal_eelll" className="hidden md:block">
                        <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                            <Icons.twitter className="h-5 w-5"/>
                        </div>
                    </Link>
                    <UserAccountDropdown/>
                </nav>
            </MainNav>
            <div className="container grid flex-1 gap-12 lg:grid-cols-[300px_1fr]">
                <aside className="hidden w-[300px] flex-col lg:flex">
                    <SideNavigation/>
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}