/**
 * @jest-environment node
 */
import { GET } from "@/app/api/users/route";
import users from "@/db/users.json";

const USERS_PER_PAGE = 10;

// The route is a plain Web handler, so it is called directly with a Request.
const getUsers = (query = "") =>
  GET(new Request(`http://localhost/api/users${query}`));

describe("Users API pagination", () => {
  test("returns the first 10 users when no page is given", async () => {
    const response = await getUsers();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(users.slice(0, USERS_PER_PAGE));
  });

  test("returns the users of the requested page", async () => {
    const response = await getUsers("?page=2");

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(
      users.slice(USERS_PER_PAGE, 2 * USERS_PER_PAGE),
    );
  });

  test("returns the users left over on the last page", async () => {
    const lastPage = Math.ceil(users.length / USERS_PER_PAGE);
    const response = await getUsers(`?page=${lastPage}`);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(users.slice((lastPage - 1) * USERS_PER_PAGE));
    expect(body.length).toBeGreaterThan(0);
    expect(body.length).toBeLessThanOrEqual(USERS_PER_PAGE);
  });

  test.each([
    ["is not a number", "?page=abc"],
    ["is zero", "?page=0"],
    ["is negative", "?page=-3"],
    ["is empty", "?page="],
  ])("falls back to the first page when the page %s", async (_, query) => {
    const response = await getUsers(query);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(users.slice(0, USERS_PER_PAGE));
  });

  test("returns a 404 error for a page past the end", async () => {
    const pastTheEnd = Math.ceil(users.length / USERS_PER_PAGE) + 1;
    const response = await getUsers(`?page=${pastTheEnd}`);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: "Page not found" });
  });
});

describe("Users API data", () => {
  test("every user has the documented fields", async () => {
    const response = await getUsers();
    const [user] = await response.json();

    expect(Object.keys(user).sort()).toEqual(
      ["email", "followers", "following", "name", "userId"].sort(),
    );
  });
});
