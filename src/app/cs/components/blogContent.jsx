import { useEffect, useState } from "react";
import snarkdown from "snarkdown";

export function BlogContent({ doc, title, language, isDarkMode }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      try {
        const response = await fetch(`/api/cs/${language}/doc/${doc}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setContent(data.content);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch content:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [title, language]);

  return (
    <section className="w-full overflow-x-visible h-full mx-auto p-5">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <iframe
          srcDoc={`<!DOCTYPE html>
          <html>
            <head>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css">
              <style>
                body {
                  margin: 0;
                  padding: 16px;
                  --color-canvas-default: ${isDarkMode ? "rgb(17 24 39 / 1)" : "white"}!important;
                  --color-fg-default: ${isDarkMode ? "white" : "black"}!important;
                }
                  .markdown-body .highlight pre, .markdown-body pre{color:white!important;background-color:#161b22!important;}
              </style>
            </head>
            <body class="markdown-body">
              ${snarkdown(content)}
            </body>
          </html>`}
          width={"100%"}
          height={"100%"}
        ></iframe>
      )}
    </section>
  );
}
