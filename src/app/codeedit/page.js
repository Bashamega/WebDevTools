"use client";

import React, { useState, useEffect, useRef } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Search from "../assets/search";
import { AiFillHtml5 } from "react-icons/ai";
import { FaCss3, FaJs } from "react-icons/fa";
import { Editor } from "@monaco-editor/react";
export default function Nav() {
  const [htmlCode, setHtmlCode] = useState(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        
    </body>
    </html>
  `);
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [showViewSection, setShowViewSection] = useState(false);
  const [showIndexHtmlSection, setShowIndexHtmlSection] = useState(false);
  const [showStyleCssSection, setShowStyleCssSection] = useState(false);
  const [showScriptJsSection, setShowScriptJsSection] = useState(false);

  const iframeRef = useRef(null);

  useEffect(() => {
    // Generate the code to display in the iframe
    const code = `
      <style>${cssCode}</style>
      ${htmlCode}
      <script>${jsCode}</script>
    `;
    // Update the iframe content when code or section visibility changes
    if (showViewSection) {
      const iframe = iframeRef.current;
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.writeln(code);
      iframe.contentWindow.document.close();
    }
  }, [htmlCode, cssCode, jsCode, showViewSection]);

  /** By passing the value property to the respective state update functions,
   * we can correctly update the state variables htmlCode, cssCode, and jsCode
   * when the code in the editors changes.
   */
  const handleHtmlChange = (value) => {
    setHtmlCode(value);
  };

  const handleCssChange = (value) => {
    setCssCode(value);
  };

  const handleJsChange = (value) => {
    setJsCode(value);
  };

  const handleDownload = () => {
    const zip = new JSZip();

    // Add HTML file to zip
    zip.file("index.html", htmlCode);

    // Add CSS file to zip
    zip.file("style.css", cssCode);

    // Add JS file to zip
    zip.file("script.js", jsCode);

    // Generate the zip file
    zip.generateAsync({ type: "blob" }).then((content) => {
      // Save the zip file
      saveAs(content, "code_files.zip");
    });
  };

  const handleViewClick = () => {
    setShowViewSection(true);
    setShowIndexHtmlSection(false);
    setShowStyleCssSection(false);
    setShowScriptJsSection(false);
  };

  const handleIndexHtmlClick = () => {
    setShowViewSection(false);
    setShowIndexHtmlSection(true);
    setShowStyleCssSection(false);
    setShowScriptJsSection(false);
  };

  const handleStyleCssClick = () => {
    setShowViewSection(false);
    setShowIndexHtmlSection(false);
    setShowStyleCssSection(true);
    setShowScriptJsSection(false);
  };

  const handleScriptJsClick = () => {
    setShowViewSection(false);
    setShowIndexHtmlSection(false);
    setShowStyleCssSection(false);
    setShowScriptJsSection(true);
  };
  useEffect(() => {
    document.querySelectorAll("textarea").forEach((textarea) => {
      textarea.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
          e.preventDefault();

          // Get the current cursor position
          var start = this.selectionStart;
          var end = this.selectionEnd;

          // Insert three spaces at the cursor position
          this.value =
            this.value.substring(0, start) + "   " + this.value.substring(end);

          // Move the cursor position after the inserted spaces
          this.selectionStart = this.selectionEnd = start + 3;
        }
      });
    });
  }, []);
  return (
    <div className="h-screen overflow-hidden">
      <nav className="bg-blue-500 py-4 px-6 flex justify-between items-center">
        <a
          href="https://web-dev-tools.vercel.app/"
          className="mr-2 flex items-center border rounded p-2 hover:bg-blue-600"
        >
          <h1 className="text-white text-lg md:text-2xl font-bold mr-4">
            Web Dev Tools
          </h1>
          <p>Code editor</p>
        </a>
        <Search />
      </nav>
      <main className="flex h-full overflow-hidden">
        <section className="w-1/3 h-full bg-gray-600">
          <div>
            <button
              onClick={handleDownload}
              className="w-full bg-slate-400 hover:bg-slate-500"
            >
              Download
            </button>
          </div>
          <button
            onClick={handleViewClick}
            className="w-full text-center bg-slate-800 text-slate-400 hover:bg-slate-900 h-10"
          >
            View
          </button>
          <button
            onClick={handleIndexHtmlClick}
            className="w-full text-center bg-slate-800 text-white hover:bg-slate-900 h-10 flex pl-8 pt-2"
          >
            <AiFillHtml5
              className="mr-2"
              size={18}
              color="#E34F26"
            ></AiFillHtml5>
            Index.html
          </button>
          <button
            onClick={handleStyleCssClick}
            className="w-full text-center bg-slate-800 text-white hover:bg-slate-900 h-10 flex pl-8 pt-2"
          >
            <FaCss3 className="mr-2" size={18} color="#0000FF"></FaCss3>
            Style.css
          </button>
          <button
            onClick={handleScriptJsClick}
            className="w-full text-center bg-slate-800 text-white hover:bg-slate-900 h-10 flex pl-8 pt-2"
          >
            <FaJs className="mr-2" size={18} color="#FFFF00"></FaJs>Script.js
          </button>
        </section>

        <section className="w-2/3 h-full">
          {showViewSection && (
            <section className="p-5 w-full h-full bg-white">
              <iframe
                id="result-iframe"
                title="Result"
                className="w-full h-full"
                ref={iframeRef}
              ></iframe>
            </section>
          )}
          {showIndexHtmlSection && (
            <section className="w-full h-full">
              <Editor
                theme="vs-dark"
                defaultLanguage="html"
                width="100%"
                height="100%"
                value={htmlCode}
                onChange={handleHtmlChange}
              />
            </section>
          )}
          {showStyleCssSection && (
            <section className="w-full h-full">
              <Editor
                theme="vs-dark"
                defaultLanguage="css"
                width="100%"
                height="100%"
                value={cssCode}
                onChange={handleCssChange}
              />
            </section>
          )}
          {showScriptJsSection && (
            <section className="w-full h-full">
              <Editor
                theme="vs-dark"
                defaultLanguage="javascript"
                width="100%"
                height="100%"
                value={jsCode}
                onChange={handleJsChange}
              />
            </section>
          )}
        </section>
      </main>
    </div>
  );
}
