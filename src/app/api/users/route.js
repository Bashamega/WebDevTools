import usersData from "@/db/users.json";
import { NextResponse } from "next/server";

let cachedUsers = null;

export async function GET(req) {
  // Initialize cache if it doesn't exist
  if (!cachedUsers) {
    cachedUsers = usersData;
  }

  const { searchParams } = new URL(req.url);
  let page = parseInt(searchParams.get("page"));
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  const usersPerPage = 10;
  const startIndex = (page - 1) * usersPerPage;

  // Check for invalid start index
  if (startIndex < 0 || startIndex >= cachedUsers.length) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  // Get paginated users from cache
  const paginatedUsers = cachedUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );
  return NextResponse.json(paginatedUsers, { status: 200 });
}
