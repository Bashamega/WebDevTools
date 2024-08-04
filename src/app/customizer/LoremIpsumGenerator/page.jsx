"use client";

import { useEffect, useState } from "react";
import { NavBar } from "@/app/components/navbar";

export default function ButtonCustomizer() {
  const [lorem, setLorem] = useState(1);
  const [lor, setLor] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    try {
      if (storedTheme !== null && JSON.parse(storedTheme) !== isDarkMode) {
        toggleTheme();
      }
    } catch {
      console.log("Failed to read localstorage");
    }
  }, []);

  const generate = () => {
    let text = "";
    for (let i = 0; i < lorem; i++) {
      text +=
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor orci quis metus ultricies, vitae finibus urna pellentesque. Sed commodo, tortor sed pharetra bibendum, turpis purus gravida orci, nec aliquet mi ligula eu purus. In at elit ex. Quisque ultricies pulvinar purus, at luctus justo lacinia vel. Vestibulum pulvinar lacus eu turpis rutrum, et fermentum sapien rhoncus. Nullam dapibus felis in neque ultricies ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In hac habitasse platea dictumst. Donec efficitur dolor a bibendum vehicula. Curabitur vitae est elit. Integer tempus massa elit, eget euismod nunc pharetra eget. Morbi efficitur metus in viverra finibus. Aliquam sollicitudin pharetra sapien nec bibendum. Etiam congue faucibus malesuada. Nunc vulputate congue vulputate.\n\n";
    }
    setLor(text);
  };

  const copy = () => {
    navigator.clipboard.writeText(lor);
    setLor("Text copied successfully");
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  return (
    <main
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"
      } min-w-80 `}
    >
      <NavBar
        title={"Lorem Ipsum Generator"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <section className="flex flex-col gap-10 items-center justify-center h-screen">
        <h1 className="relative p-2 z-10 font-sans text-xl sm:text-4xl font-bold text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600">
          Lorem Ipsum Generator
        </h1>
        <div
          className={`${
            isDarkMode
              ? "bg-gray-700 text-gray-400"
              : "bg-slate-100 text-gray-500"
          } p-10 w-full max-w-5xl rounded-lg shadow-md overflow-y-scroll max-h-96`}
        >
          <label htmlFor="lorem">Number of paragraphs:</label>
          <br />
          <br />
          <div>
            <input
              type="number"
              id="lorem"
              value={lorem}
              min={1}
              max={10}
              onChange={(e) => setLorem(e.target.value)}
              className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <br />
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={generate}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:outline-none"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Generate
              </span>
            </button>
            &emsp;
            <button
              type="button"
              onClick={copy}
              className="text-gray-900 bg-white hover:bg-gray-200 border border-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition duration-200 ease-in-out dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-600 mr-2 mb-2"
            >
              Copy
            </button>
          </div>
          <br />
          <br />
          {lor}
        </div>
      </section>
    </main>
  );
}
