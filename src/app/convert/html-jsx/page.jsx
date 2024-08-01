"use client";

import { useState, useMemo, useEffect } from "react";
import { NavBar } from "@/app/components/navbar";
import CodeEditor from "./components/editor";
import { htmlToJsx } from "html-to-jsx-transform";

export default function HTML_JSX() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [value, setValue] = useState("");
  const [cache, setCache] = useState({});

  // Handle editor change
  const handleChange = (val) => {
    setValue(val);
  };

  // Toggle theme and save preference in localStorage
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  // Generate JSX from HTML with caching
  const generateJSX = () => {
    if (cache[value]) {
      return cache[value];
    }

    const jsx = htmlToJsx(value);
    const jsxCode = `function component() { return (${jsx}) }`;
    setCache(prevCache => ({ ...prevCache, [value]: jsxCode }));
    return jsxCode;
  };

  // Effect to load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = JSON.parse(localStorage.getItem("theme"));
    if (storedTheme !== null) {
      setIsDarkMode(storedTheme);
    }
  }, []);

  // Memoize the generated JSX to avoid recomputation on every render
  const generatedJSX = useMemo(() => {
    return generateJSX();
  }, [value]);

  return (
    <main
      className={`h-screen overflow-auto ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <NavBar
        title={"HTML to JSX"}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />
      <div className="flex h-full">
        <div>
          <h1 className="text-center p-2">HTML</h1>
          <CodeEditor
            theme={isDarkMode ? "vs-dark" : "vs-light"}
            value={value}
            language={"html"}
            onChange={handleChange}
          />
        </div>
        <div>
          <h1 className="text-center p-2">JSX</h1>
          <CodeEditor
            theme={isDarkMode ? "vs-dark" : "vs-light"}
            language={"javascript"}
            value={generatedJSX}
            onChange={() => {}}
          />
        </div>
      </div>
    </main>
  );
}
