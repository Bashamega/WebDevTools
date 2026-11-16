/**
 * @jest-environment node
 */
import { GET } from "@/app/api/badge/route";

// The route is a plain Web handler, so it is called directly with a Request.
const getBadge = (query) =>
  GET(new Request(`http://localhost/api/badge?${query}`));

let consoleError;

beforeEach(() => {
  consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Badge API success", () => {
  test("returns an SVG badge with the label and message", async () => {
    const response = await getBadge("label=build&message=passing");
    const svg = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("image/svg+xml");
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toContain('aria-label="build: passing"');
    expect(consoleError).not.toHaveBeenCalled();
  });

  test("uses the color from the query string", async () => {
    const response = await getBadge(
      `label=build&message=passing&color=${encodeURIComponent("#ff0000")}`,
    );

    expect(await response.text()).toContain('fill="#ff0000"');
  });

  test("uses the style from the query string", async () => {
    const response = await getBadge(
      "label=build&message=passing&style=for-the-badge",
    );
    const svg = await response.text();

    // for-the-badge is the 28px tall style with upper-cased text.
    expect(svg).toContain('height="28"');
    expect(svg).toContain('aria-label="BUILD: PASSING"');
  });

  test("wraps the badge in the link from the query string", async () => {
    const response = await getBadge(
      `label=build&message=passing&links=${encodeURIComponent("https://example.com")}`,
    );

    expect(await response.text()).toContain('href="https://example.com"');
  });
});

describe("Badge API missing input", () => {
  test.each([
    ["the message is missing", "label=build"],
    ["the label is missing", "message=passing"],
    ["both are missing", ""],
  ])("returns a JSON error when %s", async (_, query) => {
    const response = await getBadge(query);

    expect(response.status).toBe(500);
    expect(response.headers.get("Content-Type")).toBe("application/json");
    expect(await response.json()).toEqual({
      error: "Label and message are required",
    });
    expect(consoleError).toHaveBeenCalledWith(
      "Error generating badge:",
      "Label and message are required",
    );
  });
});
