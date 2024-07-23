"use client";

import { useState } from "react";
import { NavBar } from "@/app/components/navbar";

export default function HTML_JSX() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };
  return (
    <main
      className={`h-screen overflow-auto ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <NavBar title={"HTML to JSX"} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
    </main>
  );
}
