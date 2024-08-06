"use client";
import { useState, useEffect } from "react";
import { NavBar } from "../../components/navbar";
import Link from "next/link";

export default function CodingSnippetsTopic({params}) {
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
  const title = (text)=>{
    return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  }

  return (
    <main
      className={`h-screen overflow-auto ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <NavBar
        title={"Coding Snippets | " + title(params.language)}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div className="flex flex-col justify-center items-center h-fullpt-52 px-5">
        <section className="text-center p-10 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">{title(params.language)} Snippets</h1>
          <p className="text-lg">A free collection of {title(params.language)} snippets</p>

          
        </section>
      </div>
    </main>
  );
}