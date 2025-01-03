// import { NextResponse } from "next/server";
// import languages from "@/db/codesnippets/categories.json";
// import { promises as fs } from "fs";
// import path from "path";

// interface RequestParams {
//   params: {
//     language: string;
//   };
// }

// interface Language {
//   name: string;
// }

// interface Languages {
//   languages: Language[];
// }

// interface ParsedContent {
//   [key: string]: any;
// }

// export async function GET(
//   request: Request,
//   { params }: RequestParams
// ): Promise<Response> {
//   const { language } = params; // Extract language from params
//   const encodedLanguage = encodeURIComponent(language.toLowerCase());

//   // Check if the language exists in the languages list
//   const languageExists = (languages as Languages).languages.some((lang) => {
//     return encodeURIComponent(lang.name.toLowerCase()) === encodedLanguage;
//   });

//   // If the language does not exist, return a 404 response
//   if (!languageExists) {
//     const response = NextResponse.json({ error: "Not found" }, { status: 404 });
//     response.headers.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
//     return response;
//   } else {
//     try {
//       const filePath = path.join(
//         process.cwd(),
//         "/src/db/codesnippets/posts",
//         language,
//         "content.json"
//       );
//       const content = await fs.readFile(filePath, "utf-8");
//       const parsedContent: ParsedContent = JSON.parse(content);

//       // If the language exists, return a success response
//       const response = NextResponse.json(
//         { category: language, content: parsedContent },
//         { status: 200 }
//       );
//       response.headers.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
//       return response;
//     } catch (error: any) {
//       console.error(`Error loading content for language: ${language}`, error);
//       const response = NextResponse.json(
//         { error: "Internal Server Error", message: error.message },
//         { status: 500 }
//       );
//       return response;
//     }
//   }
// }

import { NextResponse } from "next/server";
import languages from "@/db/codesnippets/categories.json";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  request: Request,
  context: { params: Record<string, string> }, // Use the correct type for context
): Promise<Response> {
  const { language } = context.params; // Extract language from params
  const encodedLanguage = encodeURIComponent(language.toLowerCase());

  // Check if the language exists in the languages list
  const languageExists = languages.languages.some((lang) => {
    return encodeURIComponent(lang.name.toLowerCase()) === encodedLanguage;
  });

  if (!languageExists) {
    return NextResponse.json(
      { error: "Not found" },
      {
        status: 404,
        headers: {
          "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        },
      },
    );
  }

  try {
    // Construct file path for the requested language
    const filePath = path.join(
      process.cwd(),
      "src/db/codesnippets/posts",
      language,
      "content.json",
    );

    // Read and parse the content file
    const fileContent = await fs.readFile(filePath, "utf-8");
    const parsedContent = JSON.parse(fileContent);

    return NextResponse.json(
      { category: language, content: parsedContent },
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
      { status: 500 },
    );
  }
}
