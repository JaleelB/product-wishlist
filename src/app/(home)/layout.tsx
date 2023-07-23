import FullNav from "@/components/full-nav";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Link from "next/link";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
        <FullNav>
            <div className="flex gap-2 items-center">
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
                <Link href="/sign-in">
                    <Button className="ml-3 px-6 rounded-full">Sign In</Button>
                </Link>
            </div>
        </FullNav>
        <main className="flex-grow w-screen">
            {children}
        </main>
        <Footer/>
    </div>
  );
}