"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Preview from "./Preview";
import { NavBar } from "../../components/navbar";
import ResumeForm from "./ResumeForm";

const ResumePDFDownloadLink = dynamic(() => import("./ResumePDF"), {
  ssr: false,
});

const Home = () => {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: "",
    imageShape: "circle",
    workExperience: [{ title: "", company: "", description: "" }],
    projects: [{ title: "", liveUrl: "", description: "" }],
    education: [{ degree: "", institution: "", description: "" }],
    skills: [
      { category: "frontend", skills: [""] },
      { category: "backend", skills: [""] },
      { category: "languages", skills: [""] },
      { category: "other", skills: [""] },
    ],
    links: { linkedin: "", website: "", github: "" },
    achievements: [{ title: "", description: "" }],

    template: "template1",
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleFormChange = (updatedData) => {
    setResumeData((prevFormData) => ({
      ...prevFormData,
      ...updatedData,
    }));
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
        <div className="w-full mt-8 ">
          <ResumeForm isDarkMode={isDarkMode} onFormChange={handleFormChange} />
          {resumeData && <Preview isDarkMode={isDarkMode} data={resumeData} />}
          {resumeData && <ResumePDFDownloadLink data={resumeData} />}
        </div>
      </div>
    </main>
  );
};

export default Home;
