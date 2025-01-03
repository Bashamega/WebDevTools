import rawPosts from "@/db/posts.json";
import { NextResponse } from "next/server";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date?: string;
}

// Make sure rawPosts is of the correct type that includes the 'date' property
interface RawPost {
  title: string;
  content: string;
  author: string | number;
  date?: string; // Make sure `date` is optional or provided
}

const localRawPosts: RawPost[] = [
  // Example data, add your posts here
  {
    title: "Title 1",
    content: "Content 1",
    author: "Author 1",
    date: "2023-12-18",
  },
  { title: "Title 2", content: "Content 2", author: "Author 2" }, // No date here
];

interface PaginatedResponse {
  error?: string;
  posts?: Post[];
}

const posts: Post[] = localRawPosts.map((post, index) => ({
  id: index + 1,
  title: post.title,
  content: post.content,
  author: post.author.toString(),
  date: post.date || new Date().toISOString(), // Default to current date if missing
}));

// const posts: Post[] = rawPosts.map((post, index) => ({
//   id: index + 1,
//   title: post.title,
//   content: post.content,
//   author: post.author.toString(),
//   date: post.date || new Date().toISOString(),
// }));

export async function GET(
  req: Request,
): Promise<NextResponse<PaginatedResponse>> {
  const { searchParams } = new URL(req.url);
  let page = parseInt(searchParams.get("page") || "1");
  if (isNaN(page) || page < 1) {
    page = 1;
  }
  const postsPerPage = 10;
  const startIndex = (page - 1) * postsPerPage;

  if (startIndex < 0 || startIndex >= posts.length) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  const paginatedPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const response = NextResponse.json(
    { posts: paginatedPosts },
    { status: 200 },
  );
  response.headers.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
  return response;
}
