import { getSitemapXmlGeneratorLimit, isUrlValid } from "@/lib/utils";
import { NextRequest } from "next/server";

const SITEMAP_HEADER = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n`;
const SITEMAP_FOOTER = `</urlset>`;

const IGNORED_SUFFIX = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".svg",
  ".pdf",
  ".css",
  ".js",
  ".ico",
];
const IGNORED_PREFIX = ["#", "mailto:", "tel:"];

const encoder = new TextEncoder();

/**
 *
 * @param {NextRequest} req
 * @returns
 */
export async function GET(req) {
  const requestUrl = new URL(req.url);
  const _url = Object.fromEntries(requestUrl.searchParams).url;

  if (typeof _url !== "string") {
    return new Response("Missing URL", { status: 400 });
  }

  let url = decodeURIComponent(_url);

  if (!isUrlValid(url)) {
    return new Response("Invalid URL", { status: 400 });
  }

  if (!url.endsWith("/")) {
    url += "/";
  }

  const iterator = generateSitemapXML(url, getSitemapXmlGeneratorLimit());

  const stream = new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(encoder.encode(value));
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "no-store",
    },
  });
}

/**
 * Generates a sitemap in XML format starting from the given URL.
 *
 * @param {string} baseUrl - The base URL to start generating the sitemap.
 * @param {number} limit - The maximum number of pages to visit.
 * @returns {AsyncGenerator<string>} An asynchronous generator that yields XML sitemap strings.
 */
async function* generateSitemapXML(baseUrl, limit) {
  /**
   * @type {{url: string, depth: number}[]}
   */
  const queue = [{ url: baseUrl, depth: 0 }];
  const visited = new Set();
  const rejected = new Set();

  yield SITEMAP_HEADER;

  const defaultLastMod = formatDate(new Date());

  while (queue.length > 0) {
    const currentPage = queue.shift();

    if (
      currentPage &&
      !visited.has(currentPage.url) &&
      !rejected.has(currentPage.url)
    ) {
      devLogger(`Processing URL: ${currentPage.url}`);
      const url = currentPage.url;
      visited.add(url);

      let lastModified = defaultLastMod;

      try {
        const response = await fetch(url, { method: "HEAD" });

        if (!response.ok) {
          devLogger(
            `Failed to fetch metadata for URL: ${url}`,
            new Error(response.body),
          );
          rejected.add(url);
          visited.delete(url);
          continue;
        }

        if (!response.headers.get("content-type").includes("text/html")) {
          devLogger(`Ignoring non-HTML URL: ${url}`);
          rejected.add(url);
          visited.delete(url);
          continue;
        }

        const lastModifiedHeader = response.headers.get("last-modified");
        if (lastModifiedHeader) {
          lastModified = formatDate(new Date(lastModifiedHeader));
        }
      } catch (e) {
        devLogger(`Error on HEAD request: ${url}`, error);
      }

      const priority = 0.8 ** currentPage.depth;

      const xmlUrl = [
        "\t<url>",
        `\t\t<loc>${url}</loc>`,
        `\t\t<lastmod>${lastModified}</lastmod>`,
        `\t\t<priority>${priority.toFixed(2)}</priority>`,
        "\t</url>",
      ];
      yield `${xmlUrl.join("\n")}\n`;

      // Break early to avoid unnecessary processing
      if (visited.size >= limit) {
        break;
      }

      const links = await getLinks(currentPage.url, baseUrl);
      queue.push(
        ...links.map((url) => ({ url, depth: currentPage.depth + 1 })),
      );
    }
  }

  yield SITEMAP_FOOTER;
}

/**
 * Fetches the links from the given URL.
 *
 * @param {string} currentUrl - The URL to fetch links from.
 * @param {string} baseUrl - The base URL used for link parsing.
 * @returns {Promise<string[]>} A promise that resolves to an array of links found on the page.
 */
async function getLinks(currentUrl, baseUrl) {
  const links = [];
  try {
    const response = await fetch(currentUrl);

    if (!response.body) {
      devLogger(`Failed to process page: ${currentUrl}`, error);
      return links;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      // Read the stream in chunks
      const { done, value } = await reader.read();
      if (done) break;

      // Decode the stream chunk to text and append to the buffer
      buffer += decoder.decode(value, { stream: true });

      // Process the buffer incrementally
      const newLinks = processBuffer(baseUrl, buffer);
      links.push(...newLinks);

      const lastIndex = buffer.lastIndexOf("<a");
      if (lastIndex !== -1) {
        buffer = buffer.slice(lastIndex);
      }
    }

    const newLinks = processBuffer(baseUrl, buffer);
    links.push(...newLinks);
    buffer = "";
  } catch (error) {
    devLogger(`Failed to process page: ${currentUrl}`, error);
  }

  return links;
}

/**
 * Processes the buffer to extract links from anchor tags.
 *
 * @param {string} baseUrl - The base URL for link normalization.
 * @param {string} buffer - The buffer string to process for links.
 * @returns {string[]} An array of extracted links.
 */
function processBuffer(baseUrl, buffer) {
  const linkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/g;
  let match;

  const links = [];

  while ((match = linkRegex.exec(buffer)) !== null) {
    const url = parseLink(match[1], baseUrl);
    if (url) {
      links.push(url);
    }
  }

  return links;
}

/**
 * Parses the given link to normalize it against the base URL.
 *
 * @param {string} link - The link to parse.
 * @param {string} baseUrl - The base URL for reference.
 * @returns {string|null} The normalized URL or null if invalid.
 */
function parseLink(link, baseUrl) {
  if (
    IGNORED_SUFFIX.some((ext) => link.endsWith(ext)) ||
    IGNORED_PREFIX.some((prefix) => link.startsWith(prefix))
  ) {
    return null;
  }

  try {
    const baseUrlObj = new URL(baseUrl);

    const linkUrl = new URL(link, baseUrlObj.origin);
    return removeWWW(linkUrl.hostname) === removeWWW(baseUrlObj.hostname)
      ? new URL(linkUrl.pathname, baseUrl).href
      : null;
  } catch (e) {
    devLogger(`Error parsing link: ${link}`, e);
    return null;
  }
}

/**
 *
 * @param {String} hostname  e.g. `www.example.com`
 * @returns String e.g. `example.com`
 */
function removeWWW(hostname) {
  return hostname.replace(/^www\./, "");
}

/**
 *
 * @param {Date} date
 * @returns {string}
 */
function formatDate(date) {
  return date.toISOString().slice(0, -5) + "+00:00";
}

/**
 * Only log in development environment
 *
 * @param {String} message
 * @param {unknown | undefined} e error
 */
function devLogger(message, e = undefined) {
  if (process.env.NODE_ENV === "development") {
    e instanceof Error
      ? console.error(`❌ ${message}`, e)
      : console.log(`ℹ️ ${message}`);
  }
}
