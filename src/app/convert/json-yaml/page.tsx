"use client";

import { useState } from "react";
import NavBar from "@/components/navbar";
import CodeEditor from "../components/editor";
const YAML = require("json-to-pretty-yaml");

export default function HTML_JSX() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [value, setValue] = useState(
    `{"name": "Alice", "age": 25, "email": "alice@example.com", "isStudent": false, "courses": ["Math", "Science", "History"]}`,
  );
  const handleChange = (val: string | undefined): void => {
    setValue(val ?? "");
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  const generateYAML = () => {
    let yaml = "";
    try {
      yaml = YAML.stringify(JSON.parse(value));
    } catch (error) {
      yaml = String(error);
    }
    if (value === "") {
      yaml = "";
    }
    return `${yaml}`;
  };

  return (
    <main
      className={`h-screen overflow-auto ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <NavBar
        title={"JSON to YAML"}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />
      <div className="flex h-full">
        <div>
          <h1 className="text-center p-2">JSON</h1>
          <CodeEditor
            theme={isDarkMode ? "vs-dark" : "vs-light"}
            value={value}
            language={"json"}
            onChange={handleChange}
          />
        </div>
        <div>
          <h1 className="text-center p-2">YAML</h1>
          <CodeEditor
            theme={isDarkMode ? "vs-dark" : "vs-light"}
            language={"yaml"}
            value={generateYAML()}
            onChange={() => {}}
          />
        </div>
      </div>
    </main>
  );
}
