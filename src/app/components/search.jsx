// import { useState, useEffect, useRef } from "react";
// import { FaSearch } from "react-icons/fa";
// import toolList from "@/db/tools.json";
// export default function Search() {
//   const [searchValue, setSearchValue] = useState(""); // State to store the value of search input
//   const [searchResults, setSearchResults] = useState([]); // State to store the filtered search results
//   const [showDropdown, setShowDropdown] = useState(false); // State to control the visibility of the dropdown
//   const inputRef = useRef(null); // Reference to the input element
//   const dropdownRef = useRef(null); // Reference to the dropdown list element

//   useEffect(() => {
//     // Event listener to handle outside clicks and close the dropdown
//     const handleOutsideClick = (event) => {
//       // Check if the click occurred outside the input and dropdown list
//       if (
//         inputRef.current &&
//         !inputRef.current.contains(event.target) &&
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target)
//       ) {
//         setShowDropdown(false); // Close the dropdown
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick); // Attach the event listener for outside click detection

//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick); // Cleanup by removing the event listener
//     };
//   }, []);

//   useEffect(() => {
//     const filteredData = toolList.filter(
//       (item) => item.name.toLowerCase().includes(searchValue.toLowerCase()), // Filter the JSON data based on the search value
//     );
//     setSearchResults(filteredData); // Update the filtered search results
//     setShowDropdown(searchValue !== "" && filteredData.length > 0); // Show the dropdown if search value is not empty and there are filtered results
//   }, [searchValue]);
//   const handleInputChange = (event) => {
//     setSearchValue(event.target.value); // Update the search value when the input changes
//   };

//   useEffect(() => {
//     if (inputRef.current && dropdownRef.current) {
//       dropdownRef.current.style.width = `${inputRef.current.offsetWidth}px`; // Set the width of the dropdown to match the width of the input
//     }
//   }, [showDropdown]);

//   return (
//     <div>
//       <div
//         ref={inputRef}
//         className="flex items-center justify-center w-full rounded p-1 px-2   dark:bg-gray-700 border-gray-300 dark:border-gray-600"
//       >
//         <FaSearch className="" />
//         <input
//           value={searchValue}
//           onChange={handleInputChange}
//           type="search"
//           id="search"
//           class="grow bg-gray-50 border outline-none border-none  dark:bg-gray-700 text-gray-900 text-sm block w-full p-1.5 px-2   dark:placeholder-gray-400 dark:text-white"
//           placeholder="Search"
//           required
//         />
//       </div>
//       {showDropdown && (
//         <ul
//           ref={dropdownRef}
//           className="bg-white border border-gray-300 shadow absolute  rounded-sm z-10"
//         >
//           {searchResults.map((item) => (
//             <Link href={item.link}>
//               <li
//                 key={item.id}
//                 className="px-2 py-2 text-black hover:bg-gray-100 cursor-pointer flex gap-[10px] border-b border-slate-500"
//               >
//                 <span className="flex items-center justify-between text-slate-700">
//                   <FaSearch />
//                 </span>
//                 {item.name}
//               </li>
//             </Link>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }



// import { useState, useEffect, useRef } from "react";
// import { FaSearch } from "react-icons/fa";
// import Link from "next/link";
// import toolList from "@/db/tools.json";

// export default function Search({ isDarkMode, toggleTheme }) {
//   const [searchValue, setSearchValue] = useState(""); // State to store the value of search input
//   const [searchResults, setSearchResults] = useState([]); // State to store the filtered search results
//   const [showDropdown, setShowDropdown] = useState(false); // State to control the visibility of the dropdown
//   const inputRef = useRef(null); // Reference to the input element
//   const dropdownRef = useRef(null); // Reference to the dropdown list element

//   useEffect(() => {
//     // Event listener to handle outside clicks and close the dropdown
//     const handleOutsideClick = (event) => {
//       // Check if the click occurred outside the input and dropdown list
//       if (
//         inputRef.current &&
//         !inputRef.current.contains(event.target) &&
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target)
//       ) {
//         setShowDropdown(false); // Close the dropdown
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick); // Attach the event listener for outside click detection

//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick); // Cleanup by removing the event listener
//     };
//   }, []);

//   useEffect(() => {
//     const filteredData = toolList.filter((item) =>
//       item.name.toLowerCase().includes(searchValue.toLowerCase()) // Filter the JSON data based on the search value
//     );
//     setSearchResults(filteredData); // Update the filtered search results
//     setShowDropdown(searchValue !== "" && filteredData.length > 0); // Show the dropdown if search value is not empty and there are filtered results
//   }, [searchValue]);

//   const handleInputChange = (event) => {
//     setSearchValue(event.target.value); // Update the search value when the input changes
//   };

//   useEffect(() => {
//     if (inputRef.current && dropdownRef.current) {
//       dropdownRef.current.style.width = `${inputRef.current.offsetWidth}px`; // Set the width of the dropdown to match the width of the input
//     }
//   }, [showDropdown]);

//   return (
//     <div>
//       <div
//         ref={inputRef}
//         className={`flex items-center justify-center w-full rounded p-1 px-2 ${isDarkMode ? "dark:bg-gray-700 border-gray-300 dark:border-gray-600" : "bg-gray-50 border-gray-300"} `}
//       >
//         <FaSearch className={`${isDarkMode ? "text-white" : "text-gray-900"}`} />
//         <input
//           value={searchValue}
//           onChange={handleInputChange}
//           type="search"
//           id="search"
//           className={`grow border outline-none border-none ${isDarkMode ? "dark:bg-gray-700 text-white dark:placeholder-gray-400" : "bg-gray-50 text-gray-900"}`}
//           placeholder="Search"
//           required
//         />
//       </div>
//       {showDropdown && (
//         <ul
//           ref={dropdownRef}
//           className={`absolute z-10 rounded-sm shadow ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
//         >
//           {searchResults.map((item) => (
//             <Link href={item.link} key={item.id}>
//               <li
//                 className={`px-2 py-2 hover:bg-gray-100 cursor-pointer flex gap-[10px] border-b ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
//               >
//                 <span className="flex items-center justify-between">
//                   <FaSearch />
//                 </span>
//                 {item.name}
//               </li>
//             </Link>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }



import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import toolList from "@/db/tools.json";

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
    const filteredData = toolList.filter(
      (item) => item.name.toLowerCase().includes(searchValue.toLowerCase()) // Filter the JSON data based on the search value
    );
    setSearchResults(filteredData); // Update the filtered search results
    setShowDropdown(searchValue !== "" && filteredData.length > 0); // Show the dropdown if search value is not empty and there are filtered results
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
    <div>
      <div
        ref={inputRef}
        className={`flex items-center justify-center w-full rounded p-1 px-2 ${isDarkMode ? "dark:bg-gray-700" : "bg-white"} border-gray-300 dark:border-gray-600`}
      >
        <FaSearch />
        <input
          value={searchValue}
          onChange={handleInputChange}
          type="search"
          id="search"
          className={`grow border outline-none border-none ${isDarkMode ? "dark:bg-gray-700 dark:text-white" : "bg-gray-50 text-gray-900"} text-sm block w-full p-1.5 px-2`}
          placeholder="Search"
          required
        />
      </div>
      {showDropdown && (
        <ul
          ref={dropdownRef}
          className={`absolute z-10 bg-white border border-gray-300 shadow rounded-sm ${isDarkMode ? "dark:bg-gray-700 dark:text-white" : "bg-white text-black"}`}
        >
          {searchResults.map((item) => (
            <Link key={item.id} href={item.link}>
              <li className={`px-2 py-2 hover:bg-gray-100 cursor-pointer flex gap-[10px] border-b border-slate-500 ${isDarkMode ? "dark:text-white" : "text-black"}`}>
                <span className="flex items-center justify-between text-slate-700">
                  <FaSearch />
                </span>
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
