import { SignUp } from "@clerk/nextjs";

export default function SignUpPage(){
    return (
        <main className="w-screen h-screen flex justify-center items-center">
            <SignUp
                path="/sign-up"
                redirectUrl="/home"
                appearance={{
                    elements: {
                        card: "shadow-none",
                        formButtonPrimary:"bg-primary text-primary-foreground hover:bg-primary/90 text-sm normal-case",
                        footerActionLink: "text-primary underline-offset-4 hover:text-primary font-medium",
                        logoImage: "h-[37px] w-8",
                        formFieldInput:""
                    },
                }} 
            />
        </main>
    )
} ;