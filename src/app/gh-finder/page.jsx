"use client";
import { useState } from "react";
import { NavBar } from "../components/navbar";
export default function GhFinder() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selected, setSelected] = useState(1)
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div
      className={`${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-500"} min-h-screen`}
    >
      <NavBar
        title={"GitHub Issue Finder"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div className=" mt-10 flex w-screen justify-center">
        <header className=" lg:w-2/3">
          <h1 className="relative z-10 font-sans text-lg font-bold text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600">
            Github Issue Finder
          </h1>
          <div className=" flex justify-between w-full lg:w-1/2 lg:mx-[25%] my-5">
            <button className={"hover:bg-blue-800 transition-colors min-w-1/3 duration-100 p-5 rounded-full hover:text-white " + (selected == 1&& "bg-blue-600  text-white")} onClick={()=>setSelected(1)}>Web Dev Tools Issues</button>
            <button className={"hover:bg-blue-800 transition-colors w-1/3 duration-100 p-5 rounded-full hover:text-white " + (selected == 2&& "bg-blue-600  text-white")} onClick={()=>setSelected(2)}>Github</button>
          </div>
        </header>
      </div>
    </div>
  );
}
