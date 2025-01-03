import { NextResponse, NextRequest } from "next/server";
import languages from "@/db/codesnippets/categories.json";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  _request: NextRequest,
  context: { params: { language: string; title: string } }, // Use the correct type
) {
  const { language, title } = context.params; // Extract parameters from context
  const encodedLanguage = encodeURIComponent(language.toLowerCase());

  // Check if the language exists
  const languageExists = languages.languages.some((lang: { name: string }) => {
    return encodeURIComponent(lang.name.toLowerCase()) === encodedLanguage;
  });

  if (!languageExists) {
    return NextResponse.json(
      { error: "Language not found" },
      { status: 404, headers: { "Cache-Control": "public, max-age=3600" } },
    );
  }

  try {
    const filePath = path.join(
      process.cwd(),
      "/src/db/codesnippets/posts",
      language.toLowerCase(),
      `${title}.md`,
    );
    const content = await fs.readFile(filePath, "utf-8");

    return NextResponse.json(
      { category: language, content },
      { status: 200, headers: { "Cache-Control": "public, max-age=3600" } },
    );
  } catch (error: any) {
    console.error(`Error loading content for language: ${language}`, error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 },
    );
  }
}
