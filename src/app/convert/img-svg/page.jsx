"use client";

import { useState } from "react";
import { NavBar } from "@/app/components/navbar";
import CodeEditor from "./components/svg-converter";
import ImageUpload from './components/image-upload'
import { htmlToJsx } from "html-to-jsx-transform";
import {ImageProvider} from './ImageContextApi'
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
 
  return (
    <ImageProvider>
    <main
      className={`h-screen overflow-auto ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <NavBar
        title={"Image to svg"}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />
      <div className="flex h-full">
        <div>
          <h1 className="text-center p-2">Upload Image</h1>
          <ImageUpload
        
          />
        </div>
        <div>
          <h1 className="text-center p-2 ">Svg Format</h1>
          <CodeEditor
          
          />
        </div>
      </div>
    </main>
    </ImageProvider>
  );
}
