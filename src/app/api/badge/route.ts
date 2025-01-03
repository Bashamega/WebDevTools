// import { makeBadge } from "badge-maker";

// interface BadgeData {
//   label: string;
//   message: string;
//   labelColor: string;
//   color: string;
//   logoBase64: string;
//   links: string[];
//   style: "flat" | "plastic" | "flat-square" | "for-the-badge" | "social" | undefined;
// }

// export async function GET(req: Request): Promise<Response> {
//   const { searchParams } = new URL(req.url);
//   const label = searchParams.get("label") || "";
//   const message = searchParams.get("message") || "";
//   const labelColor = searchParams.get("labelColor") || "";
//   const color = searchParams.get("color") || "";
//   const logoBase64 = searchParams.get("logoBase64") || "";
//   const links = searchParams.getAll("links") || [];
//   const style = (["flat", "plastic", "flat-square", "for-the-badge", "social"].includes(searchParams.get("style") || "") ? searchParams.get("style") : "flat") as "flat" | "plastic" | "flat-square" | "for-the-badge" | "social";
//   const badgeData: BadgeData = {
//     label,
//     message,
//     labelColor,
//     color,
//     logoBase64,
//     links,
//     style,
//   };

//   try {
//     if (!badgeData.label || !badgeData.message) {
//       throw new Error("Label and message are required");
//     }

//     const svg = makeBadge(badgeData);

//     return new Response(svg, {
//       headers: {
//         "Content-Type": "image/svg+xml",
//       },
//     });
//   } catch (error: any) {
//     console.error("Error generating badge:", error.message);
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// }

import { makeBadge } from "badge-maker";

interface BadgeData {
  label: string;
  message: string;
  labelColor: string;
  color: string;
  logoBase64?: string;
  links?: string[];
  style: "flat" | "plastic" | "flat-square" | "for-the-badge" | "social";
}

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);

  // Extracting query parameters
  const label = searchParams.get("label") || "";
  const message = searchParams.get("message") || "";
  const labelColor = searchParams.get("labelColor") || "#555"; // Default label color
  const color = searchParams.get("color") || "#4caf50"; // Default badge color
  const style = (searchParams.get("style") as BadgeData["style"]) || "flat";

  // Input validation for required fields
  if (!label || !message) {
    return new Response(
      JSON.stringify({ error: "Both 'label' and 'message' are required." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    // Generate badge using `badge-maker`
    const badgeOptions = {
      label,
      message,
      labelColor,
      color,
      style,
    };
    const svg = makeBadge(badgeOptions);

    // Return the badge SVG as the response
    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-store", // Prevent caching during development
      },
    });
  } catch (error: any) {
    console.error("Error generating badge:", error.message);

    return new Response(
      JSON.stringify({ error: "Failed to generate badge: " + error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
