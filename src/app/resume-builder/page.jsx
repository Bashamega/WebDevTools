"use client";

import { useState } from "react";
import Form from "./Form";
import Preview from "./Preview";
import { NavBar } from "../components/navbar";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <main
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-500"
      } min-h-screen w-full pb-2`}
    >
      <NavBar
        title={"GitHub Issue Finder"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div className="lg:w-2/3 mx-auto p-4 my-4">
        <h1 className="relative z-10 font-sans text-lg font-bold text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600">
          Resume Builder
        </h1>
        <div className="w-full mt-4">
          <Form onSubmit={handleFormSubmit} />
          {formData && <Preview data={formData} />}
        </div>
      </div>
    </main>
  );
};

export default Home;
