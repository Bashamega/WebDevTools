"use client";
import React, { useState } from "react";
import Editor from "./components/Editor";
import NavBar from "../../components/navbar";

interface CodeEditorProps {}

const CodeEditor: React.FC<CodeEditorProps> = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`max-h-[100vh] overflow-hidden ${
        isDarkMode ? "bg-gray-900 text-gray-400" : "bg-black text-gray-800"
      }`}
    >
      <NavBar
        title={"Code Editor"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <Editor isDarkMode={isDarkMode} />
    </div>
  );
};

export default CodeEditor;
