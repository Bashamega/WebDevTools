// import { useEffect, useState } from "react";
// import snarkdown from "snarkdown";
// import React from "react";

// interface BlogContentProps {
//   doc: string;
//   title: string;
//   language: string;
//   isDarkMode: boolean;
// }

// const BlogContent: React.FC<BlogContentProps> = ({ doc, title, language, isDarkMode }) => {
//   const [content, setArticleContent] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchContent() {
//       setLoading(true);
//       try {
//         if (!doc) return;
//         const response = await fetch(`/api/cs/${language}/doc/${doc}`);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setArticleContent(data.content);
//       } catch (error) {
//         console.error("Failed to fetch content:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchContent();
//   }, [title, language, doc]);

//   return (
//     <section className="w-full overflow-x-visible h-full mx-auto p-5">
//       {loading ? (
//         <p className="text-center text-gray-500">Loading...</p>
//       ) : (
//         <iframe
//           srcDoc={`<!DOCTYPE html>
//           <html>
//             <head>
//               <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css">
//               <style>
//                 body {
//                   margin: 0;
//                   padding: 16px;
//                   --color-canvas-default: ${isDarkMode ? "rgb(17 24 39 / 1)" : "white"}!important;
//                   --color-fg-default: ${isDarkMode ? "white" : "black"}!important;
//                 }
//                   .markdown-body .highlight pre, .markdown-body pre{color:white!important;background-color:#161b22!important;}
//               </style>
//             </head>
//             <body class="markdown-body">
//               ${snarkdown(content)}
//             </body>
//           </html>`}
//           width={"100%"}
//           height={"100%"}
//         ></iframe>
//       )}
//     </section>
//   );
// }

// export default BlogContent;

import { useEffect, useState } from "react";
import React from "react";

interface BlogContentProps {
  doc: string;
  title: string;
  language: string;
  isDarkMode: boolean;
}

const BlogContent: React.FC<BlogContentProps> = ({
  doc,
  title,
  language,
  isDarkMode,
}) => {
  const [content, setArticleContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchContent() {
      if (!doc) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/cs/${language}/doc/${doc}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.statusText}`);
        }
        const data = await response.json();
        setArticleContent(data.content || "");
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [doc, language]);

  return (
    <section className="w-full h-full mx-auto p-5">
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
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                  background-color: ${isDarkMode ? "#111827" : "#ffffff"};
                  color: ${isDarkMode ? "#ffffff" : "#000000"};
                }
                .markdown-body pre {
                  color: white !important;
                  background-color: #161b22 !important;
                  padding: 8px;
                  border-radius: 6px;
                }
              </style>
            </head>
            <body class="markdown-body">
              ${content}
            </body>
          </html>`}
          title={title}
          className="w-full h-[80vh] border-none"
        ></iframe>
      )}
    </section>
  );
};

export default BlogContent;
