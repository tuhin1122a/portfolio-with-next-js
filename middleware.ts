// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let token;
  try {
    token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    console.log(`Middleware checking path: ${pathname}, Token exists: ${!!token}`);

    if (token) {
      console.log(`User: ${token.email}, isAdmin: ${!!token.isAdmin}`);
    }

  } catch (error) {
    console.error("Error fetching token in middleware:", error);
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  // Protect /dashboard route (requires authentication)
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      console.log("Access denied to dashboard route - redirecting to login");
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(pathname));
      return NextResponse.redirect(url);
    }
  }

  // Allow request to proceed if all checks pass
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/dashboard/:path*"],
};
