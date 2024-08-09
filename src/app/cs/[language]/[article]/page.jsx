"use client";
import { useState, useEffect } from "react";
import { NavBar } from "@/app/components/navbar";
import languages from "@/db/codesnippets/categories.json";
import NotFound from "@/app/not-found";

export default function CodingSnippets({ params }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [articleExists, setArticleExists] = useState(true);

  // Toggle theme and save preference in localStorage
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  useEffect(() => {
    const storedTheme = JSON.parse(localStorage.getItem("theme"));
    if (storedTheme !== null) {
      setIsDarkMode(storedTheme);
    }
  }, []);
  const title = (text) => {
    return decodeURIComponent(text)
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => {
    const languageExists = languages.languages.some((language) => {
      return language.name.toLowerCase() === params.language.toLowerCase();
    });
    if (languageExists) {
      const data = require(
        `@/db/codesnippets/posts/${params.language.toLowerCase()}/content.json`,
      );
      const article = data.some((article) => {
        return title(article.title) === title(params.article);
      });
      setArticleExists(article);
    } else {
      setArticleExists(false);
    }
  }, [languages.languages, params.language, params.article]);
  return (
    <>
      {articleExists ? (
        <main
          className={`h-screen overflow-auto ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
        >
          <NavBar
            title={`Coding Snippets / ${title(params.language)} / ${title(params.article)}`}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        </main>
      ) : (
        <NotFound />
      )}
    </>
  );
}
