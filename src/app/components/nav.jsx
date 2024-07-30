"use client";

import React, { useState, useRef, useEffect } from "react";
<<<<<<< HEAD
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
=======
import Link from "next/link";

import { FaTools, FaInfo } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import { IoMdGitPullRequest } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";
import SunIcon from "./icons/sunicon";
import MoonIcon from "./icons/moonicon";

import HamburgerMenu from "./hamburger-menu";
import GeneratorDropdown from "./dropdowns/generators";
import EditorDropdown from "./dropdowns/editors";
import OtherDropdown from "./dropdowns/others";

export default function Nav({ isDarkMode, toggleTheme }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRefs = {
    generator: useRef(null),
    editor: useRef(null),
    other: useRef(null),
  };

  const toggleDropdown = (category) => {
    setIsDropdownOpen((prevState) =>
      prevState === category ? null : category,
    );
  };

  const handleClickOutside = (event) => {
    // Check if the click is outside of all dropdowns
    if (
      !dropdownRefs.generator.current?.contains(event.target) &&
      !dropdownRefs.editor.current?.contains(event.target) &&
      !dropdownRefs.other.current?.contains(event.target)
    ) {
      setIsDropdownOpen(null);
>>>>>>> main
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
<<<<<<< HEAD
=======

>>>>>>> main
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
<<<<<<< HEAD
  const togglePanel = () => {
    setOpen((prev) => !prev);
  };
=======

  const togglePanel = () => {
    setOpen((prev) => !prev);
  };

>>>>>>> main
  const handleToggleTheme = () => {
    localStorage.setItem("theme", !isDarkMode);
    toggleTheme();
  };
<<<<<<< HEAD
=======

>>>>>>> main
  return (
    <nav
      className={`${
        isDarkMode ? "bg-gray-800 text-white" : "bg-blue-500 text-black"
      } py-2 px-4 flex items-center justify-between lg:justify-around gap-1 w-full relative mb-10 max-h-[10vh] min-w-80`}
    >
      <div className="flex flex-0 items-center flex-shrink">
<<<<<<< HEAD
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
=======
        <Link href="/" className="group">
          <h1 className="md:text-lg lg:text-xl font-bold group-hover:underline">
            Web Dev Tools
          </h1>
        </Link>
      </div>

      <div className="flex gap-4">
        <div className="relative hidden lg:block" ref={dropdownRefs.generator}>
          <button
            onClick={() => toggleDropdown("generator")}
            className={`focus:outline-none text-[0.58rem] font-semibold items-center sm:text-sm flex md:text-sm flex-1 p-2 hover:${
              isDarkMode ? "bg-gray-700" : "bg-blue-700"
            } transition-all duration-200 rounded-lg`}
          >
            <FaGears fontSize={20} className="mr-2" />
            Generator Tools
            <svg
              className={`${
                isDropdownOpen === "generator" ? "transform rotate-180" : ""
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

          {isDropdownOpen === "generator" && (
            <GeneratorDropdown isDarkMode={isDarkMode} />
          )}
        </div>

        <div className="relative hidden lg:block" ref={dropdownRefs.editor}>
          <button
            onClick={() => toggleDropdown("editor")}
            className={`focus:outline-none text-[0.58rem] font-semibold items-center sm:text-sm flex md:text-sm flex-1 p-2 hover:${
              isDarkMode ? "bg-gray-700" : "bg-blue-700"
            } transition-all duration-200 rounded-lg`}
          >
            <RiEdit2Fill fontSize={20} className="mr-2" />
            Editor Tools
            <svg
              className={`${
                isDropdownOpen === "editor" ? "transform rotate-180" : ""
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

          {isDropdownOpen === "editor" && (
            <EditorDropdown isDarkMode={isDarkMode} />
          )}
        </div>

        <div className="relative hidden lg:block" ref={dropdownRefs.other}>
          <button
            onClick={() => toggleDropdown("other")}
            className={`focus:outline-none text-[0.58rem] font-semibold items-center sm:text-sm flex md:text-sm flex-1 p-2 hover:${
              isDarkMode ? "bg-gray-700" : "bg-blue-700"
            } transition-all duration-200 rounded-lg`}
          >
            <FaTools fontSize={20} className="mr-2" />
            Other Tools
            <svg
              className={`${
                isDropdownOpen === "other" ? "transform rotate-180" : ""
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

          {isDropdownOpen === "other" && (
            <OtherDropdown isDarkMode={isDarkMode} />
          )}
        </div>
      </div>

      <div className="justify-center hidden md:flex gap-2 md:gap-4 items-center lg:flex">
        <Link
          href="/about"
          className={`font-semibold text-[0.6rem] sm:text-sm p-2 hover:${
            isDarkMode ? "bg-gray-700" : "bg-blue-700"
          } transition-all duration-200 rounded-lg flex items-center justify-center gap-2`}
>>>>>>> main
        >
          <FaInfo fontSize={15} />
          About
        </Link>
        <Link
          href="/contribute"
<<<<<<< HEAD
          className={`font-bold text-[0.6rem] sm:text-sm p-2 hover:${
            isDarkMode ? "bg-gray-700" : "bg-blue-700"
          } transition-all duration-700 rounded-lg flex items-center justify-center gap-2`}
=======
          className={`font-semibold hidden md:flex text-[0.6rem] sm:text-sm p-2 hover:${
            isDarkMode ? "bg-gray-700" : "bg-blue-700"
          } transition-all duration-200 rounded-lg flex items-center justify-center gap-2`}
>>>>>>> main
        >
          <IoMdGitPullRequest fontSize={20} />
          Contribute
        </Link>
<<<<<<< HEAD
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
=======
      </div>

      <div className="flex items-center gap-4">
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

        <div
          className="flex flex-col gap-2 lg:hidden cursor-pointer"
          onClick={togglePanel}
        >
          <span className="w-8 h-0.5 bg-black dark:bg-white"></span>
          <span className="w-8 h-0.5 bg-black dark:bg-white"></span>
          <span className="w-8 h-0.5 bg-black dark:bg-white"></span>
        </div>
        <HamburgerMenu open={open} togglePanel={togglePanel} />
>>>>>>> main
      </div>
    </nav>
  );
}
