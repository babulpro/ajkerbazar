import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    const signInUrl = new URL("/sign-in", request.url);

    // লগইনের পরে যে পেজে যেতে চেয়েছিল সেখানে ফিরিয়ে নিতে
    signInUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname + request.nextUrl.search
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/products/:path*",   // /products, /products/1, /products/sorno-machi-chal
    "/settings/:path*",   // /settings, /settings/profile
  ],
};