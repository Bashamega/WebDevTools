import { generateSitemapXML } from "@/lib/generator/sitemapXml";
import { getSitemapXmlGeneratorLimit, isUrlValid } from "@/lib/utils";
import { NextRequest } from "next/server";

export const runtime = "edge";

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

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async pull(controller) {
      try {
        const { value, done } = await iterator.next();
        if (done) {
          controller.close();
        } else {
          controller.enqueue(encoder.encode(value));
        }
      } catch (e) {
        controller.error(
          new Error("Failed to generate sitemap: " + error.message),
        );
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
