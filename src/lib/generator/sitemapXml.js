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

/**
 * Generates a sitemap in XML format starting from the given URL.
 *  - Should be called only on the server side, bc in the browser fetch will
 *    most likely fail with CORS error (depends on the website)
 *
 * @param {string} baseUrl - The base URL to start generating the sitemap.
 * @param {number} limit - The maximum number of pages to visit.
 * @returns {AsyncGenerator<string>} An asynchronous generator that yields XML sitemap strings.
 */
export async function* generateSitemapXML(baseUrl, limit) {
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
            new Error(`Not ok response: ${response.status}`),
          );
          rejected.add(url);
          visited.delete(url);
          continue;
        }

        if (!response.headers.get("content-type")?.includes("text/html")) {
          devLogger(`Ignoring non-HTML URL: ${url}`);
          rejected.add(url);
          visited.delete(url);
          continue;
        }

        const lastModifiedHeader = response.headers.get("last-modified");
        if (lastModifiedHeader) {
          try {
            lastModified = formatDate(new Date(lastModifiedHeader));
          } catch (e) {
            devLogger("Error parsing last-modified header", e);
          }
        }
      } catch (e) {
        devLogger(`Error on HEAD request: ${url}`, e);
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
 * Parse the links from the given page.(currentURL)
 *
 * @param {string} currentUrl - The URL to fetch links from.
 * @param {string} baseUrl - The base URL used for link parsing.
 * @returns {Promise<string[]>} A promise that resolves to an array of links found on the page.
 */
async function getLinks(currentUrl, baseUrl) {
  const links = [];
  try {
    const response = await fetch(currentUrl);

    if (!response.ok) {
      logger(
        `Failed to process page: ${currentUrl}`,
        new Error(`Not ok response: ${response.status}`),
      );
      return links;
    }

    if (!response.body) {
      logger(`Failed to process page: ${currentUrl}`, new Error("No body"));
      return links;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    // Read response as stream, to avoid storing whole page in the memory
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      // 1. Decode the value and append to buffer
      buffer += decoder.decode(value, { stream: true });

      // 2. Process buffer to extract links
      const newLinks = processBuffer(baseUrl, buffer);
      links.push(...newLinks);

      // 3. Update buffer
      const lastIndex = buffer.lastIndexOf("<a");
      if (lastIndex !== -1) {
        // only from the last <a tag, in case <a and href=".." are split
        buffer = buffer.slice(lastIndex);
      } else {
        // last few characters, in case `<a` is split in half
        buffer = buffer.slice(-3);
      }
    }
  } catch (e) {
    logger(`Failed to process page: ${currentUrl}`, e);
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
  const linkRegex = /<a\s+(?:[^>]*?\s+)?href=(["']?)([^"'\s>]+)\1/g;

  const links = [];

  let match;
  while ((match = linkRegex.exec(buffer)) !== null) {
    const url = parseLink(match[2], baseUrl);
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
    logger(message, e);
  }
}

/**
 * @param {String} message
 * @param {unknown | undefined} e error
 */
function logger(message, e = undefined) {
  e instanceof Error
    ? console.error(`[/api/generator/sitemap-xml] ❌ ${message}`, e)
    : console.log(`[/api/generator/sitemap-xml] ℹ️ ${message}`);
}
