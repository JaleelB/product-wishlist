import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="container h-full max-w-[1400px] mx-auto flex flex-col gap-8 items-center justify-center">
      <h1 className="max-w-[880px] text-center text-[40px] font-semibold leading-none sm:text-[64px]">
        Discover, and save the products you love.
      </h1>
      <p className="text-muted-foreground max-w-[588px] text-center">
        Discover, save, and share the products you love, all in one place. Your 
        dream products are just a click away, organized and ready to be explored.
      </p>
      <Button className="rounded-full h-[48px] w-[240px] gap-2">
        Login to get started
      </Button>
    </section>
  );
}
