import React, { useState } from "react";
import Search from "./search";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  function searchToggle() {
    setToggle((prevData) => setToggle(!prevData));
  }
  return (
    <nav className="bg-blue-500 py-2 px-4 flex items-center justify-around gap-1 w-full relative">
      <div className="flex flex-0 items-center flex-shrink">
        <div className="text-white  text-[0.7rem] font-bold sm:text-lg md:text-2xl sm:font-bold">
          <p>Web Dev Tools</p>
        </div>
        &emsp;
        <div className="hidden lg:block mr-2">
          <Search />
        </div>
      </div>

      <div className="relative ">
        <button
          onClick={toggleDropdown}
          className="text-white focus:outline-none text-[0.58rem] font-bold sm:font-bold items-center sm:text-sm flex md:text-sm  flex-1"
        >
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
          <div className="absolute right-0 mt-2 py-2 bg-white rounded shadow-lg z-75">
            <a
              href="customizer/button"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Buttons
            </a>
            <hr></hr>
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
          </div>
        )}
      </div>

      <div className="flex ml-1 justify-center gap-2  md:gap-4 items-center">
        <a
          href="/codeedit"
          className="text-white  text-[0.57rem] font-bold  sm:text-sm"
        >
          <p>Code Editor</p>
        </a>
        <a
          href="#about"
          className="text-white font-bold text-[0.6rem]  sm:text-sm"
        >
          About
        </a>
        <a
          href="#contribute"
          className="text-white font-bold text-[0.6rem]  sm:text-sm "
        >
          Contribute
        </a>
        <button onClick={searchToggle} className="lg:hidden">
          <SearchIcon className="text-white" onClick={searchToggle} />
        </button>
        <div
          className={`absolute w-full h-full flex  items-center  bg-blue-500 ${
            toggle
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
