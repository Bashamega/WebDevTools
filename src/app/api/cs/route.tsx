// import categories from "@/db/codesnippets/categories.json";
// import { NextResponse } from "next/server";

// interface Request {
//   method: string;
//   url: string;
//   headers: Headers;
// }

// export async function GET(req: Request): Promise<NextResponse> {
//   const response = NextResponse.json(categories, { status: 200 });
//   response.headers.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
//   return response;
// }

import categories from "@/db/codesnippets/categories.json";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const response = NextResponse.json(categories, { status: 200 });

  // Set Cache-Control header for 1 hour caching
  response.headers.set("Cache-Control", "public, max-age=3600");

  return response;
}
