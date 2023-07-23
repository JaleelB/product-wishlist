import { 
    SignInButton, 
    SignedIn, 
    SignedOut, 
    UserButton 
} from "@clerk/nextjs";


export default function UserAccountDropdown() {

  return (
    <div className="ml-2">
        <SignedIn>
            {/* Mount the UserButton component */}
            <UserButton afterSignOutUrl="/"/>
        </SignedIn>
        <SignedOut>
            {/* Signed out users get sign in button */}
            <SignInButton />
        </SignedOut>
    </div>
  );
}
