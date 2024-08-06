"use client";
import { useState, useEffect } from "react";
import { NavBar } from "../components/navbar";
import languages from "@/db/codesnippets/categories.json";
import Link from "next/link";

export default function CodingSnippets() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  return (
    <main
      className={`h-screen overflow-auto ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <NavBar
        title={"Coding Snippets"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div className="flex flex-col justify-center items-center h-fullpt-52 px-5">
        <section className="text-center p-10 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">Coding Snippets</h1>
          <p className="text-lg">A free collection of coding snippets</p>

          <p className=" mt-10 mb-5">Please choose a category:</p>
          <div className="grid gap-2 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-3">
            {languages.languages.map((language, index) => (
              <Link
              href={"/cs/" + language.name}
              key={index}
              className={`${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"} rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-card-shadow cursor-pointer transition-all duration-500 ease-in`}
            >
                <h1>{language.name}</h1>
                <p>{language.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}