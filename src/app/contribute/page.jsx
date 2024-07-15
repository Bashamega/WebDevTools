"use client";
import React, { useState, useEffect } from "react";
import Nav from "../components/nav";
// import { Nav } from "@/app/components/nav";
import Footer from "../components/Footer";
import Link from "next/link";

export default function ContributePage() {
  const [contributors, setContributors] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.github.com/repos/bashamega/webdevtools/contributors"
      );
      const data = await response.json();
      setContributors(data);
    } catch (error) {
      console.error("Error fetching contributors:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <main className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Nav isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="flex justify-center flex-col items-center w-full">
        <div className={`my-9 max-w-[26rem] md:max-w-[40rem] break-words block py-6 md:p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} border border-gray-200 rounded-lg shadow`}>
          <h5 className="mb-2 text-3xl font-bold text-center">
            Contributors
          </h5>
          <div className="flex justify-center items-center">
            <div className="grid gap-2 grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {contributors && contributors.length > 0 ? (
                contributors.map((item, index) => (
                  <div
                    key={index}
                    className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'} rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-card-shadow transition-all duration-500 ease-in`}
                  >
                    <Link
                      href={item.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center flex-col hover:scale-105 transition-all duration-500 ease"
                    >
                      <img
                        src={item.avatar_url}
                        alt={item.login}
                        width={48}
                        height={48}
                        className="w-12 h-12 mr-2 rounded-full self-center"
                      />
                      {item.login}
                    </Link>
                  </div>
                ))
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>
        </div>
        <div className={`p-4 mb-24 text-center max-w-[26rem] md:max-w-[40rem] ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} border border-gray-200 rounded-lg shadow sm:p-8`}>
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            Want to contribute?
          </h5>
          <p className="mb-5 text-base sm:text-lg">
            Visit the Github repo, make sure to follow the guidelines and
            contribute!
          </p>
          <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <Link
              href="https://github.com/Bashamega/WebDevTools"
              className={`w-full sm:w-auto focus:ring-4 focus:outline-none rounded-lg inline-flex items-center justify-center px-4 py-2.5 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white hover:bg-gray-200 text-black'}`}
            >
              <svg
                className="mr-3 w-7 h-7"
                viewBox="0 0 1024 1024"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                  transform="scale(64)"
                  fill="#fff"
                />
              </svg>

              <div className="text-left">
                <div className="mb-1 text-xs">Go to the</div>
                <div className="-mt-1 font-sans text-sm font-semibold">
                  Github Repo
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <Footer isDarkMode={isDarkMode} />
        </div>
      </div>
    </main>
  );
}
