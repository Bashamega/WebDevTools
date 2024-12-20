// import { NextResponse } from "next/server";
// import languages from "@/db/codesnippets/categories.json";
// import { promises as fs } from "fs";
// import path from "path";

// interface Params {
//   language: string;
//   title: string;
// }

// interface Request {
//   params: Params;
// }

// export async function GET(request: Request, { params }: { params: Params }) {
//   const { language, title } = params; // Extract language from params
//   const encodedLanguage = encodeURIComponent(language.toLowerCase());

//   // Check if the language exists in the languages list
//   const languageExists = languages.languages.some((lang: { name: string }) => {
//     return encodeURIComponent(lang.name.toLowerCase()) === encodedLanguage;
//   });

//   // If the language does not exist, return a 404 response
//   if (!languageExists) {
//     const response = NextResponse.json(
//       { error: "Language not found" },
//       { status: 404 },
//     );
//     response.headers.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
//     return response;
//   } else {
//     try {
//       const filePath = path.join(
//         process.cwd(),
//         "/src/db/codesnippets/posts",
//         language.toLowerCase(),
//         `${title}.md`,
//       );
//       const content = await fs.readFile(filePath, "utf-8");

//       // If the language exists, return a success response
//       const response = NextResponse.json(
//         { category: language, content: content },
//         { status: 200 },
//       );
//       response.headers.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
//       return response;
//     } catch (error: any) {
//       console.error(`Error loading content for language: ${language}`, error);
//       const response = NextResponse.json(
//         { error: "Internal Server Error", message: error.message },
//         { status: 500 },
//       );
//       return response;
//     }
//   }
// }

import { NextResponse } from "next/server";
import languages from "@/db/codesnippets/categories.json";
import { promises as fs } from "fs";
import path from "path";

interface Params {
  language: string;
  title: string;
}

interface Request {
  params: Params;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { language, title } = params; // Extract language and title from params
  const encodedLanguage = encodeURIComponent(language.toLowerCase());

  // Check if the language exists in the languages list
  const languageExists = languages.languages.some((lang: { name: string }) => {
    return encodeURIComponent(lang.name.toLowerCase()) === encodedLanguage;
  });

  // If the language does not exist, return a 404 response
  if (!languageExists) {
    return NextResponse.json(
      { error: "Language not found" },
      {
        status: 404,
        headers: {
          "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        },
      },
    );
  }

  try {
    // Ensure the file path is correct and sanitized
    const filePath = path.join(
      process.cwd(),
      "src/db/codesnippets/posts",
      language.toLowerCase(),
      `${title}.md`,
    );

    // Check if the file exists and read its content
    const content = await fs.readFile(filePath, "utf-8");

    // If the language and title exist, return the content
    return NextResponse.json(
      { category: language, content: content },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        },
      },
    );
  } catch (error: any) {
    console.error(`Error loading content for language: ${language}`, error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      {
        status: 500,
        headers: {
          "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        },
      },
    );
  }
}
