// "use client";
// import { useState, useEffect } from "react";
// import NavBar from "@/components/navbar";
// import languages from "@/db/codesnippets/categories.json";
// import NotFound from "@/app/not-found";
// import { Sidebar } from "../../components/sidebar";
// import BlogContent from "../../components/blogContent";

// interface CodingSnippetsProps {
//   params: { language: string; article: string };

// }

// interface TitleFunction {
//   (text: string): string;
// }

// interface ArticleData {
//   title: string;
//   doc: string;
//   author: string;
// }

// const CodingSnippets: React.FC<CodingSnippetsProps> = ({ params }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [articleExists, setArticleExists] = useState(true);

//   const [data, setData] = useState<ArticleData | undefined>(undefined);
//   // Toggle theme and save preference in localStorage
//   const toggleTheme = () => {
//     const newTheme = !isDarkMode;
//     setIsDarkMode(newTheme);
//     localStorage.setItem("theme", JSON.stringify(newTheme));
//   };

//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme") as string) : null;
//     if (storedTheme !== null) {
//       setIsDarkMode(storedTheme);
//     }
//   }, []);

//   const title: TitleFunction = (text) => {
//     return decodeURIComponent(text)
//       .toLowerCase()
//       .replace(/\b\w/g, (char) => char.toUpperCase());
//   };

//   useEffect(() => {
//     const languageExists = languages.languages.some((language) => {
//       return language.name.toLowerCase() === params.language.toLowerCase();
//     });
//     if (languageExists) {
//       const data = require(
//         `@/db/codesnippets/posts/${params.language.toLowerCase()}/content.json`,
//       );
//       const article: boolean = data.some((article: { title: string }) => {
//         return title(article.title) === title(params.article);
//       });
//       setArticleExists(article);
//       data.map((art: { title: string; doc: string; author: string }) => {
//         if (title(art.title) === title(params.article)) {
//           setData(art);
//         }
//       });
//     } else {
//       setArticleExists(false);
//     }
//   }, [ params.language, params.article]);
//   return (
//     <>
//       {articleExists ? (
//         <main
//           className={`h-screen overflow-auto ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
//         >
//           <NavBar
//             title={`Coding Snippets / ${title(params.language)} / ${title(params.article)}`}
//             isDarkMode={isDarkMode}
//             toggleTheme={toggleTheme}
//           />
//           <section className="h-[calc(100vh-70px)] w-full lg:grid lg:grid-cols-[2fr_1fr]  lg:gap-6">
//             <BlogContent
//               title={title(data?.title || "")}
//               doc={data?.doc || ""}
//               language={params.language}
//               isDarkMode={isDarkMode}
//             />
//             <Sidebar darkmode={isDarkMode} author={data ? { name: data.author, about: "Author description", githubLink: "https://github.com/author" } : { name: "", about: "" }} />
//           </section>
//         </main>
//       ) : (
//         <NotFound />
//       )}
//     </>
//   );
// }

// export default CodingSnippets;

// "use client";
// import { useState, useEffect } from "react";
// import NavBar from "@/components/navbar";
// import languages from "@/db/codesnippets/categories.json";
// import NotFound from "@/app/not-found";
// import { Sidebar } from "../../components/sidebar";
// import BlogContent from "../../components/blogContent";

// interface CodingSnippetsProps {
//   params: { language: string; article: string; title: string };
// }

// interface TitleFunction {
//   (text: string): string;
// }

// interface ArticleData {
//   title: string;
//   doc: string;
//   author: string;
// }

// const CodingSnippets: React.FC<CodingSnippetsProps> = ({ params }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [articleExists, setArticleExists] = useState(true);
//   const [data, setData] = useState<ArticleData | undefined>(undefined);

//   // Toggle theme and save preference in localStorage
//   const toggleTheme = () => {
//     const newTheme = !isDarkMode;
//     setIsDarkMode(newTheme);
//     localStorage.setItem("theme", JSON.stringify(newTheme));
//   };

//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme")
//       ? JSON.parse(localStorage.getItem("theme") as string)
//       : null;
//     if (storedTheme !== null) {
//       setIsDarkMode(storedTheme);
//     }
//   }, []);

//   const title: TitleFunction = (text) =>
//     decodeURIComponent(text)
//       .toLowerCase()
//       .replace(/\b\w/g, (char) => char.toUpperCase());

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const languageExists = languages?.languages?.some((language) => {
//           return language.name.toLowerCase() === params.language.toLowerCase();
//         });

//         if (languageExists) {
//           const data = await import(
//             `@/db/codesnippets/posts/${params.language.toLowerCase()}/content.json`
//           );

//           if (!data || !Array.isArray(data)) {
//             setArticleExists(false);
//             return;
//           }

//           const formattedArticleTitle = title(params.article);

//           const matchedArticle = data.find(
//             (art: { title: string }) =>
//               title(art.title) === formattedArticleTitle,
//           );

//           setArticleExists(!!matchedArticle);
//           setData(matchedArticle || undefined);
//         } else {
//           setArticleExists(false);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setArticleExists(false);
//       }
//     };

//     fetchData();
//   }, [params.language, params.article]);

//   return (
//     <>
//       {articleExists ? (
//         <main
//           className={`h-screen overflow-auto ${
//             isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
//           }`}
//         >
//           <NavBar
//             title={`Coding Snippets / ${title(params.language)} / ${title(params.article)}`}
//             isDarkMode={isDarkMode}
//             toggleTheme={toggleTheme}
//           />
//           <section className="h-[calc(100vh-70px)] w-full lg:grid lg:grid-cols-[2fr_1fr] lg:gap-6">
//             <BlogContent
//               title={title(data?.title || "")}
//               doc={data?.doc || ""}
//               language={params.language}
//               isDarkMode={isDarkMode}
//             />
//             <Sidebar
//               darkmode={isDarkMode}
//               author={
//                 data
//                   ? {
//                       name: data.author,
//                       about: "Author description",
//                       githubLink: "https://github.com/author",
//                     }
//                   : { name: "", about: "" }
//               }
//             />
//           </section>
//         </main>
//       ) : (
//         <NotFound />
//       )}
//     </>
//   );
// };

// export default CodingSnippets;

"use client";
import { useState, useEffect } from "react";
import NavBar from "@/components/navbar";
import languages from "@/db/codesnippets/categories.json";
import NotFound from "@/app/not-found";
import { Sidebar } from "../../components/sidebar";
import BlogContent from "../../components/blogContent";

interface CodingSnippetsProps {
  params: { language: string; article: string; title: string };
}

interface TitleFunction {
  (text: string): string;
}

interface ArticleData {
  title: string;
  doc: string;
  author: string;
}

const CodingSnippets: React.FC<CodingSnippetsProps> = ({ params }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [articleExists, setArticleExists] = useState(true);
  const [data, setData] = useState<ArticleData | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Toggle theme and save preference in localStorage
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme") as string)
      : null;
    if (storedTheme !== null) {
      setIsDarkMode(storedTheme);
    }
  }, []);

  const title: TitleFunction = (text) => {
    try {
      return decodeURIComponent(text)
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
    } catch (error) {
      console.error("Error decoding title:", error);
      return text;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const languageExists = languages?.languages?.some((language) => {
          return language.name.toLowerCase() === params.language.toLowerCase();
        });

        if (languageExists) {
          const data = await import(
            `@/db/codesnippets/posts/${params.language.toLowerCase()}/content.json`
          );

          if (!data || !Array.isArray(data)) {
            setArticleExists(false);
            return;
          }

          const formattedArticleTitle = title(params.article);

          const matchedArticle = data.find(
            (art: { title: string }) =>
              title(art.title) === formattedArticleTitle,
          );

          setArticleExists(!!matchedArticle);
          setData(matchedArticle || undefined);
        } else {
          setArticleExists(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("An error occurred while fetching the article.");
        setArticleExists(false);
      }
    };

    fetchData();
  }, [params.language, params.article]);

  return (
    <>
      {errorMessage && <div>{errorMessage}</div>}
      {articleExists ? (
        <main
          className={`h-screen overflow-auto ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          <NavBar
            title={`Coding Snippets / ${title(params.language)} / ${title(params.article)}`}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
          <section className="h-[calc(100vh-70px)] w-full lg:grid lg:grid-cols-[2fr_1fr] lg:gap-6">
            <BlogContent
              title={title(data?.title || "")}
              doc={data?.doc || ""}
              language={params.language}
              isDarkMode={isDarkMode}
            />
            <Sidebar
              darkmode={isDarkMode}
              author={
                data
                  ? {
                      name: data.author,
                      about: "Author description",
                      githubLink: "https://github.com/author",
                    }
                  : { name: "", about: "" }
              }
            />
          </section>
        </main>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default CodingSnippets;
