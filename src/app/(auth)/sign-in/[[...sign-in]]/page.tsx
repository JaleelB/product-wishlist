import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
        path="/sign-in"
        appearance={{
            elements: {
                card: "shadow-none",
                formButtonPrimary:"bg-primary text-primary-foreground hover:bg-primary/90 text-sm normal-case",
                footerActionLink: "text-primary underline-offset-4 hover:text-primary font-medium"
            },
        }} 
    />
  );
}