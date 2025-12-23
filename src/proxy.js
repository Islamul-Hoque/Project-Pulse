// proxy.js
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function proxy(req) {
  const token = req.cookies.get("token")?.value;
  const user = verifyToken(token);

  if (!user) return NextResponse.redirect(new URL("/login", req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
