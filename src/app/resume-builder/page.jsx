"use client";

import { useState } from "react";
// import Form from "./Form";
import Preview from "./Preview";
import { NavBar } from "../components/navbar";
import ResumePDFDownloadLink from "./ResumePDF";
import ResumeForm from "./Form";

const Home = () => {
  const [resumeData, setResumeData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleFormSubmit = (data) => {
    setResumeData(data);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <main
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-500"
      } min-h-screen w-full pb-2`}
    >
      <NavBar
        title={"Resume Builder"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div className="lg:w-2/3 mx-auto p-4 my-4">
        <h1 className="relative z-10 font-sans text-lg font-bold text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600">
          Resume Builder
        </h1>
        <div className="w-full mt-4 ">
          <ResumeForm isDarkMode={isDarkMode} onSubmit={handleFormSubmit} />
          {resumeData && <Preview isDarkMode={isDarkMode} data={resumeData} />}
          {resumeData && <ResumePDFDownloadLink data={resumeData} />}
        </div>
      </div>
    </main>
  );
};

export default Home;
