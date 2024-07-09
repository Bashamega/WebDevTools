"use client"; 

import React, { useState } from "react";
import { NavBar } from "@/app/components/navbar";
import Editor from "./components/Editor";

const Page = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`max-h-[100vh] overflow-hidden ${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-800"}`}>
      <NavBar title={"Code Editor"} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Editor />
    </div>
  );
};

export default Page;
