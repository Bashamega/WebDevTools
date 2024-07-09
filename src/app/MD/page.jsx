"use client";
import React, { useState, useRef } from "react";
import snarkdown from "snarkdown";
import { saveAs } from "file-saver";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Search from "../components/search";
import Link from "next/link";
import Switch from "@mui/material/Switch";

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("# hey");
  const [name, setName] = useState("untitled");
  const [toggle, setToggle] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const textareaRef = useRef(null);

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

  const searchToggle = () => {
    setToggle(!toggle);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <main className={`h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <nav className={`py-4 px-6 flex items-center justify-between h-[69px] ${isDarkMode ? "bg-gray-800" : "bg-blue-500"}`}>
        <Link
          href="/"
          className={`mr-2 flex border items-center p-2 hover:bg-blue-700 transition-all duration-700 rounded-lg ${isDarkMode ? "border-gray-600" : ""}`}
        >
          <h1 className="text-sm md:text-2xl font-bold mr-4 ml-1">Web Dev Tools</h1>
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
            <SearchIcon className={`${isDarkMode ? "text-gray-400" : "text-gray-800"}`} onClick={searchToggle} />

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
          <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
            color="default"
            inputProps={{ "aria-label": "toggle dark mode" }}
          />
          <span className="ml-2">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
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
