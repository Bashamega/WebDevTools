"use client";

import { NavBar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const [url, setUrl] = useState("");

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-800"
      } min-h-screen`}
    >
      <NavBar
        title="Sitemap XML Generator"
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      <main className="max-w-6xl m-auto w-full p-8">
        <div className="mt-10 space-y-4 text-center">
          <h1 className="text-5xl font-extrabold text-center">
            Sitemap XML Generator
          </h1>
          <p className="text-xl text-center font-medium">
            Just enter your website URL to create a sitemap
          </p>
        </div>

        <div className="flex items-stretch gap-2 mt-8">
          <Input
            placeholder="https://website-url.com"
            className="flex-grow text-lg h-auto"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            // onClick={handleGenerateXmlSitemap}
            className="px-4 py-2 bg-slate-100 rounded text-slate-950 font-medium"
          >
            Generate
          </button>
        </div>
      </main>
    </div>
  );
}
