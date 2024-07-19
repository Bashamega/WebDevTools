"use client";

import React, { useState } from 'react';
import snarkdown from "snarkdown";
import Nav from "@/app/components/nav";

export default function ButtonCustomizer() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [installation, setInstallation] = useState('');
  const [usage, setUsage] = useState('');
  const [license, setLicense] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const generateMarkdown = () => {
    return `# ${title}

## Description
${description}

## Installation
${installation}

## Usage
${usage}

## License
${license}
    `;
  };

  const downloadReadme = () => {
    const element = document.createElement("a");
    const file = new Blob([generateMarkdown()], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = "README.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-800"} min-h-screen`}>
      <Nav isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
<div className="w-2/3">
      <h1 className="text-4xl font-bold mb-6">
        GitHub README Generator
      </h1>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2" htmlFor="title">
          Project Title
        </label>
        <input
          id="title"
          type="text"
          className={`${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900 border-gray-400"} w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className={`${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900 border-gray-400"} w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2" htmlFor="installation">
          Installation
        </label>
        <textarea
          id="installation"
          className={`${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900 border-gray-400"} w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          rows={4}
          value={installation}
          onChange={(e) => setInstallation(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2" htmlFor="usage">
          Usage
        </label>
        <textarea
          id="usage"
          className={`${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900 border-gray-400"} w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          rows={4}
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2" htmlFor="license">
          License
        </label>
        <input
          id="license"
          type="text"
          className={`${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900 border-gray-400"} w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          value={license}
          onChange={(e) => setLicense(e.target.value)}
        />
      </div>
      <button
        onClick={downloadReadme}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Download README
      </button>
      <h2 className="text-2xl font-bold mt-8 mb-4">
        Preview
      </h2>
      <div className="p-4 border rounded-lg border-gray-400">
        <iframe
            className={`w-full h-full ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
            title="Parsed Markdown"
            srcDoc={`<!DOCTYPE html><html><head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css"><style>body { margin: 0; padding: 16px; background-color: ${isDarkMode ? "#1a202c" : "white"}; color: ${isDarkMode ? "white" : "black"}; }</style></head><body class="markdown-body">${snarkdown(
              markdown,
            )}</body></html>`}
          />
      </div>
      </div>
    </div>
  );
}
