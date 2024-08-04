"use client"
import { useState, useEffect } from "react"
import { NavBar } from "../components/navbar";

export default function CodingSnippets(){
    const [isDarkMode, setIsDarkMode] = useState(false)
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
    return(
        <main
      className={`h-screen overflow-auto ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
        <NavBar title={"Coding Snippets"} isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>

        </main>
    )
}