import users from "@/db/users.json";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const userId = parseInt(params.userId);
  const user = users.find((user) => user.userId === userId);
  if (!user) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }
  return NextResponse.json(user, { status: 200 });
}
