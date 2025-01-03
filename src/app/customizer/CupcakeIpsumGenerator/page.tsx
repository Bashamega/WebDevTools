"use client";

import { useCallback, useEffect, useState } from "react";
import NavBar from "@/components/navbar";

interface ButtonCustomizerProps {
  toggleTheme: () => void;
}

interface ButtonCustomizerProps {
  toggleTheme: () => void;
}

interface NavBarProps {
  title: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function ButtonCustomizer({
  toggleTheme,
}: ButtonCustomizerProps) {
  const [cupcakes, setCupcakes] = useState<number>(1);
  const [cup, setCup] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleToggleTheme = useCallback(() => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  }, [isDarkMode]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    try {
      if (storedTheme !== null && JSON.parse(storedTheme) !== isDarkMode) {
        handleToggleTheme();
      }
    } catch {
      console.log("Failed to read localstorage");
    }
  }, [isDarkMode, handleToggleTheme]);

  const generate = () => {
    let text = "";
    for (let i = 0; i < cupcakes; i++) {
      text +=
        "Cupcake ipsum dolor sit amet donut muffin caramels chocolate cake candy. Sweet jelly beans croissant cotton candy caramels chocolate cake lemon drops. Oat cake jujubes icing toffee sweet jelly beans cake apple pie chupa chups. Cheesecake marshmallow biscuit pastry macaroon bonbon bear claw. Gingerbread chupa chups sweet roll icing pudding. Marshmallow danish oat cake muffin brownie dessert jelly-o. Macaroon brownie candy canes pudding icing. Donut gummies jelly beans cotton candy lemon drops.\n\n";
    }
    setCup(text);
  };

  const copy = () => {
    navigator.clipboard.writeText(cup);
    setCup("Text copied successfully");
  };

  return (
    <main
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"
      }min-w-80 `}
    >
      <NavBar
        title={"Cupcake Ipsum Generator"}
        isDarkMode={isDarkMode}
        toggleTheme={handleToggleTheme}
      />
      <section className="flex flex-col gap-10 items-center justify-center h-screen">
        <h1 className="relative p-2 z-10 font-sans text-xl sm:text-4xl font-bold text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600">
          Cupcake Ipsum Generator
        </h1>
        <div
          className={`${
            isDarkMode
              ? "bg-gray-700 text-gray-400"
              : "bg-slate-100 text-gray-500"
          } p-10 w-full max-w-5xl rounded-lg shadow-md overflow-y-scroll max-h-96`}
        >
          <label htmlFor="cupcakes">Number of cupcakes:</label>
          <br />
          <br />
          <div>
            <input
              type="number"
              id="cupcakes"
              value={cupcakes}
              min={1}
              max={10}
              onChange={(e) => setCupcakes(Number(e.target.value))}
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
          {cup}
        </div>
      </section>
    </main>
  );
}
