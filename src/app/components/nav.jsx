"use client";

import React, { useState, useRef, useEffect } from "react";
import Search from "./search";
import HamburgerMenu from "./hamburger-menu";
import SearchIcon from "@mui/icons-material/Search";
import { FaTools, FaCode, FaMarkdown, FaInfo } from "react-icons/fa";
import { IoMdGitPullRequest } from "react-icons/io";
import Link from "next/link";
import Switch from "@mui/material/Switch";
import SunIcon from "./icons/sunicon";
import MoonIcon from "./icons/moonicon";

export default function Nav({ isDarkMode, toggleTheme }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  function searchToggle() {
    setToggle(!toggle);
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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
  const togglePanel = () => {
    setOpen((prev) => !prev);
  };
  const handleToggleTheme = () => {
    localStorage.setItem("theme", !isDarkMode);
    toggleTheme();
  };
  return (
    <nav
      className={`${
        isDarkMode ? "bg-gray-800 text-white" : "bg-blue-500 text-black"
      } py-2 px-4 flex items-center justify-between lg:justify-around gap-1 w-full relative mb-10 max-h-[10vh] min-w-80`}
    >
      <div className="flex flex-0 items-center flex-shrink">
        <Link
          href="/"
          className={`flex items-center border rounded p-2 hover:${
            isDarkMode ? "bg-gray-700" : "bg-blue-600"
          } mr-2`}
        >
          <h1 className="text-sm md:text-lg lg:text-xl font-bold mr-1">
            Web Dev Tools
          </h1>
        </Link>
        &emsp;
        <div className="hidden lg:block mr-2">
          <Search />
        </div>
      </div>

      <div className="relative hidden lg:block">
        <button
          onClick={toggleDropdown}
          className={`focus:outline-none text-[0.58rem] font-bold sm:font-bold items-center sm:text-sm flex md:text-sm flex-1 p-2 hover:${
            isDarkMode ? "bg-gray-700" : "bg-blue-700"
          } transition-all duration-700 rounded-lg`}
        >
          <FaTools fontSize={20} className="mr-2" />
          Customizer tools
          <svg
            className={`${
              isDropdownOpen ? "transform rotate-180" : ""
            } inline-block ml-[2px] w-[12px] h-4`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className={`absolute right-0 mt-2 py-2 ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
            } rounded shadow-lg w-40`}
            style={{ zIndex: 100 }}
          >
            <Link
              href="/customizer/box-shadow-generator"
              className={`block px-4 py-2 hover:${
                isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200"
              }`}
            >
              Box Shadow Generator
            </Link>
            <hr />
            <Link
              href="/customizer/gradient-generator"
              className={`block px-4 py-2 hover:${
                isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200"
              }`}
            >
              CSS Gradient Generator
            </Link>
            <hr />
            <Link
              href="/customizer/button"
              className={`block px-4 py-2 hover:${
                isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200"
              }`}
            >
              Buttons
            </Link>
            <hr />
            <Link
              href="/customizer/LoremIpsumGenerator"
              className={`block px-4 py-2 hover:${
                isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200"
              }`}
            >
              Lorem Ipsum Generator
            </Link>
            <hr />
            <Link
              href="/customizer/CupcakeIpsumGenerator"
              className={`block px-4 py-2 hover:${
                isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200"
              }`}
            >
              Cupcake Ipsum Generator
            </Link>
            <hr />
            <Link
              href="/customizer/conversionCalculator"
              className={`block px-4 py-2 hover:${
                isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200"
              }`}
            >
              Conversion Calculator
            </Link>
            <hr />
            <Link
              href="/customizer/colorPicker"
              className={`block px-4 py-2 hover:${
                isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200"
              }`}
            >
              Color picker
            </Link>
            <hr />
            <Link
              href="/customizer/JsonGenerator"
              className={`block px-4 py-2 hover:${
                isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200"
              }`}
            >
              Json Generator
            </Link>
            <hr />

            <Link
              href="/customizer/Readme-generator"
              className={`block px-4 py-2 hover:${
                isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200"
              }`}
            >
              Readme Generator
            </Link>
          </div>
        )}
      </div>

      <div className="flex ml-1 justify-center gap-2 md:gap-4 items-center lg:flex">
        <Link
          href="/codeedit"
          className={`text-[0.57rem] font-bold sm:text-sm p-2 hover:${
            isDarkMode ? "bg-gray-700" : "bg-blue-700"
          } transition-all duration-700 rounded-lg`}
        >
          <p className="flex items-center justify-center gap-2">
            <FaCode fontSize={20} />
            Code Editor
          </p>
        </Link>
        <Link
          href="/MD"
          className={`text-[0.57rem] font-bold sm:text-sm p-2 hover:${
            isDarkMode ? "bg-gray-700" : "bg-blue-700"
          } transition-all duration-700 rounded-lg`}
        >
          <p className="flex items-center justify-center gap-2">
            <FaMarkdown fontSize={20} />
            Markdown Editor
          </p>
        </Link>
        <Link
          href="/about"
          className={`font-bold text-[0.6rem] sm:text-sm p-2 hover:${
            isDarkMode ? "bg-gray-700" : "bg-blue-700"
          } transition-all duration-700 rounded-lg flex items-center justify-center gap-2`}
        >
          <FaInfo fontSize={15} />
          About
        </Link>
        <Link
          href="/contribute"
          className={`font-bold text-[0.6rem] sm:text-sm p-2 hover:${
            isDarkMode ? "bg-gray-700" : "bg-blue-700"
          } transition-all duration-700 rounded-lg flex items-center justify-center gap-2`}
        >
          <IoMdGitPullRequest fontSize={20} />
          Contribute
        </Link>
        <button onClick={searchToggle} className="lg:hidden">
          <SearchIcon className="text-white" />
        </button>
        <div
          className={`absolute w-full h-full flex items-center bg-blue-500 ${
            toggle
              ? "left-0 duration-300 ease-in"
              : "left-[100%] duration-300 ease-in"
          }`}
        >
          <div className="flex flex-1 items-center text-white justify-center relative">
            <Search />
          </div>
        </div>
      </div>
      <div
        className="flex flex-col gap-2 lg:hidden cursor-pointer"
        onClick={togglePanel}
      >
        <span className="w-8 h-0.5 bg-white"></span>
        <span className="w-8 h-0.5 bg-white"></span>
        <span className="w-8 h-0.5 bg-white"></span>
      </div>

      <HamburgerMenu open={open} togglePanel={togglePanel} />

      <div className="flex items-center">
        <button
          onClick={handleToggleTheme}
          className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-200 transition-colors duration-200"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <SunIcon className="text-white" />
          ) : (
            <MoonIcon className="text-black" />
          )}
        </button>
      </div>
    </nav>
  );
}
