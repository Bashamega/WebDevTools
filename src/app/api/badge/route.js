import { makeBadge } from "badge-maker";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const label = searchParams.get("label") || "";
  const message = searchParams.get("message") || "";
  const labelColor = searchParams.get("labelColor") || "";
  const color = searchParams.get("color") || "";
  const logoBase64 = searchParams.get("logoBase64") || "";
  const links = searchParams.getAll("links") || [];
  const style = searchParams.get("style") || "flat";
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

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
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
