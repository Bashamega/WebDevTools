"use client";

import { useState } from "react";
import CodeEditor from "./components/Editor";
import { NavBar } from "../../components/navbar";
import Asciidoctor from "asciidoctor";

const asciidoctor = Asciidoctor();

export default function AsciiDocEditor() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [value, setValue] = useState("");
  const [HTML, setHTML] = useState("");

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleChange = (val) => {
    setValue(val);
    setHTML(asciidoctor.convert(val));
  };

  return (
    <div
      className={`h-screen overflow-hidden ${
        isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"
      }`}
    >
      <NavBar
        title={"Ascii Doc Editor"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div className="flex h-full">
        <CodeEditor
          theme={isDarkMode ? "vs-dark" : "vs-light"}
          value={value}
          onChange={handleChange}
          className="w-1/2 h-full"
        />
        <div
          dangerouslySetInnerHTML={{ __html: HTML }}
          className="p-10 w-1/2 h-full overflow-auto"
        ></div>
      </div>
    </div>
  );
}
