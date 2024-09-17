"use client";

import { useEffect } from "react";
import { FaGithub, FaHome } from "react-icons/fa";
import Link from "next/link";

const Footer = ({ isDarkMode }) => {
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <footer
      className={`w-[26rem] md:w-[40rem] max-w-full rounded-lg shadow-md m-4 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } fixed bottom-0`}
    >
      <div className="w-full mx-auto max-w-screen-xl p-4 flex justify-center flex-col items-center md:flex-row md:justify-between">
        <span
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          } sm:text-center`}
        >
          © {new Date().getFullYear()}{" "}
          <Link href="/" className="hover:underline">
            WebDevTools
          </Link>
          . All Rights Reserved.
        </span>{" "}
        <ul
          className={`flex flex-wrap items-center mt-3 text-sm font-medium ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          } sm:mt-0`}
        >
          <li>
            <Link
              href="/"
              className={`mr-4 hover:underline md:mr-6 flex items-center justify-center gap-2 ${
                isDarkMode ? "text-gray-300" : "text-black"
              }`}
            >
              <FaHome />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/Bashamega/WebDevTools"
              className={`hover:underline flex items-center justify-center gap-2 ${
                isDarkMode ? "text-gray-300" : "text-black"
              }`}
            >
              <FaGithub />
              Repository
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
