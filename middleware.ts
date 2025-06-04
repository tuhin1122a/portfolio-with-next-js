import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Fetch token once for the entire request
  let token;
  try {
    token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET, // Explicitly include the secret
    });

    console.log(`Middleware checking path: ${pathname}, Token exists: ${!!token}`);
    
    if (token) {
      console.log(`User: ${token.email}, isAdmin: ${!!token.isAdmin}`);
    }
    
  } catch (error) {
    console.error("Error fetching token in middleware:", error);
    // Redirect to login on error as a fallback
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  // Protect /admin route (requires authentication and admin privileges)
  // if (pathname.startsWith("/admin")) {
  //   if (!token || !token.isAdmin) {
  //     console.log("Access denied to admin route - redirecting to login");
  //     const url = new URL("/login", request.url);
  //     url.searchParams.set("callbackUrl", encodeURI(pathname));
  //     return NextResponse.redirect(url);
  //   }
  // }

  // Protect /profile route (requires authentication only)
  // if (pathname.startsWith("/profile")) {
  //   if (!token) {
  //     console.log("Access denied to profile route - redirecting to login");
  //     const url = new URL("/login", request.url);
  //     url.searchParams.set("callbackUrl", encodeURI(pathname));
  //     return NextResponse.redirect(url);
  //   }
  // }

  // Allow request to proceed if all checks pass
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};