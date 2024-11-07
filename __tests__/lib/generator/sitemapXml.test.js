import { generateSitemapXML } from "@/lib/generator/sitemapXml";

let fetchCount = 0;

global.fetch = jest.fn(() => {
  return Promise.resolve({
    ok: true,
    headers: {
      get: (header) => {
        if (header === "content-type") {
          return "text/html";
        }
        if (header === "last-modified") {
          return "Mon, 01 Jan 2024 00:00:00 GMT";
        }
        return undefined;
      },
    },
    body: {
      getReader: () => {
        return {
          read: () => {
            if (fetchCount === 0) {
              fetchCount++;
              return Promise.resolve({
                done: false,
                value: new TextEncoder().encode(
                  '<html><a href="/page1">Page 1</a><p>some other elements><a href="/page2">Page 2</a></html>',
                ),
              });
            }
            return Promise.resolve({
              done: true,
            });
          },
        };
      },
    },
  });
});

describe("generateSitemapXML", () => {
  beforeAll(async () => {
    global.TextEncoder = require("util").TextEncoder;
    global.TextDecoder = require("util").TextDecoder;
  });
  beforeEach(() => {
    fetchCount = 0;
  });

  test("generates sitemap XML with multiple links", async () => {
    const baseUrl = "https://wdt.adambashaahmednaji.com/";
    const limit = 100;

    const sitemapParts = [];
    for await (const part of generateSitemapXML(baseUrl, limit)) {
      sitemapParts.push(part);
    }

    const sitemapXML = sitemapParts.join("");
    expect(sitemapXML).toContain("<urlset");
    expect(sitemapXML).toContain(
      [
        "\t\t<loc>https://wdt.adambashaahmednaji.com/</loc>",
        "\t\t<lastmod>2024-01-01T00:00:00+00:00</lastmod>",
        "\t\t<priority>1.00</priority>",
      ].join("\n"),
    );
    expect(sitemapXML).toContain(
      [
        "\t\t<loc>https://wdt.adambashaahmednaji.com/page1</loc>",
        "\t\t<lastmod>2024-01-01T00:00:00+00:00</lastmod>",
        "\t\t<priority>0.80</priority>",
      ].join("\n"),
    );
    expect(sitemapXML).toContain(
      [
        "\t\t<loc>https://wdt.adambashaahmednaji.com/page2</loc>",
        "\t\t<lastmod>2024-01-01T00:00:00+00:00</lastmod>",
        "\t\t<priority>0.80</priority>",
      ].join("\n"),
    );
    expect(sitemapXML).toContain("</urlset>");
  });

  test("stops generating sitemap XML when limit is reached", async () => {
    const baseUrl = "https://wdt.adambashaahmednaji.com/";
    const limit = 1;

    const sitemapParts = [];
    for await (const part of generateSitemapXML(baseUrl, limit)) {
      sitemapParts.push(part);
    }

    const sitemapXML = sitemapParts.join("");
    expect(sitemapXML).toContain("<urlset");
    expect(sitemapXML).toContain(
      "<loc>https://wdt.adambashaahmednaji.com/</loc>",
    );
    expect(sitemapXML).not.toContain(
      "<loc>https://wdt.adambashaahmednaji.com/page1</loc>",
    );
    expect(sitemapXML).not.toContain(
      "<loc>https://wdt.adambashaahmednaji.com/page2</loc>",
    );
    expect(sitemapXML).toContain("</urlset>");
  });
});
