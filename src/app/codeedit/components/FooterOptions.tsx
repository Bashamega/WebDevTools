"use client";
import { CloseSharp } from "@mui/icons-material";
import React, { useState } from "react";

interface CustomFile {
  name: string;
  content: string;
  lang: string;
}

interface FooterProps {
  file: CustomFile;
  setFile: React.Dispatch<React.SetStateAction<CustomFile | null>>;
  files: CustomFile[];
  saveFunction: () => void;
}

export function FooterOptions({
  file,
  setFile,
  files,
  saveFunction,
}: FooterProps) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [localLang, setLocalLang] = useState<string>("");

  // Add null check for file
  if (!file) return null;

  const handleLanguageChange = () => {
    if (file && localLang) {
      const updatedFile = { ...file, lang: localLang };

      // Update the selected file's language
      setFile(updatedFile);

      // Update the file in the files array
      const updatedFiles = files.map((f) =>
        f.name === file.name ? updatedFile : f,
      );

      setPopupVisible(false);
    }
  };

  return (
    <footer className="h-[5vh] w-full bg-slate-400 flex">
      {/* Language Selector */}
      <div
        onClick={() => setPopupVisible(true)}
        className="bg-slate-600 hover:bg-slate-700 cursor-pointer h-full w-[200px] flex items-center justify-center text-white"
      >
        {file?.lang ? <p>{file.lang}</p> : <p>Choose a language</p>}
      </div>

      {/* Divider */}
      <div className="bg-slate-400 h-full w-1" />

      {/* Download Button */}
      <button
        onClick={saveFunction}
        className="bg-slate-600 hover:bg-slate-700 cursor-pointer h-full w-[200px] flex items-center justify-center text-white"
      >
        Download
      </button>

      {/* Language Selection Popup */}
      {popupVisible && (
        <section className="absolute top-0 left-0 flex justify-center items-center w-screen h-screen backdrop-blur-lg">
          <div className="p-5 rounded-lg shadow bg-gray-700 w-1/2 max-h-1/2">
            {/* Close Button */}
            <div className="flex justify-end">
              <CloseSharp
                onClick={() => setPopupVisible(false)}
                className="cursor-pointer text-white"
              />
            </div>

            {/* Language Dropdown */}
            <select
              value={localLang}
              onChange={(e) => setLocalLang(e.target.value)}
              className="bg-slate-600 rounded-lg p-2 hover:bg-slate-700 cursor-pointer text-center w-full flex items-center justify-center text-white"
            >
              <option value="">Choose a language</option>
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
              <option value="css">CSS</option>
              <option value="less">LESS</option>
              <option value="scss">SCSS</option>
              <option value="json">JSON</option>
              <option value="html">HTML</option>
            </select>

            {/* Apply Button */}
            <button
              onClick={handleLanguageChange}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Apply
            </button>
          </div>
        </section>
      )}
    </footer>
  );
}
