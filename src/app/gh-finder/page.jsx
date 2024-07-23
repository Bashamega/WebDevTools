"use client";
import { useEffect, useState } from "react";
import { NavBar } from "../components/navbar";
import Link from "next/link";
import Image from "next/image";

export default function GhFinder() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selected, setSelected] = useState(1);
  const [data, setData] = useState();
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  useEffect(() => {
    setData(undefined);
    const url =
      selected == 1
        ? "https://api.github.com/repos/bashamega/webdevtools/issues"
        : "https://api.github.com/search/issues?q=state:open+is:issue";
    fetch(url)
      .then((res) => res.json())
      .then((d) =>
        selected == 1
          ? setData(d.filter((item) => !item.node_id.includes("PR_")))
          : setData(d.items),
      )
      .catch((error) => console.error("Error fetching data:", error));
  }, [selected]);
  function isDarkColor(color) {
    // Convert the color to RGB
    const hexColor = color.replace("#", "");
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);

    // Calculate the luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return true if luminance is less than 0.5 (considered dark)
    return luminance < 0.5;
  }
  return (
    <div
      className={`${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-500"} min-h-screen w-full pb-2`}
    >
      <NavBar
        title={"GitHub Issue Finder"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div className=" mt-10 flex w-screen justify-center">
        <header className=" lg:w-2/3">
          <h1 className="relative z-10 font-sans text-xl sm:text-4xl font-bold text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600">
            Github Issue Finder
          </h1>
          <div className=" flex justify-between w-full lg:w-1/2 lg:mx-[25%] my-5">
            <button
              className={
                "hover:bg-blue-800 transition-colors min-w-1/3 duration-100 p-5 rounded-full hover:text-white " +
                (selected == 1 && "bg-blue-600  text-white")
              }
              onClick={() => setSelected(1)}
            >
              Web Dev Tools Issues
            </button>
            <button
              className={
                "hover:bg-blue-800 transition-colors w-1/3 duration-100 p-5 rounded-full hover:text-white " +
                (selected == 2 && "bg-blue-600  text-white")
              }
              onClick={() => setSelected(2)}
            >
              Github
            </button>
          </div>
        </header>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-11/12 md:w-8/12 xl:w-1/2">
          {data ? (
            data.map((item, index) => (
              <div
                key={item.id}
                className="bg-slate-500 rounded p-4 mb-4 flex flex-col md:flex-row w-full"
              >
                <div className="md:w-2/3 overflow-hidden w-full">
                  <Link
                    href={item.html_url}
                    className="text-white font-bold text-3xl hover:underline truncate block"
                  >
                    {item.title}
                  </Link>
                  <Link
                    className=" text-slate-300"
                    href={item.repository_url.replace(
                      "https://api.github.com/repos",
                      "https://github.com",
                    )}
                  >
                    {item.repository_url.replace(
                      "https://api.github.com/repos/",
                      "",
                    )}
                  </Link>

                  <br></br>
                  <div className="flex flex-wrap my-2 items-center w-full gap-2 overflow-auto select-none">
                    {item.labels && item.labels.length > 0 ? (
                      item.labels.map((label) => {
                        const isDark = isDarkColor(label.color);
                        const textColor = isDark
                          ? "text-white"
                          : "text-gray-800";

                        return (
                          <p
                            key={label.id}
                            className={`bg-gray-300 ${textColor} px-2 text-sm py-1 rounded truncate w-[calc(30%)]`}
                            style={{ backgroundColor: `#${label.color}` }}
                          >
                            {label.name}
                          </p>
                        );
                      })
                    ) : (
                      <p className="text-white">No labels</p>
                    )}
                  </div>
                  <div className="flex items-center">
                    <p className="text-white">Created by:</p>
                    <Link
                      href={item.user.html_url}
                      className="flex items-center text-white ml-2"
                    >
                      <Image
                        src={item.user.avatar_url}
                        className="rounded-full w-6 h-6 mr-2"
                        alt="User Avatar"
                        width={0}
                        height={0}
                      />
                      <p className="text-white">{item.user.login}</p>
                    </Link>
                  </div>
                  <div className="text-white w-full">
                    <p>Reactions: </p>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center bg-[#292e36] p-1 rounded-lg">
                        👍 <p className="ml-1">{item.reactions["+1"]}</p>
                      </div>
                      <div className="flex items-center bg-[#292e36] p-1 rounded-lg">
                        👎 <p className="ml-1">{item.reactions["-1"]}</p>
                      </div>
                      <div className="flex items-center bg-[#292e36] p-1 rounded-lg">
                        😄 <p className="ml-1">{item.reactions.laugh}</p>
                      </div>
                      <div className="flex items-center bg-[#292e36] p-1 rounded-lg">
                        🎉 <p className="ml-1">{item.reactions.hooray}</p>
                      </div>
                      <div className="flex items-center bg-[#292e36] p-1 rounded-lg">
                        😕 <p className="ml-1">{item.reactions.confused}</p>
                      </div>
                      <div className="flex items-center bg-[#292e36] p-1 rounded-lg">
                        ❤️ <p className="ml-1">{item.reactions.heart}</p>
                      </div>
                      <div className="flex items-center bg-[#292e36] p-1 rounded-lg">
                        🚀 <p className="ml-1">{item.reactions.rocket}</p>
                      </div>
                      <div className="flex items-center bg-[#292e36] p-1 rounded-lg">
                        👀 <p className="ml-1">{item.reactions.eyes}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3 md:p-5">
                  <div className="text-white flex overflow-hidden mt-1 items-center justify-between">
                    <p>Assignees: </p>
                    {item.assignees.length > 0 ? (
                      <div className="flex -space-x-4">
                        {item.assignees.map((assignee, key) => (
                          <Link href={assignee.html_url} key={key}>
                            <Image
                              alt={assignee.login}
                              src={assignee.avatar_url}
                              className=" rounded-full w-5 h-5 border border-white"
                              width={0}
                              height={0}
                            />
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p>0</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div class="flex items-center justify-center">
              <div class="relative">
                <div
                  className={
                    "h-24 w-24 rounded-full border-t-8 border-b-8 " +
                    (isDarkMode ? "border-gray-900" : "border-gray-100")
                  }
                ></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                <p className=" mt-2 text-center">Loading ...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
