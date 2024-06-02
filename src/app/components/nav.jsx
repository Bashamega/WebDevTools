import React, { useState, useRef, useEffect } from "react";
import Search from "./search";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FaCode, FaInfo, FaMarkdown, FaTools } from "react-icons/fa";
import { IoMdGitPullRequest } from "react-icons/io";

export default function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
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

  return (
    <nav className="bg-blue-500 py-2 px-4 flex items-center justify-around gap-1 w-full relative">
      <div className="flex flex-0 items-center flex-shrink">
        <a
          href="/"
          className="flex items-center border rounded p-2 hover:bg-blue-600 mr-2"
        >
          <h1 className="text-white text-lg md:text-2xl font-bold mr-2">
            Web Dev Tools
          </h1>
        </a>
        &emsp;
        <div className="hidden lg:block mr-2">
          <Search />
        </div>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="text-white focus:outline-none text-[0.58rem] font-bold sm:font-bold items-center sm:text-sm flex md:text-sm  flex-1 p-2 hover:bg-blue-700 transition-all duration-700 rounded-lg"
        >
          <FaTools fontSize={20} className="mr-2" />
          Customizer tools
          <svg
            className={`${isDropdownOpen ? "transform rotate-180" : ""
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
            className="absolute right-0 mt-2 py-2 bg-white rounded shadow-lg w-40"
            style={{ zIndex: 100 }}
          >
            <a
              href="customizer/box-shadow-generator"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Box Shadow Generator
            </a>
            <a
              href="customizer/gradient-generator"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              CSS Gradient Generator
            </a>
            <hr />
            <a
              href="customizer/button"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Buttons
            </a>
            <hr />
            <a
              href="customizer/LoremIpsumGenerator"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Lorem Ipsum Generator
            </a>
            <a
              href="customizer/CupcakeIpsumGenerator"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Cupcake Ipsum Generator
            </a>
            <a
              href="customizer/conversionCalculator"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Conversion Calculator
            </a>
            <a
              href="customizer/colorPicker"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Color picker
            </a>
          </div>
        )}
      </div>

      <div className="flex ml-1 justify-center gap-2  md:gap-4 items-center">
        <a
          href="/codeedit"
          className="text-white  text-[0.57rem] font-bold  sm:text-sm p-2 hover:bg-blue-700 transition-all duration-700 rounded-lg"
        >
          <p className="flex items-center justify-center gap-2">
            <FaCode fontSize={20} />
            Code Editor
          </p>
        </a>
        <a
          href="/MD"
          className="text-white  text-[0.57rem] font-bold  sm:text-sm p-2 hover:bg-blue-700 transition-all duration-700 rounded-lg"
        >
          <p className="flex items-center justify-center gap-2">
            {" "}
            <FaMarkdown fontSize={20} />
            Markdown Editor
          </p>
        </a>
        <a
          href="/about"
          className="text-white font-bold text-[0.6rem]  sm:text-sm p-2 hover:bg-blue-700 transition-all duration-700 rounded-lg flex items-center justify-center gap-2"
        >
          <FaInfo fontSize={15} />
          About
        </a>
        <a
          href="/contribute"
          className="text-white font-bold text-[0.6rem]  sm:text-sm  p-2 hover:bg-blue-700 transition-all duration-700 rounded-lg flex items-center justify-center gap-2"
        >
          <IoMdGitPullRequest fontSize={20} />
          Contribute
        </a>
        <button onClick={searchToggle} className="lg:hidden">
          <SearchIcon className="text-white" onClick={searchToggle} />
        </button>
        <div
          className={`absolute w-full h-full flex  items-center  bg-blue-500 ${toggle
              ? "left-0 duration-300 ease-in"
              : "left-[100%] duration-300 ease-in"
            } `}
        >
          <div className="flex flex-1 items-center text-white justify-center relative">
            <ArrowBackIcon
              className="mr-4 absolute left-2 cursor-pointer"
              onClick={searchToggle}
            />
            <Search />
          </div>
        </div>
      </div>
    </nav>
  );
}
