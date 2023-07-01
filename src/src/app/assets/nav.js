import React, { useState } from 'react';
import Search from './search';

export default function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-blue-500 py-2 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-white text-2xl font-bold">Web Dev Tools</div>
        <Search />
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="text-white focus:outline-none"
        >
          Customizer tools
          <svg
            className={`${
              isDropdownOpen ? 'transform rotate-180' : ''
            } inline-block ml-1 w-4 h-4`}
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
          <div className="absolute right-0 mt-2 py-2 bg-white rounded shadow-lg">
            <a
              href="customizer/button"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Buttons
            </a>
            <a
              href="customizer/ReadMeGenerator"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Read Me Generator
            </a>
            <hr></hr>
            <a
              href="customizer/LoremIpsumGenerator"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Lorem Ipsum Generator
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

      <div className="ml-4">
        <a href="/codeedit" className="text-white mx-2">
          Code Editor
        </a>
        <a href="#about" className="text-white mx-2">
          About
        </a>
        <a href="#contribute" className="text-white mx-2">
          Contribute
        </a>
      </div>
    </nav>
  );
}
