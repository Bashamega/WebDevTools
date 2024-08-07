import { makeBadge } from "badge-maker";
import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";

// Retrieve base URL from environment variable or default to localhost
const BASE_URL = process.env.BASE_URL || "https://wdt.adambashaahmednaji.com";

export async function GET(req) {
  console.log("Request received");
  const { searchParams } = new URL(req.url);
  const label = searchParams.get("label") || "";
  const message = searchParams.get("message") || "";
  const labelColor = searchParams.get("labelColor") || "";
  const color = searchParams.get("color") || "";
  const logoBase64 = searchParams.get("logoBase64") || "";
  const links = searchParams.getAll("links") || [];
  const style = searchParams.get("style") || "flat";

  // Check if the Base64 data is valid

  const badgeData = {
    label,
    message,
    labelColor,
    color,
    logoBase64,
    links,
    style,
  };

  try {
    if (!badgeData.label || !badgeData.message) {
      throw new Error("Label and message are required");
    }

    const svg = makeBadge(badgeData);
    console.log("Generated SVG:", svg);

    const uniqueFileName = `badge_${Date.now()}_${randomBytes(4).toString(
      "hex",
    )}.svg`;
    console.log("Unique file name:", uniqueFileName);

    const publicDir = path.join(process.cwd(), "public");
    await fs.mkdir(publicDir, { recursive: true });

    const filePath = path.join(publicDir, uniqueFileName);
    await fs.writeFile(filePath, svg);

    console.log("Badge file saved at:", filePath);

    const badgeUrl = `${BASE_URL}/${uniqueFileName}`;
    console.log("Badge URL:", badgeUrl);

    return new Response(JSON.stringify({ badgeUrl }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error generating badge:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
