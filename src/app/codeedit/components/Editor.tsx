"use client";
import CodeEditor from "./CodeEditor";
import { useState, useEffect } from "react";
import Sider from "./Sider";
import { FooterOptions } from "./FooterOptions";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface EditorProps {
  isDarkMode: boolean;
}

interface CustomFile {
  name: string;
  content: string;
  lang: string;
}

export default function Editor({ isDarkMode }: EditorProps) {
  const [value, setValue] = useState<string>("console.log('Hello, World!');");
  const [file, setFile] = useState<CustomFile | null>(null);
  const [files, setFiles] = useState<CustomFile[]>([]); // Files array with File type

  const [activeFile, setActiveFile] = useState<CustomFile | null>(null);

  useEffect(() => {
    if (activeFile) {
      setValue(activeFile.content);
    }
  }, [activeFile]);

  const handleChange = (val: string | undefined, ev?: any) => {
    setValue(val ?? "");
    if (activeFile) {
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.name === activeFile.name
            ? { ...file, content: val ?? "" }
            : file,
        ),
      );
    }
  };

  const saver = () => {
    const zip = new JSZip();
    files.forEach((file) => {
      zip.file(file.name, file.content);
    });
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "code_files.zip");
    });
  };

  return (
    <div
      className={`h-screen flex ${isDarkMode ? "bg-gray-800" : "bg-gray-500"}`}
    >
      {activeFile && activeFile.name ? (
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
        <div
          className={`w-[80vw] h-[90vh] flex justify-center items-center ${
            isDarkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <h1
            className={`text-2xl ${isDarkMode ? "text-white" : "text-black"}`}
          >
            No file selected
          </h1>
        </div>
      )}

      {/* <Sider files={files} newfile={setFiles} activateFile={setActiveFile} /> */}
      <Sider files={files} newFile={setFiles} activateFile={setActiveFile} />
    </div>
  );
}
