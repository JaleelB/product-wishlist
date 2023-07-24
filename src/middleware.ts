import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth:(auth, req) => {
    // redirect them to dashboard home page
    if(auth.userId &&  req.nextUrl.pathname === "/"){
      const home = new URL('/home', req.url)
      return NextResponse.redirect(home)
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};