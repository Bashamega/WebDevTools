"use client";
import Nav from "@/app/components/nav";
import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import toolList from "@/db/tools.json";
import { Card } from "./components/card";

export default function Home({ state }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <main
      className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-w-80`}
    >
      <Nav isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="flex justify-center flex-col items-center w-full">
        <div
          id="contributers"
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mr-4 p-5 my-9 w-4/5 break-words py-6 md:p-6 border rounded-lg shadow ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-black"}`}
        >
          {toolList.map((item, index) => (
            <Card
              key={index}
              title={item.name}
              link={item.link}
              desc={""}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Footer isDarkMode={isDarkMode} />
        </div>
      </div>
    </main>
  );
}
