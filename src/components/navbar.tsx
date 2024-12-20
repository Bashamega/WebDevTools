"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SunIcon from "./icons/sunicon";
import MoonIcon from "./icons/moonicon";

interface NavBarProps {
  title: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ title, isDarkMode, toggleTheme }) => {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    try {
      if (storedTheme !== null && JSON.parse(storedTheme) !== isDarkMode) {
        toggleTheme();
      }
    } catch {
      console.log("Failed to read localstorage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleToggleTheme = () => {
    localStorage.setItem("theme", JSON.stringify(!isDarkMode));
    toggleTheme();
  };

  const [isNavFixed, setIsNavFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const banner = document.querySelector("#banner");
      const bannerHeight = banner ? (banner as HTMLElement).offsetHeight : 0;
      if (window.scrollY >= bannerHeight) {
        setIsNavFixed(true);
      } else {
        setIsNavFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`py-4 px-6 flex items-center justify-between ${
        isDarkMode ? "bg-gray-800" : "bg-blue-500"
      } ${isNavFixed ? "fixed top-0 z-40" : "relative"} max-w-100vh w-full fixed top-0 z-50`}
    >
      <span className="flex items-end">
        <Link href="/">
          <h1
            className={`text-lg md:text-2xl font-bold hover:underline mr-2 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Web Dev Tools
          </h1>
        </Link>
        <p
          className={`text-sm pb-1 ${
            isDarkMode ? "text-gray-300" : "text-gray-800"
          }`}
        >
          / {title}
        </p>
      </span>
      <div className="flex items-center">
        <button
          onClick={handleToggleTheme}
          className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-200 transition-colors duration-200"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <SunIcon className="text-white" />
          ) : (
            <MoonIcon className="text-black" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
