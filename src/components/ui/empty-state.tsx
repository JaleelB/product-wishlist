import Image from "next/image";
import { Button } from "./button";
import React from "react";

export default function EmptyState({
    message,
    actionComponent
}: {
    message: string,
    actionComponent: React.ReactNode
}){
    return (
        <div className="flex flex-col justify-center">
            <h4 className="text-center text-lg font-semibold mb-8 text-zinc-700">{message}</h4>
            <Image
                src="/empty-state-illustration.jpg"
                alt="Illustration from Freepik. Free vector hand drawn kawaii coloring book illustration"
                width={350}
                height={350}
                className="mx-auto object-cover min-w-[250px] min-h-[250px] mb-8"
            />
            <div className="mx-auto">{actionComponent}</div>
        </div>
    )
}