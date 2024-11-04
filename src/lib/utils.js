import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 *
 * @param {string} url
 * @returns {boolean}
 */
export function isUrlValid(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch (_) {
    return false;
  }
}

/**
 *
 *
 * @returns {number} limit number of pages that will be visited
 */
export function getSitemapXmlGeneratorLimit() {
  const limit = parseInt(
    process.env.NEXT_PUBLIC_GENERATOR_SITEMAP_XML_LIMIT,
    10,
  );
  return Number.isInteger(limit) ? limit : 100;
}
