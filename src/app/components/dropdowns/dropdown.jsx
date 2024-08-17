import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const Dropdown = ({ tools, isDarkMode }) => {
  const ref = useRef();
  const [height, setHeight] = useState(null);

  useEffect(() => {
    setHeight(ref?.current?.offsetHeight);
  }, [ref.current]);

  // console.log(height);

  return (
    <div
      className={`absolute max-h-[66vh] scrollbar h-auto right-0 mt-2 ${height >= 490 ? "overflow-y-scroll" : "overflow-hidden"}  ${
        isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
      } rounded shadow-lg w-40`}
      style={{ zIndex: 100 }}
      ref={ref}
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
