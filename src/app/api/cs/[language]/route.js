import { NextResponse } from "next/server";
import languages from "@/db/codesnippets/categories.json";

export async function GET(request, { params }) {
  const { language } = params; // Extract category and language from params

  // Check if the language exists in the languages list
  const languageExists = languages.languages.some((lang) => {
    return lang.name.toLowerCase() === language.toLowerCase();
  });

  // If the language does not exist, return a 404 response
  if (!languageExists) {
    const response = NextResponse.json({ error: "Not found" }, { status: 404 });
    response.headers.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    return response;
  } else {
    // If the language exists, return a success response
    const response = NextResponse.json(
      { text: "hey", category: language },
      { status: 200 }
    );
    response.headers.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    return response;
  }
}