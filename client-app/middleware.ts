import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const token = request.cookies.get("auth_token");

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Aplica el middleware solo a las rutas del dashboard
export const config = {
  matcher: ["/dashboard/:path*"],
};
