// import { clsx } from "clsx";
// import { twMerge } from "tailwind-merge";
// import react from "react";

// export function cn(...inputs) {
//   return twMerge(clsx(inputs));
// }

// /**
//  *
//  * @param {string} url
//  * @returns {boolean}
//  */
// export function isUrlValid(url) {
//   try {
//     const urlObj = new URL(url);
//     return urlObj.protocol === "http:" || urlObj.protocol === "https:";
//   } catch (_) {
//     return false;
//   }
// }

// /**
//  *
//  *
//  * @returns {number} limit number of pages that will be visited
//  */
// export function getSitemapXmlGeneratorLimit() {
//   const limit = parseInt(
//     process.env.NEXT_PUBLIC_GENERATOR_SITEMAP_XML_LIMIT || '100',
//     10,
//   );
//   return Number.isInteger(limit) ? limit : 100;
// }

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

// Utility function to merge class names
export function cn(...inputs: (string | undefined | boolean)[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Checks if the given URL is valid.
 *
 * @param url - The URL to be validated.
 * @returns boolean - True if the URL is valid and uses HTTP or HTTPS protocol.
 */
export function isUrlValid(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch (_) {
    return false;
  }
}

/**
 * Returns the limit for the sitemap XML generator.
 *
 * @returns number - The limit of pages to be visited.
 */
export function getSitemapXmlGeneratorLimit(): number {
  const limit = parseInt(
    process.env.NEXT_PUBLIC_GENERATOR_SITEMAP_XML_LIMIT || "100",
    10,
  );
  return Number.isInteger(limit) ? limit : 100;
}
