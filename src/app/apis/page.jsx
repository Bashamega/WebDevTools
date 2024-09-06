"use client";
import Nav from "@/app/components/nav";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import apis from "@/db/api.json";
import { Card } from "../components/card";
import { NavBar } from "../components/navbar";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [apiList, setapiList] = useState(apis);
  const [searchValue, setSearch] = useState();
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
  const handleSeach = (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      setapiList(
        apis.filter((api) =>
          api.name.toLowerCase().includes(e.target.value.toLowerCase()),
        ),
      );
    } else {
      setapiList(apis);
    }
  };
  return (
    <main
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } min-w-80 min-h-screen `}
    >
      <NavBar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        title={"Public APIS"}
      />
      <div className="flex justify-center flex-col items-center w-full">
        <div
          className={`mr-4 p-5 my-9 mb-28 w-4/5 break-words py-6 md:p-6 rounded-lg shadow-md ${
            isDarkMode
              ? "bg-gray-800 text-white"
              : "bg-white border-gray-200 text-black"
          }`}
        >
          <h1 className="text-center text-3xl pb-2">Popular APIs</h1>
          <input
            type="text"
            placeholder="search"
            value={searchValue}
            onChange={handleSeach}
            className={`w-full p-2 mb-5 border rounded-lg shadow ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-200 text-black"
            }`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {apiList.map((item, index) => (
              <Card
                key={index}
                title={item.name}
                link={item.link}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
          {!apiList.length && (
            <p className="text-center">
              No match for <strong>&quot;{searchValue}&quot;</strong>
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Footer isDarkMode={isDarkMode} />
      </div>
    </main>
  );
}
