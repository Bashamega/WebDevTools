// "use client";

// import { useState } from "react";
// import dynamic from "next/dynamic";
// import Preview from "./Preview";
// import NavBar from "../../components/navbar";
// import ResumeForm from "./ResumeForm";

// const ResumePDFDownloadLink = dynamic(() => import("./ResumePDF"), {
//   ssr: false,
// });

// interface ResumeData {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   image: string;
//   imageShape: string;
//   workExperience: { title: string; company: string; description: string }[];
//   projects: { title: string; liveUrl: string; description: string }[];
//   education: { degree: string; institution: string; description: string }[];
//   skills: {
//     category: string;
//     skills: string[];
//   }[];
//   links: { linkedIn: string; website: string; github: string };
//   achievements: { title: string; description: string }[];
//   template: string;
// }

// const Home: React.FC<ResumeData> = () => {
//   const [resumeData, setResumeData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     image: "",
//     imageShape: "circle",
//     workExperience: [{ title: "", company: "", description: "" }],
//     projects: [{ title: "", liveUrl: "", description: "" }],
//     education: [{ degree: "", institution: "", description: "" }],
//     skills: [
//       { category: "frontend", skills: [""] },
//       { category: "backend", skills: [""] },
//       { category: "languages", skills: [""] },
//       { category: "other", skills: [""] },
//     ],
//     links: { linkedIn: "", website: "", github: "" },
//     achievements: [{ title: "", description: "" }],

//     template: "template1",
//   });

//   const [isDarkMode, setIsDarkMode] = useState(false);

//   interface WorkExperience {
//     title: string;
//     company: string;
//     description: string;
//   }

//   interface Project {
//     title: string;
//     liveUrl: string;
//     description: string;
//   }

//   interface Education {
//     degree: string;
//     institution: string;
//     description: string;
//   }

//   interface Skill {
//     category: string;
//     skills: string[];
//   }

//   interface Links {
//     linkedIn: string;
//     website: string;
//     github: string;
//   }

//   interface Achievement {
//     title: string;
//     description: string;
//   }

//   // interface ResumeData {
//   //   name: string;
//   //   email: string;
//   //   phone: string;
//   //   address: string;
//   //   image: string;
//   //   imageShape: string;
//   //   workExperience: WorkExperience[];
//   //   projects: Project[];
//   //   education: Education[];
//   //   skills: Skill[];
//   //   links: Links;
//   //   achievements: Achievement[];
//   //   template: string;
//   // }

//   const handleFormChange = (updatedData: Partial<ResumeData>) => {
//     setResumeData((prevFormData) => ({
//       ...prevFormData,
//       ...updatedData,
//     }));
//   };

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   return (
//     <main
//       className={`${
//         isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-500"
//       } min-h-screen w-full pb-2`}
//     >
//       <NavBar
//         title={"Resume Builder"}
//         isDarkMode={isDarkMode}
//         toggleTheme={toggleTheme}
//       />
//       <div className="lg:w-2/3 mx-auto p-4 my-4">
//         <h1 className="relative z-10 font-sans text-lg font-bold text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600">
//           Resume Builder
//         </h1>
//         <div className="w-full mt-8 ">
//           <ResumeForm isDarkMode={isDarkMode} onFormChange={handleFormChange} />
//           {resumeData && <Preview isDarkMode={isDarkMode} data={resumeData} />}
//           {resumeData && <ResumePDFDownloadLink data={resumeData} />}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Home;

"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Preview from "./Preview";
import NavBar from "../../components/navbar";
import ResumeForm from "./ResumeForm";

const ResumePDFDownloadLink = dynamic(() => import("./ResumePDF"), {
  ssr: false,
});

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  imageShape: string;
  workExperience: { title: string; company: string; description: string }[];
  projects: { title: string; liveUrl: string; description: string }[];
  education: { degree: string; institution: string; description: string }[];
  skills: {
    category: string;
    skills: string[];
  }[];
  links: { linkedIn: string; website: string; github: string };
  achievements: { title: string; description: string }[];
  template: string;
}

const Home: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
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
    links: { linkedIn: "", website: "", github: "" },
    achievements: [{ title: "", description: "" }],
    template: "template1",
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleFormChange = (updatedData: Partial<ResumeData>) => {
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
