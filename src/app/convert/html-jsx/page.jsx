"use client";

import { useState } from "react";
import { NavBar } from "@/app/components/navbar";
import CodeEditor from "./components/editor";
import { htmlToJsx } from "html-to-jsx-transform";

export default function HTML_JSX() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [value, setValue] = useState("");
  const handleChange = (val) => {
    setValue(val);
  };
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };
  const generateJSX = () => {
    const jsx = htmlToJsx(value);
    return `function component(){
    return(${jsx})
    
}
    `;
  };
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
            value={generateJSX()}
            onChange={() => {}}
          />
        </div>
      </div>
    </main>
  );
}
