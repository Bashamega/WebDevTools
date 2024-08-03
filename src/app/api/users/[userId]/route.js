import usersData from "@/db/users.json";
import { NextResponse } from "next/server";

let cachedUsers = null;

export async function GET(req, { params }) {
  // Initialize cache if it doesn't exist
  if (!cachedUsers) {
    cachedUsers = usersData.reduce((acc, user) => {
      acc[user.userId] = user;
      return acc;
    }, {});
  }

  const userId = parseInt(params.userId);

  // Find user in the cached data
  const user = cachedUsers[userId];

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}
