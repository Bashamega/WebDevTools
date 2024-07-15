"use client";
import React, { useState, useEffect } from "react";
import Search from "./search";
import Link from "next/link";
import Switch from "@mui/material/Switch";

export function NavBar({ title, isDarkMode, toggleTheme }) {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme !== null && JSON.parse(storedTheme) !== isDarkMode) {
      toggleTheme();
    }
  }, []);
  const handletoggleTheme = ()=>{
    localStorage.setItem('theme', !isDarkMode);
    toggleTheme()
  }
  return (
    <nav className={`py-4 px-6 flex items-center justify-between ${isDarkMode ? "bg-gray-800" : "bg-blue-500"}`}>
      <Link
        href="/"
        className="flex items-center border rounded p-2 hover:bg-blue-600 mr-2"
      >
        <h1 className={`text-lg md:text-2xl font-bold mr-2 ${isDarkMode ? "text-white" : "text-black"}`}>
          Web Dev Tools
        </h1>
        <p>{title}</p>
      </Link>
      <div className="flex items-center">
        <Search isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Switch
          checked={isDarkMode}
          onChange={handletoggleTheme}
          color="default"
          inputProps={{ "aria-label": "toggle dark mode" }}
        />
      </div>
    </nav>
  );
}
