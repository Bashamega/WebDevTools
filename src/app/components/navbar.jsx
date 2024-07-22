"use client";
import React, { useState, useEffect } from "react";
import Search from "./search";
import Link from "next/link";
import Switch from "@mui/material/Switch";
import Icons from "./icon";

export function NavBar({ title, isDarkMode, toggleTheme }) {
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
  const handleToggleTheme = () => {
    localStorage.setItem("theme", !isDarkMode);
    toggleTheme();
  };
  return (
    <nav
      className={`py-4 px-6 flex items-center justify-between ${isDarkMode ? "bg-gray-800" : "bg-blue-500"}`}
    >
      <Link
        href="/"
        className="flex items-center border rounded p-2 hover:bg-blue-600 mr-2"
      >
        <h1
          className={`text-lg md:text-2xl font-bold mr-2 ${isDarkMode ? "text-white" : "text-black"}`}
        >
          Web Dev Tools
        </h1>
        <p>{title}</p>
      </Link>
      <div className="flex items-center">
        <button
          onClick={handleToggleTheme}
          className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-200 transition-colors duration-200"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <Icons.SunIcon className="text-white" />
          ) : (
            <Icons.MoonIcon className="text-black" />
          )}
        </button>
      </div>
    </nav>
  );
}
