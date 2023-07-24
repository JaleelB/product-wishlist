import Image from "next/image";

export default function EmptyState(){
    return (
        <div className="flex flex-col justify-center">
            <Image
                src="/empty-state-illustration.jpg"
                alt="Illustration from Freepik. Free vector hand drawn kawaii coloring book illustration"
                width={300}
                height={300}
                className="mx-auto"
            />
            <p className="text-center font-semibold text-muted-foreground mt-8">Its empty in here!.</p>
        </div>
    )
}