"use client";
import React, { useState } from "react";
import Editor from "./components/Editor";
import { NavBar } from "../components/navbar";

export default function CodeEditor() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div
      className={`max-h-[100vh] overflow-hidden ${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-black text-gray-800"}`}
    >
      <NavBar
        title={"Box Shadow generator"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <Editor isDarkMode={isDarkMode} />
    </div>
  );
}
