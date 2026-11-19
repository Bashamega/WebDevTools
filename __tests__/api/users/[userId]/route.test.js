/**
 * @jest-environment node
 */
import { GET } from "@/app/api/users/[userId]/route";
import users from "@/db/users.json";

// Next.js passes the dynamic route segments to the handler as a promise.
const getUser = (userId) =>
  GET(new Request(`http://localhost/api/users/${userId}`), {
    params: Promise.resolve({ userId }),
  });

describe("Single user API", () => {
  test("returns the user with the given id", async () => {
    const response = await getUser("1");

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(users[0]);
  });

  test("returns the last user in the data", async () => {
    const last = users[users.length - 1];
    const response = await getUser(String(last.userId));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(last);
  });

  test.each([
    ["an id that does not exist", "9999"],
    ["an id of zero", "0"],
    ["a negative id", "-1"],
    ["an id that is not a number", "abc"],
  ])("returns a 404 error for %s", async (_, userId) => {
    const response = await getUser(userId);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: "User not found" });
  });
});
