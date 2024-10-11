"use client";
import React, { useState } from "react";
import { NavBar } from "@/components/navbar";
import CardForm from "./components/CardForm";
import Heroish from "./components/Heroish";
import { Nav } from "@/components/nav";

function JsonGeneratorMain() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <main
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"
      } min-h-screen`}
    >
      <NavBar
        title={"Json Generator"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <Heroish />
      <div className="flex justify-center">
        <CardForm isDarkMode={isDarkMode} />
      </div>
    </main>
  );
}

export default JsonGeneratorMain;
