import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getOrCreateDatabase from "@/dbconfig/server/dbSetup";
import getOrCreateStorage from "@/models/storage.setup";

export async function middleware(request: NextRequest) {
  await getOrCreateDatabase();
  await getOrCreateStorage();
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
