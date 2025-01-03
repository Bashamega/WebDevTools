"use client";
import Nav from "@/components/nav";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import tools from "@/db/tools.json";
import Card from "../components/card";
import React from "react";

interface HomeProps {
  state: any;
}

const Home: React.FC<HomeProps> = ({ state }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [toolList, setToolList] = useState(tools);
  const [searchValue, setSearch] = useState<string>("");

  useEffect(() => {
    // Check localStorage or system theme to set initial theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      // Default to light theme
      setIsDarkMode(false);
    }

    // Update document class based on dark mode
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Save theme to localStorage
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value) {
      setToolList(
        tools.filter((tool) =>
          tool.name.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    } else {
      setToolList(tools);
    }
  };

  return (
    <main
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } min-w-80 min-h-screen `}
    >
      <Nav isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="flex justify-center flex-col items-center w-full">
        <div
          className={`mr-4 p-5 my-9 mb-28 w-4/5 break-words py-6 md:p-6 rounded-lg shadow-md ${
            isDarkMode
              ? "bg-gray-800 text-white"
              : "bg-white border-gray-200 text-black"
          }`}
        >
          <input
            type="text"
            placeholder="search"
            value={searchValue}
            onChange={handleSearch}
            className={`w-full p-2 mb-5 border rounded-lg shadow ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-200 text-black"
            }`}
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
      </div>
      <div className="flex justify-center">
        <Footer isDarkMode={isDarkMode} />
      </div>
    </main>
  );
};

export default Home;
