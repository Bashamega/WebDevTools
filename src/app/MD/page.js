"use client"
import React, { useState, useRef} from "react";
import Search from "@/app/assets/search";
import snarkdown from 'snarkdown';
import { saveAs } from "file-saver";

export default function MarkdownEditor() {
  
  const [markdown, setMarkdown] = useState("# hey");
  const [name, setName] = useState('untitled');
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
  return (
    <main className="h-screen">
      <nav className="bg-blue-500 py-4 px-6 flex items-center justify-between">
        <a
          href="https://web-dev-tools.vercel.app/"
          className="mr-2 flex border items-center rounded p-2 hover:bg-blue-600"
        >
          <h1 className="text-white text-lg md:text-2xl font-bold mr-4">
            Web Dev Tools
          </h1>
          <p>MD Editor</p>
        </a>
        <div className="flex items-center">
          <input
            value={name}
            onChange={handleNameChange}
            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded p-1.5 px-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          />
          <button
            onClick={handleDownload}
            className="ml-2 bg-gray-700 border border-gray-600 text-white text-sm rounded p-1.5 px-2 hover:bg-gray-600"
          >
            Download
          </button>
          <Search />
        </div>
      </nav>
      <div className="flex justify-between">
        {markdownButtons.map((button, index) => (
            <button
              key={index}
              onClick={() => insertMarkdown(button.data)}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded p-1.5 px-2 hover:bg-gray-600"
            >
              {button.label}
            </button>
          ))}

      </div>
      
      <section className="flex w-full h-full">
       
        <section className="w-1/2 mr-1">
          {/* Add your Markdown editor here */}
          <textarea
            className="border p-2 h-full w-full resize-none text-black"
            value={markdown}
            onChange={handleMarkdownChange}
            ref={textareaRef}
          />
        </section>
        <section className="w-1/2 h-full">
          {/* Display the parsed Markdown */}
          <iframe
            className="w-full h-full bg-white"
            title="Parsed Markdown"
            srcDoc={`<!DOCTYPE html><html><head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css"><style>body { margin: 0; padding: 16px; }</style></head><body class="markdown-body">${snarkdown(markdown)}</body></html>`}
          />
        </section>
      </section>
    </main>
  );
}
