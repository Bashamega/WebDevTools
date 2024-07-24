import React from "react";
import Link from "next/link";

const Dropdown = ({ tools, isDarkMode }) => {
  return (
    <div
      className={`absolute right-0 mt-2 overflow-hidden ${
        isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
      } rounded shadow-lg w-40`}
      style={{ zIndex: 100 }}
    >
      {tools.map((tool, index) => (
        <React.Fragment key={tool.id}>
          <Link
            href={tool.link}
            className={`block px-4 py-2 hover:${
              isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200"
            }`}
          >
            {tool.name}
          </Link>
          {index < tools.length - 1 && <hr />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Dropdown;
