import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Fetch the result from the API route
  const response = await fetch(`${url.origin}/api/auth/check-superadmin`, {
    headers: {
      Cookie: req.headers.get("cookie") || "",
    },
  });

  if (response.status !== 200) {
    url.pathname = "/access-denied";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};