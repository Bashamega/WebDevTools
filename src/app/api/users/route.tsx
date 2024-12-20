import usersData from "@/db/users.json";
import { NextResponse } from "next/server";

interface User {
  id: number;
  name: string;
  email: string;
  // Add other user properties as needed
}

let cachedUsers: User[] | null = null;

interface GetRequest {
  url: string;
}

interface PaginatedResponse {
  error?: string;
  users?: User[];
}

export async function GET(
  req: GetRequest,
): Promise<NextResponse<PaginatedResponse>> {
  // Initialize cache if it doesn't exist
  if (!cachedUsers) {
    cachedUsers = usersData.map((user) => ({
      id: user.userId,
      name: user.name,
      email: user.email,
      // Map other properties as needed
    }));
  }

  const { searchParams } = new URL(req.url);
  let page = parseInt(searchParams.get("page") || "1");
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  const usersPerPage = 10;
  const startIndex = (page - 1) * usersPerPage;

  // Check for invalid start index
  if (!cachedUsers || startIndex < 0 || startIndex >= cachedUsers.length) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  // Get paginated users from cache
  const paginatedUsers = cachedUsers.slice(
    startIndex,
    startIndex + usersPerPage,
  );
  return NextResponse.json({ users: paginatedUsers }, { status: 200 });
}
