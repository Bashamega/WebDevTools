"use client";
import Nav from "@/app/components/nav";
import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import tools from "@/db/tools.json";
import { Card } from "./components/card";

export default function Home({ state }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toolList, setToolList] = useState(tools);
  const [searchValue, setSearch] = useState();
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
  const handleSeach = (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      setToolList(
        tools.filter((tool) =>
          tool.name.toLowerCase().includes(e.target.value.toLowerCase()),
        ),
      );
    } else {
      setToolList(tools);
    }
  };
  return (
    <main
      className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-w-80 min-h-screen `}
    >
      <Nav isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="flex justify-center flex-col items-center w-full">
        <div
          className={`mr-4 p-5 my-9 w-4/5 break-words py-6 md:p-6 border rounded-lg shadow ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-black"}`}
        >
          <input
            type="text"
            placeholder="search"
            value={searchValue}
            onChange={handleSeach}
            className={`w-full p-2 my-5 border rounded-lg shadow ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-black"}`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {toolList.map((item, index) => (
              <Card
                key={index}
                title={item.name}
                link={item.link}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
          {!toolList.length && (
            <p className="text-center">
              No match for <strong>&quot;{searchValue}&quot;</strong>
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <Footer isDarkMode={isDarkMode} />
        </div>
      </div>
    </main>
  );
}