import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import toolList from "@/db/tools.json";
import Link from "next/link";

const CACHE_KEY = "searchResultsCache";

export default function Search({ isDarkMode }) {
  const [searchValue, setSearchValue] = useState(""); // State to store the value of search input
  const [searchResults, setSearchResults] = useState([]); // State to store the filtered search results
  const [showDropdown, setShowDropdown] = useState(false); // State to control the visibility of the dropdown
  const inputRef = useRef(null); // Reference to the input element
  const dropdownRef = useRef(null); // Reference to the dropdown list element

  useEffect(() => {
    // Event listener to handle outside clicks and close the dropdown
    const handleOutsideClick = (event) => {
      // Check if the click occurred outside the input and dropdown list
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleOutsideClick); // Attach the event listener for outside click detection

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // Cleanup by removing the event listener
    };
  }, []);

  useEffect(() => {
    // Check if search results are cached and update state
    const cachedResults = localStorage.getItem(CACHE_KEY);
    if (cachedResults) {
      setSearchResults(JSON.parse(cachedResults));
    }
  }, []);

  useEffect(() => {
    const filteredData = toolList.filter(
      (item) => item.name.toLowerCase().includes(searchValue.toLowerCase()), // Filter the JSON data based on the search value
    );
    setSearchResults(filteredData); // Update the filtered search results
    setShowDropdown(searchValue !== "" && filteredData.length > 0); // Show the dropdown if search value is not empty and there are filtered results

    // Cache the filtered results
    localStorage.setItem(CACHE_KEY, JSON.stringify(filteredData));
  }, [searchValue]);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value); // Update the search value when the input changes
  };

  useEffect(() => {
    if (inputRef.current && dropdownRef.current) {
      dropdownRef.current.style.width = `${inputRef.current.offsetWidth}px`; // Set the width of the dropdown to match the width of the input
    }
  }, [showDropdown]);

  return (
    <div className="relative">
      <div
        ref={inputRef}
        className={`flex items-center w-full rounded p-1 px-2 border ${
          isDarkMode
            ? "bg-gray-700 border-gray-600"
            : "bg-white border-gray-300"
        }`}
      >
        <FaSearch
          className={`mr-2 ${isDarkMode ? "text-gray-400" : "text-gray-800"}`}
        />
        <input
          value={searchValue}
          onChange={handleInputChange}
          type="search"
          id="search"
          className={`grow border outline-none border-none ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
          } text-sm block w-full p-1.5 px-2 dark:placeholder-gray-400`}
          placeholder="Search"
          required
        />
      </div>
      {showDropdown && (
        <ul
          ref={dropdownRef}
          className={`absolute z-10 w-full border border-gray-300 shadow rounded-sm ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
          }`}
        >
          {searchResults.map((item) => (
            <Link key={item.id} href={item.link}>
              <li
                className={`px-2 py-2 hover:bg-gray-100 cursor-pointer flex gap-[10px] border-b ${
                  isDarkMode
                    ? "border-gray-600 text-white"
                    : "border-gray-300 text-black"
                }`}
              >
                <FaSearch className="mr-2" />
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
