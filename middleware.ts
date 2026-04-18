import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const { pathname } = req.nextUrl

  // Protected routes
  const protectedRoutes = ["/dashboard", "/tasks"]
  const authRoutes = ["/login", "/register"]

  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Agar token nahi aur protected route pe ja raha hai
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Agar token hai aur login/register pe ja raha hai
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/tasks/:path*", "/login", "/register"]
}