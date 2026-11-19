/**
 * @jest-environment node
 */
import { GET } from "@/app/api/posts/route";
import posts from "@/db/posts.json";

const POSTS_PER_PAGE = 10;

// The route is a plain Web handler, so it is called directly with a Request.
const getPosts = (query = "") =>
  GET(new Request(`http://localhost/api/posts${query}`));

describe("Posts API pagination", () => {
  test("returns the first 10 posts when no page is given", async () => {
    const response = await getPosts();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(posts.slice(0, POSTS_PER_PAGE));
  });

  test("returns the posts of the requested page", async () => {
    const response = await getPosts("?page=2");

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(
      posts.slice(POSTS_PER_PAGE, 2 * POSTS_PER_PAGE),
    );
  });

  test("returns the posts left over on the last page", async () => {
    const lastPage = Math.ceil(posts.length / POSTS_PER_PAGE);
    const response = await getPosts(`?page=${lastPage}`);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(posts.slice((lastPage - 1) * POSTS_PER_PAGE));
    expect(body.length).toBeGreaterThan(0);
    expect(body.length).toBeLessThanOrEqual(POSTS_PER_PAGE);
  });

  test.each([
    ["is not a number", "?page=abc"],
    ["is zero", "?page=0"],
    ["is negative", "?page=-3"],
    ["is empty", "?page="],
  ])("falls back to the first page when the page %s", async (_, query) => {
    const response = await getPosts(query);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(posts.slice(0, POSTS_PER_PAGE));
  });

  test("returns a 404 error for a page past the end", async () => {
    const pastTheEnd = Math.ceil(posts.length / POSTS_PER_PAGE) + 1;
    const response = await getPosts(`?page=${pastTheEnd}`);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: "Page not found" });
  });
});

describe("Posts API response", () => {
  test("allows caching for one hour", async () => {
    const response = await getPosts();

    expect(response.headers.get("Cache-Control")).toBe("public, max-age=3600");
  });

  test("does not set a cache header on an error", async () => {
    const response = await getPosts("?page=1000");

    expect(response.headers.get("Cache-Control")).toBeNull();
  });
});
