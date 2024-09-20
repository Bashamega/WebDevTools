"use client";
import { useState, useEffect } from "react";
import { NavBar } from "../../../components/navbar";
import languages from "@/db/codesnippets/categories.json";
import NotFound from "@/app/not-found";
import Link from "next/link";
import { BlogCard } from "../components/blogCard";

export default function CodingSnippetsTopic({ params }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notfound, setNotfound] = useState(false);
  const [content, setContent] = useState();
  const [filteredContent, setFilteredContent] = useState();
  const [searchValue, setSearchValue] = useState();

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value) {
      setFilteredContent(
        content.filter((art) =>
          art.title.toLowerCase().includes(e.target.value.toLowerCase()),
        ),
      );
    } else {
      setFilteredContent(content);
    }
  };

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

  useEffect(() => {
    const languageExists = languages.languages.some((language) => {
      return language.name.toLowerCase() === params.language.toLowerCase();
    });
    if (languageExists) {
      setContent(
        require(
          `@/db/codesnippets/posts/${params.language.toLowerCase()}/content.json`,
        ),
      );
      setFilteredContent(
        require(
          `@/db/codesnippets/posts/${params.language.toLowerCase()}/content.json`,
        ),
      );
    } else {
      setNotfound(true);
    }
  }, [languages.languages, params.language]);

  const title = (text) => {
    return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <>
      {notfound ? (
        <NotFound />
      ) : (
        <main
          className={`h-screen overflow-auto ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          <NavBar
            title={"Coding Snippets / " + title(params.language)}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
          <div className="flex flex-col justify-center items-center h-fullpt-52 px-5">
            <section className="text-center p-10 rounded-lg">
              <h1 className="text-4xl font-bold mb-4">
                {title(params.language)} Snippets
              </h1>
              <p className="text-lg">
                A free collection of {title(params.language)} snippets
              </p>
              <section>
                <input
                  type="text"
                  placeholder="search"
                  value={searchValue}
                  onChange={handleSearch}
                  className={`w-full p-2 my-5 border rounded-lg shadow ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-200 text-black"
                  } ${content && content.length > 0 ? "block" : "hidden"}`}
                />
                {filteredContent && filteredContent.length > 0 ? (
                  <div className="container mx-auto p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredContent.map((article, index) => (
                        <BlogCard
                          key={index}
                          data={article}
                          darkmode={isDarkMode}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>No available posts</p>
                    <Link
                      href="https://github.com/Bashamega/WebDevTools"
                      className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 hover:shadow-card-shadow  transition-all duration-500 ease-in"
                    >
                      <svg
                        className="mr-3 w-7 h-7"
                        viewBox="0 0 1024 1024"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                          transform="scale(64)"
                          fill="#fff"
                        />
                      </svg>

                      <div className="text-left">
                        <div className="-mt-1 font-sans text-sm font-semibold">
                          Add code snippets
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </section>
            </section>
          </div>
        </main>
      )}
    </>
  );
}
