// app/badge-maker/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import BadgeForm from "./BadgeForm.jsx";
import { NavBar } from "../../components/navbar.jsx";
import Footer from "../../components/Footer/index.jsx";
const BadgeMakerPage = () => {
  const [badgeMarkdown, setBadgeMarkdown] = useState("");
  const [badgeImage, setBadgeImage] = useState(""); // For preview image
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleGenerateBadge = async (data) => {
    console.log("Generating badge with data:", data);
    const queryString = new URLSearchParams(data).toString();
    //console.log(`/api/badge?${queryString}`);

    try {
      const result = `${window.location.origin}/api/badge?${queryString}`;
      //console.log("API response:", result);

      if (result) {
        setBadgeImage(result); // Set image source
        setBadgeMarkdown(result); // Store file URL for copying
      }
    } catch (error) {
      console.error("Error fetching badge:", error);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  const copyToClipboard = () => {
    const markdown = `![Badge](${badgeMarkdown})`;
    navigator.clipboard
      .writeText(markdown)
      .then(() => alert("Badge Markdown copied to clipboard!"))
      .catch((err) => console.error("Failed to copy badge Markdown:", err));
  };

  // Ensure theme is applied on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  return (
    <main
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-800"
      } min-h-screen`}
    >
      <NavBar
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        title={"Badge Maker"}
      />
      <BadgeForm onSubmit={handleGenerateBadge} isDarkMode={isDarkMode} />
      {badgeImage && (
        <div className="w-2/3 mx-auto mt-8">
          {badgeImage && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Badge Preview</h2>
              <img src={badgeImage} alt="Badge Preview" />
            </div>
          )}
          {badgeMarkdown && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">Badge Markdown</h2>
              <pre className="bg-gray-200 p-4 rounded-md overflow-x-auto">
                <code>{`![Badge](${badgeMarkdown})`}</code>
              </pre>
              <button
                onClick={copyToClipboard}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4"
              >
                Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      )}
      <div className="flex justify-center">
        <Footer isDarkMode={isDarkMode} />
      </div>
    </main>
  );
};

export default BadgeMakerPage;
