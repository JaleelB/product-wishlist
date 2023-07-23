
export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="w-screen h-screen flex justify-center items-center">{children}</main>
    )
}