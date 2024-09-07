"use client";
import Nav from "@/app/components/nav";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import apis from "@/db/api.json";
import { Card } from "../components/card";
import { NavBar } from "../components/navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [apiList, setApiList] = useState(apis);
  const [searchValue, setSearchValue] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
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
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    filterApis(e.target.value, selectedTag);
  };
  const handleTagChange = (e) => {
    setSelectedTag(e);
    filterApis(searchValue, e);
  };
  const filterApis = (search, tag) => {
    if (search && tag !== "All") {
      setApiList(
        apis.filter(
          (api) =>
            api.name.toLowerCase().includes(search.toLowerCase()) &&
            api.ctg === tag,
        ),
      );
    } else if (search && tag === "All") {
      setApiList(
        apis.filter((api) =>
          api.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else if (!search && tag !== "All") {
      setApiList(apis.filter((api) => api.ctg === tag));
    } else {
      setApiList(apis);
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
          <div className="flex justify-center mb-5">
            <input
              type="text"
              placeholder="search"
              value={searchValue}
              onChange={handleSearch}
              className={`w-full p-2 mb-5 mr-5 border rounded-lg shadow ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-200 text-black"
              }`}
            />
            <Select
              value={selectedTag}
              onValueChange={handleTagChange}
              className="p-2 border rounded-lg shadow"
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Filter by Tags" />
                {selectedTag == "all" && "All"}
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={"All"} value={"All"}>
                  All
                </SelectItem>
                {Array.from(new Set(apis.map((api) => api.ctg))).map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
