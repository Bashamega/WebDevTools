import { generateSitemapXML } from "@/lib/generator/sitemapXml";
import { getSitemapXmlGeneratorLimit, isUrlValid } from "@/lib/utils";
import { NextRequest } from "next/server";

export const runtime = "edge";

/**
 *
 * @param {NextRequest} req
 * @returns
 */
interface RequestParams {
  url: string;
}

export async function GET(req: NextRequest): Promise<Response> {
  const requestUrl = new URL(req.url);
  const _url = (
    Object.fromEntries(requestUrl.searchParams) as unknown as RequestParams
  ).url;

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

  const iterator: AsyncGenerator<string> = generateSitemapXML(
    url,
    getSitemapXmlGeneratorLimit(),
  );

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async pull(controller: ReadableStreamDefaultController<Uint8Array>) {
      try {
        const { value, done } = await iterator.next();
        if (done) {
          controller.close();
        } else {
          controller.enqueue(encoder.encode(value));
        }
      } catch (e) {
        controller.error(
          new Error("Failed to generate sitemap: " + (e as Error).message),
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
