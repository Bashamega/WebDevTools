"use client";
import CodeEditor from "./CodeEditor";
import { useState, useEffect } from "react";
import Sider from "./Sider";
import { FooterOptions } from "./FooterOptions";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function Editor({ isDarkMode }) {
  const [value, setValue] = useState("console.log('Hello, World!');");
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState({
    name: "",
    content: "",
    lang: "",
  });

  useEffect(() => {
    if (activeFile) {
      setValue(activeFile.content);
    }
  }, [activeFile]);

  const handleChange = (val, ev) => {
    setValue(val);
    files.forEach((element) => {
      if (element.name === activeFile.name) {
        element.content = val;
      }
    });
  };

  const saver = () => {
    const zip = new JSZip();
    files.forEach((element) => {
      zip.file(element.name, element.content);
    });
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "code_files.zip");
    });
  };

  return (
    <div className={`h-screen flex ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      {activeFile.name ? (
        <div className="flex flex-col flex-grow">
          <CodeEditor
            language={activeFile.lang}
            theme={isDarkMode ? "vs-dark" : "vs-light"}
            value={value}
            onChange={handleChange}
          />
          <FooterOptions
            file={activeFile}
            setFile={setActiveFile}
            files={files}
            saveFunction={saver}
          />
        </div>
      ) : (
        <div className={`w-[80vw] h-[90vh] flex justify-center items-center ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
          <h1 className={`text-2xl ${isDarkMode ? "text-white" : "text-black"}`}>No file selected</h1>
        </div>
      )}
      <Sider files={files} newfile={setFiles} activateFile={setActiveFile} />
    </div>
  );
}
