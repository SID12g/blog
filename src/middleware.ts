import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/" || pathname === "/tech") {
    return NextResponse.redirect(new URL("/tech/all-posts", request.url));
  } else if (pathname === "/article") {
    return NextResponse.redirect(new URL("/article/all-posts", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/tech", "/article"],
};
