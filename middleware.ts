// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/middleware"; // We'll create this

export async function middleware(request: NextRequest) {
  try {
    // This `createClient` function is slightly different for middleware
    // as it needs to set cookies on the response for the session to persist
    const supabase = createClient(request);

    // Refresh auth session
    // This will attempt to refresh the user's session if it's expired
    // and update cookies. It's safe for middleware.
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Define public paths that anyone can access (including the landing page)
    const publicPaths = [
      "/",
      "/login",
      "/signup",
      "/error",
      "/about",
      "/matcha",
    ];
    const { pathname } = request.nextUrl;
    const isPublicPath =
      publicPaths.includes(request.nextUrl.pathname) ||
      pathname.startsWith("/matcha/");

    // If the user is NOT logged in AND is trying to access a non-public path, redirect to login
    if (!user && !isPublicPath) {
      const loginUrl = new URL("/login", request.url);
      // loginUrl.searchParams.set('next', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If the user IS logged in AND is trying to access a login/signup page, redirect to dashboard/home
    if (
      user &&
      (request.nextUrl.pathname === "/login" ||
        request.nextUrl.pathname === "/signup")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url)); // Or '/'
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware auth error:", error);
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

// Specify which paths the middleware should run on.
// This example excludes static files and API routes that don't need auth checks.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /api/ (Supabase auth webhooks or public APIs can be excluded here if needed)
     * - Any other static asset types you have (e.g., .svg, .png)
     */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
