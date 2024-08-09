import categories from "@/db/codesnippets/categories.json";
import { NextResponse } from "next/server";

export async function GET(req) {
  const response = NextResponse.json(categories, { status: 200 });
  response.headers.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
  return response;
}
