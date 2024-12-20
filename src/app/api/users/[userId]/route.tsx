import usersData from "@/db/users.json";
import { NextResponse } from "next/server";

interface User {
  userId: number;
  name: string;
  email: string;
  // Add other user properties here
}

interface Params {
  userId: string;
}

let cachedUsers: { [key: number]: User } | null = null;

interface GetParams {
  params: Params;
}

export async function GET(
  req: Request,
  { params }: GetParams,
): Promise<NextResponse> {
  // Initialize cache if it doesn't exist
  if (!cachedUsers) {
    cachedUsers = usersData.reduce(
      (acc: { [key: number]: User }, user: User) => {
        acc[user.userId] = user;
        return acc;
      },
      {},
    );
  }

  const userId = parseInt(params.userId);

  // Find user in the cached data
  const user = cachedUsers[userId];

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}
