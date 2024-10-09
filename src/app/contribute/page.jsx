"use client";

import React, { useState, useEffect } from "react";
import Nav from "../../components/nav";
import Footer from "../../components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function ContributePage() {
  const [contributors, setContributors] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to fetch data with caching
  const fetchData = async () => {
    const cacheKey = "github_contributors";
    const cacheExpiration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Retrieve cached data
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

    const now = new Date().getTime();

    if (
      cachedData &&
      cacheTimestamp &&
      now - cacheTimestamp < cacheExpiration
    ) {
      // Use cached data if available and not expired
      setContributors(JSON.parse(cachedData));
    } else {
      // Fetch new data and update cache
      try {
        const response = await fetch(
          "https://api.github.com/repos/bashamega/webdevtools/contributors",
        );
        const data = await response.json();
        setContributors(data);

        // Store data and timestamp in local storage
        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(`${cacheKey}_timestamp`, now.toString());
      } catch (error) {
        console.error("Error fetching contributors:", error);
      }
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
    <main
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Nav isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="flex justify-center flex-col items-center w-full">
        <div
          className={`my-9 max-w-[26rem] md:max-w-[40rem] break-words block py-6 md:p-6 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          } border border-gray-200 rounded-lg shadow`}
        >
          <h5 className="mb-2 text-3xl font-bold text-center">Contributors</h5>
          <div className="flex justify-center items-center">
            <div className="grid gap-2 grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {contributors && contributors.length > 0 ? (
                contributors
                  .filter((contributor) => contributor.type === "User")
                  .map((item, index) => (
                    <div
                      key={index}
                      className={`${
                        isDarkMode
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-black"
                      } rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-card-shadow transition-all duration-500 ease-in`}
                    >
                      <Link
                        href={item.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center flex-col hover:scale-105 transition-all duration-500 ease"
                      >
                        <Image
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
        <div
          className={`p-4 mb-24 text-center max-w-[26rem] md:max-w-[40rem] ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          } border border-gray-200 rounded-lg shadow sm:p-8`}
        >
          <h5
            className={`mb-2 text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            Want to contribute?
          </h5>
          <p
            className={`mb-5 text-base sm:text-lg ${isDarkMode ? "text-white" : "text-black"}`}
          >
            Visit the Github repo, make sure to follow the guidelines and
            contribute!
          </p>
          <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <Link
              href="https://github.com/Bashamega/WebDevTools"
              className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 hover:shadow-card-shadow transition-all duration-500 ease-in"
            >
              {/* SVG and other content remains unchanged */}
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
