import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/inloggen", "/registreer", "/api/auth",
  "/", "/yoga", "/zwangerschapsyoga", "/dragen",
  "/consult", "/babymassage", "/fit-in-balans", "/contact", "/zen-zwanger",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublic = PUBLIC_PATHS.some(p => pathname.startsWith(p));
  if (isPublic) return NextResponse.next();

  const userId = req.cookies.get("userId")?.value;
  if (!userId) {
    return NextResponse.redirect(new URL("/inloggen", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public|uploads).*)"],
};
