import posts from "@/db/posts.json";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  let page = parseInt(searchParams.get("page"));
  if (isNaN(page) || page < 1) {
    page = 1;
  }
  const postsPerPage = 10;
  const startIndex = (page - 1) * postsPerPage;

  if (startIndex < 0 || startIndex >= posts.length) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  const paginatedPosts = posts.slice(startIndex, startIndex + postsPerPage);
  
  const response = NextResponse.json(paginatedPosts, { status: 200 });
  response.headers.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
  return response;
}
