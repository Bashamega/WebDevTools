

import { useState, useEffect, useRef } from 'react';

export default function Search() {
  const [searchVal, setSearchVal] = useState(''); // State to store the value of search input
  const [searchResults, setSearchResults] = useState([]); // State to store the filtered search results
  const [showDropdown, setShowDropdown] = useState(false); // State to control the visibility of the dropdown
  const inputRef = useRef(null); // Reference to the input element
  const dropdownRef = useRef(null); // Reference to the dropdown list element

  useEffect(() => {
    // Event listener to handle outside clicks and close the dropdown
    const handleOutsideClick = event => {
      // Check if the click occurred outside the input and dropdown list
      if (
        inputRef.current && !inputRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false); // Close the dropdown
      }
    };

    document.addEventListener('mousedown', handleOutsideClick); // Attach the event listener for outside click detection

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick); // Cleanup by removing the event listener
    };
  }, []);

  useEffect(() => {
    const jsonData = [ // Simulated JSON data
      { id: 1, name: 'Cake' },
      { id: 2, name: 'Banana' },
      { id: 3, name: 'Cat' },
      { id: 4, name: 'Sky' },
      { id: 6, name: 'Coffee' },
      { id: 7, name: 'Bread' },
      { id: 8, name: 'Beach' },
    ];

    const filteredData = jsonData.filter(item =>
      item.name.toLowerCase().includes(searchVal.toLowerCase()) // Filter the JSON data based on the search value
    );

    setSearchResults(filteredData); // Update the filtered search results
    setShowDropdown(searchVal !== '' && filteredData.length > 0); // Show the dropdown if search value is not empty and there are filtered results
  }, [searchVal]);

  const handleInputChange = event => {
    setSearchVal(event.target.value); // Update the search value when the input changes
  };

  useEffect(() => {
    if (inputRef.current && dropdownRef.current) {
      dropdownRef.current.style.width = `${inputRef.current.offsetWidth}px`; // Set the width of the dropdown to match the width of the input
    }
  }, [showDropdown]);

  return (
    <div>
      <div ref={inputRef}>
        <input
          type="search"
          placeholder="Search .."
          className="grow mx-4 text-black py-1 px-3 outline-none w-full"
          value={searchVal}
          onChange={handleInputChange}
        />
      </div>
      {showDropdown && (
        <ul ref={dropdownRef} className="bg-white border border-gray-300 ml-4 shadow absolute z-10">
        
          {searchResults.map(item => (
            <li
              key={item.id}
              className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
            >
              {item.name} 
            </li> 
          ))}
        </ul>
      )}
    </div>
  );
}

