"use client";
import React, { useState, useRef, useEffect } from "react";
import snarkdown from "snarkdown";
import { saveAs } from "file-saver";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Search from "../components/search";
import Link from "next/link";
import Switch from "@mui/material/Switch";

const SunIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

// Moon icon component
const MoonIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("# hey");
  const [name, setName] = useState("untitled");
  const [toggle, setToggle] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const textareaRef = useRef(null);
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    try {
      if (storedTheme !== null && JSON.parse(storedTheme) !== isDarkMode) {
        toggleTheme();
      }
    } catch {
      console.log("Failed to read localstorage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    saveAs(blob, name + ".md");
  };

  const insertMarkdown = (markdownToInsert) => {
    const cursorPosition = textareaRef.current.selectionStart;
    const newMarkdown =
      markdown.substring(0, cursorPosition) +
      markdownToInsert +
      markdown.substring(cursorPosition);

    setMarkdown(newMarkdown);
  };

  const markdownButtons = [
    // Headers
    { label: "H1", data: "# " },
    { label: "H2", data: "## " },
    { label: "H3", data: "### " },
    // Text Formatting
    { label: "Bold", data: "**bold text**" },
    { label: "Italic", data: "*italic text*" },
    { label: "Strikethrough", data: "~~strikethrough text~~" },
    // Lists
    { label: "Bullet List", data: "- " },
    { label: "Numbered List", data: "1. " },
    // Links and Images
    { label: "Link", data: "[link text](https://example.com)" },
    { label: "Image", data: "![alt text](image-url)" },
    // Quotes
    { label: "Block Quote", data: "> " },
    // Code Blocks
    { label: "Inline Code", data: "`inline code`" },
    { label: "Code Block", data: "```\ncode block\n```" },
    // Horizontal Rule
    { label: "Horizontal Rule", data: "\n---\n" },
    // Add more buttons and their corresponding data strings here
  ];

  // const searchToggle = () => {
  //   setToggle(!toggle);
  // };
  function searchToggle() {
    setToggle(!toggle);
  }
  console.log(toggle);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  return (
    <main
      className={`h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <nav
        className={`py-4 px-6 flex items-center justify-between h-[69px] ${isDarkMode ? "bg-gray-800" : "bg-blue-500"}`}
      >
        <Link
          href="/"
          className={`mr-2 flex border items-center p-2 hover:bg-blue-700 transition-all duration-700 rounded-lg ${isDarkMode ? "border-gray-600" : ""}`}
        >
          <h1 className="text-sm md:text-2xl font-bold mr-4 ml-1">
            Web Dev Tools
          </h1>
          <p className="mr-2 text-sm">MD Editor</p>
        </Link>
        <div className="flex items-center">
          <input
            value={name}
            onChange={handleNameChange}
            className={`outline-none border text-sm rounded p-1.5 px-2 ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"}`}
          />
          <button
            onClick={handleDownload}
            className={`ml-2 mr-2 text-sm rounded p-1.5 px-2 hover:bg-gray-600 ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-300 border-gray-200 text-black"}`}
          >
            Download
          </button>
          <div className="hidden lg:block ml-6">
            <Search />
          </div>

          <button onClick={searchToggle} className="lg:hidden">
            <SearchIcon
              className={`${isDarkMode ? "text-gray-400" : "text-gray-800"}`}
              onClick={searchToggle}
            />
          </button>
          <div
            className={`absolute w-full h-[69px] flex items-center ${isDarkMode ? "bg-gray-800" : "bg-blue-500"} ${
              toggle
                ? "left-0 duration-300 ease-in"
                : "left-[100%] duration-300 ease-in"
            } `}
          >
            <div className="flex flex-1 items-center justify-center relative">
              <ArrowBackIcon
                className="mr-4 absolute left-2 cursor-pointer"
                onClick={searchToggle}
              />
              <Search />
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-200 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <SunIcon className="text-white" />
            ) : (
              <MoonIcon className="text-black" />
            )}
          </button>
        </div>
      </nav>
      <div className="flex justify-between">
        <div className="flex flex-wrap justify-center md:justify-normal ">
          {markdownButtons.map((button, index) => (
            <button
              key={index}
              onClick={() => insertMarkdown(button.data)}
              className={`text-sm rounded px-2 py-2 hover:bg-gray-600 m-2 ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-300 border-gray-200 text-black"}`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      <section className="flex flex-col md:flex-row w-full h-[100%] gap-3">
        <section className="w-[96%] h-full  md:w-1/2 ml-2 mr-2 ">
          <h1>Markdown</h1>
          <textarea
            className={`border p-2 h-full w-full resize-none ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
            value={markdown}
            onChange={handleMarkdownChange}
            ref={textareaRef}
          />
        </section>
        <section className=" w-[96%] md:w-1/2 h-full ml-2 mr-2 mt-6 md:mt-0 ">
          <h1>Output</h1>
          <iframe
            className={`w-full h-full ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
            title="Parsed Markdown"
            srcDoc={`<!DOCTYPE html><html><head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css"><style>body { margin: 0; padding: 16px; background-color: ${isDarkMode ? "#1a202c" : "white"}; color: ${isDarkMode ? "white" : "black"}; }</style></head><body class="markdown-body">${snarkdown(
              markdown,
            )}</body></html>`}
          />
        </section>
      </section>
    </main>
  );
}