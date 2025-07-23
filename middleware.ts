import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/app/_lib/auth";

export default async function middleware(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account"],
};
