"use client";

import React, { useState } from "react";
import { AddBox } from "@mui/icons-material";

const ResumeForm = ({ onFormChange, isDarkMode }) => {
  const [formData, setFormData] = useState({
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
      { category: "Frontend", skills: [""] },
      { category: "Backend", skills: [""] },
      { category: "Languages", skills: [""] },
      { category: "Tools", skills: [""] },
    ],
    links: { linkedIn: "", website: "", github: "" },
    achievements: [{ title: "", description: "" }],
    template: "template1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    onFormChange({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, index, field, arrayName) => {
    const newArray = [...formData[arrayName]];
    newArray[index][field] = e.target.value;
    setFormData({ ...formData, [arrayName]: newArray });
    onFormChange({ ...formData, [arrayName]: newArray });
  };

  const handleSkillsChange = (e, categoryIndex, skillIndex) => {
    const { value } = e.target;
    const updatedSkills = [...formData.skills];
    updatedSkills[categoryIndex].skills[skillIndex] = value;
    setFormData((prevData) => ({
      ...prevData,
      skills: updatedSkills,
    }));
    onFormChange({ ...formData, skills: updatedSkills });
  };

  const handleLinksChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, links: { ...formData.links, [name]: value } });
    onFormChange({ ...formData, links: { ...formData.links, [name]: value } });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
      onFormChange({ ...formData, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        { title: "", company: "", description: "" },
      ],
    });
  };

  const addProjects = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { title: "", liveUrl: "", description: "" },
      ],
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { degree: "", institution: "", description: "" },
      ],
    });
  };

  // const addSkill = () => {
  //   setFormData({
  //     ...formData,
  //     skills: [
  //       ...formData.skills,
  //       { category: "Frontend", skills: [""] },
  //       { category: "Backend", skills: [""] },
  //       { category: "Programming Languages", skills: [""] },
  //       { category: "Tools", skills: [""] },
  //     ],
  //   });
  // };

  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, { title: "", description: "" }],
    });
  };

  return (
    <form className="w-full space-y-8 ">
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Personal Info</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h4
              className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
            >
              Your Name
            </h4>
            <input
              className={`${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border border-slate-500"
              } w-full py-3 px-4 outline-none rounded-md shadow-sm`}
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <h4
              className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
            >
              Email Address
            </h4>

            <input
              className={`${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border border-slate-500"
              } w-full py-3 px-4 outline-none rounded-md shadow-sm`}
              type="email"
              name="email"
              placeholder="johnd@princess.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <h4
              className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
            >
              Phone Number
            </h4>

            <input
              className={`${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border border-slate-500"
              } w-full py-3 px-4 outline-none rounded-md shadow-sm`}
              type="tel"
              name="phone"
              placeholder="9839475294"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h4
              className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
            >
              LinkedIn Profile
            </h4>

            <input
              className={`${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border border-slate-500"
              } w-full py-3 px-4 outline-none rounded-md shadow-sm`}
              type="url"
              name="linkedIn"
              placeholder="https://www.linkedin.com/in/johndev/"
              value={formData.links.linkedIn}
              onChange={handleLinksChange}
            />
          </div>

          <div>
            <h4
              className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
            >
              Personal Website
            </h4>
            <input
              className={`${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border border-slate-500"
              } w-full py-3 px-4 outline-none rounded-md shadow-sm`}
              type="url"
              name="website"
              placeholder="https://www.johndoe.dev"
              value={formData.links.website}
              onChange={handleLinksChange}
            />
          </div>

          <div>
            <h4
              className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
            >
              Github Account
            </h4>

            <input
              className={`${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border border-slate-500"
              } w-full py-3 px-4 outline-none rounded-md shadow-sm`}
              type="url"
              name="github"
              placeholder="https://www.github.com/johndev"
              value={formData.links.github}
              onChange={handleLinksChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h4
              className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
            >
              Your Address
            </h4>
            <input
              className={`${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border border-slate-500"
              } w-full py-3 px-4 outline-none rounded-md shadow-sm`}
              type="text"
              name="address"
              placeholder="5th street, clock tower, New York"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div>
            <h4
              className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
            >
              Profile Picture
            </h4>

            <input
              className={`${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border border-slate-500"
              } w-full py-3 px-4 outline-none rounded-md shadow-sm ${
                formData.template === "template2"
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              type="file"
              name="image"
              placeholder="Upload your profile picture"
              accept="image/*"
              onChange={handlePhotoChange}
              disabled={formData.template === "template2"}
            />
          </div>
        </div>
      </div>

      {/* Sections for Work Experience */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Work Experience</h3>
        {formData.workExperience.map((job, index) => (
          <div key={index} className="grid grid-cols-3 gap-6 items-start mb-4">
            <div>
              <h4
                className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
              >
                Work Title
              </h4>
              <input
                className={`${
                  isDarkMode
                    ? "bg-slate-800 text-slate-50 border-none"
                    : "bg-slate-50 text-slate-800 border border-slate-500"
                } w-full py-3 px-4 outline-none rounded-md shadow-sm`}
                type="text"
                name="title"
                placeholder="Software Engineer"
                value={job.title}
                onChange={(e) =>
                  handleArrayChange(e, index, "title", "workExperience")
                }
              />
            </div>

            <div>
              <h4
                className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
              >
                Company Name
              </h4>
              <input
                className={`${
                  isDarkMode
                    ? "bg-slate-800 text-slate-50 border-none"
                    : "bg-slate-50 text-slate-800 border border-slate-500"
                } w-full py-3 px-4 outline-none rounded-md shadow-sm`}
                type="text"
                name="company"
                placeholder="Google"
                value={job.company}
                onChange={(e) =>
                  handleArrayChange(e, index, "company", "workExperience")
                }
              />
            </div>

            <div>
              <h4
                className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
              >
                Job Description
              </h4>
              <textarea
                className={`${
                  isDarkMode
                    ? "bg-slate-800 text-slate-50 border-none"
                    : "bg-slate-50 text-slate-800 border border-slate-500"
                } w-full py-3 px-4 outline-none rounded-md shadow-sm h-[51px]`}
                name="description"
                placeholder="Job Description"
                value={job.description}
                onChange={(e) =>
                  handleArrayChange(e, index, "description", "workExperience")
                }
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addWorkExperience}
          className={`w-full flex items-center justify-center gap-2 py-3 ${
            isDarkMode
              ? "bg-slate-800 text-slate-50 border-none"
              : "bg-slate-50 text-slate-800 border border-slate-500"
          } rounded-md shadow-sm hover:bg-blue-800 transition-colors duration-500 ease-in-out`}
        >
          <AddBox />
          Add Work Experience
        </button>
      </div>

      {/*  Sections for Education */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="grid grid-cols-3 gap-6 items-start mb-4">
            <div>
              <h4
                className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
              >
                Degree / Certificate
              </h4>
              <input
                className={`${
                  isDarkMode
                    ? "bg-slate-800 text-slate-50 border-none"
                    : "bg-slate-50 text-slate-800 border border-slate-500"
                } w-full py-3 px-4 outline-none rounded-md shadow-sm`}
                type="text"
                name="degree"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) =>
                  handleArrayChange(e, index, "degree", "education")
                }
              />
            </div>

            <div>
              <h4
                className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
              >
                Institution Name
              </h4>
              <input
                className={`${
                  isDarkMode
                    ? "bg-slate-800 text-slate-50 border-none"
                    : "bg-slate-50 text-slate-800 border border-slate-500"
                } w-full py-3 px-4 outline-none rounded-md shadow-sm`}
                type="text"
                name="institution"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) =>
                  handleArrayChange(e, index, "institution", "education")
                }
              />
            </div>

            <div>
              <h4
                className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
              >
                Education Description
              </h4>
              <textarea
                className={`${
                  isDarkMode
                    ? "bg-slate-800 text-slate-50 border-none"
                    : "bg-slate-50 text-slate-800 border border-slate-500"
                } w-full py-3 px-4 outline-none rounded-md shadow-sm h-[51px]`}
                name="description"
                placeholder="Description"
                value={edu.description}
                onChange={(e) =>
                  handleArrayChange(e, index, "description", "education")
                }
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addEducation}
          className={`w-full flex items-center justify-center gap-2 py-3 ${
            isDarkMode
              ? "bg-slate-800 text-slate-50 border-none"
              : "bg-slate-50 text-slate-800 border border-slate-500"
          } rounded-md shadow-sm hover:bg-blue-800 transition-colors duration-500 ease-in-out`}
        >
          <AddBox />
          Add Education
        </button>
      </div>

      {/* Sections for Projects */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Projects</h3>
        {formData.projects.map((project, index) => (
          <div key={index} className="grid grid-cols-3 gap-6 items-start mb-4">
            <div>
              <h4
                className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
              >
                Project Title
              </h4>
              <input
                className={`${
                  isDarkMode
                    ? "bg-slate-800 text-slate-50 border-none"
                    : "bg-slate-50 text-slate-800 border border-slate-500"
                } w-full py-3 px-4 outline-none rounded-md shadow-sm`}
                type="text"
                name="title"
                placeholder="Google Clone"
                value={project.title}
                onChange={(e) =>
                  handleArrayChange(e, index, "title", "projects")
                }
              />
            </div>

            <div>
              <h4
                className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
              >
                Project URL
              </h4>
              <input
                className={`${
                  isDarkMode
                    ? "bg-slate-800 text-slate-50 border-none"
                    : "bg-slate-50 text-slate-800 border border-slate-500"
                } w-full py-3 px-4 outline-none rounded-md shadow-sm`}
                type="url"
                name="liveUrl"
                placeholder="your-project.xyz"
                value={project.liveUrl}
                onChange={(e) =>
                  handleArrayChange(e, index, "liveUrl", "projects")
                }
              />
            </div>

            <div>
              <h4
                className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
              >
                About Project
              </h4>
              <textarea
                className={`${
                  isDarkMode
                    ? "bg-slate-800 text-slate-50 border-none"
                    : "bg-slate-50 text-slate-800 border border-slate-500"
                } w-full py-3 px-4 outline-none rounded-md shadow-sm h-[51px]`}
                name="description"
                placeholder="Project Description"
                value={project.description}
                onChange={(e) =>
                  handleArrayChange(e, index, "description", "projects")
                }
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addProjects}
          className={`w-full flex items-center justify-center gap-2 py-3 ${
            isDarkMode
              ? "bg-slate-800 text-slate-50 border-none"
              : "bg-slate-50 text-slate-800 border border-slate-500"
          } rounded-md shadow-sm  hover:bg-blue-800 transition-colors duration-500 ease-in-out`}
        >
          <AddBox />
          Add Project
        </button>
      </div>

      {/*  Sections for Skills */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Skills</h3>
        <div className="flex flex-row items-start justify-between my-4 flex-wrap w-full">
          {formData.skills.map((skillCategory, index) => (
            <div key={index} className="mb-4 ">
              <h4 className="text-lg font-medium">{skillCategory.category}</h4>
              {skillCategory.skills.map((s, id) => (
                <input
                  className={`${
                    isDarkMode
                      ? "bg-slate-800 text-slate-50 border-none"
                      : "bg-slate-50 text-slate-800 border border-slate-500"
                  } w-[309px] py-3 px-4 outline-none rounded-md shadow-sm my-2`}
                  type="text"
                  name={skillCategory.category}
                  placeholder={`${skillCategory.category === "Languages" ? "Add Programming languages" : "Add" + " " + skillCategory.category} `}
                  value={s}
                  onChange={(e) => handleSkillsChange(e, index, id)}
                  key={id}
                />
              ))}
            </div>
          ))}
        </div>
        {/* <button
          className=" text-blue-500 flex items-center justify-evenly gap-1 my-6"
          type="button"
          onClick={addSkill}
        >
          <span className="text-xl">
            <AddBox />
          </span>
          Another Skills
        </button> */}
      </div>

      {/*  Sections for Achievements */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Achievements</h3>
        {formData.achievements.map((achievement, index) => (
          <div key={index} className="grid grid-cols-2 gap-6 items-start mb-4">
            <div>
              <h4
                className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
              >
                Achievement Title
              </h4>
              <input
                className={`${
                  isDarkMode
                    ? "bg-slate-800 text-slate-50 border-none"
                    : "bg-slate-50 text-slate-800 border border-slate-500"
                } w-full py-3 px-4 outline-none rounded-md shadow-sm`}
                type="text"
                name="title"
                placeholder="Title"
                value={achievement.title}
                onChange={(e) =>
                  handleArrayChange(e, index, "title", "achievements")
                }
              />
            </div>

            <div>
              <h4
                className={`text-base font-medium my-2 ${isDarkMode ? "text-slate-300" : "text-slate-500"} `}
              >
                About Achievement
              </h4>
              <textarea
                className={`${
                  isDarkMode
                    ? "bg-slate-800 text-slate-50 border-none"
                    : "bg-slate-50 text-slate-800 border border-slate-500"
                } w-full py-3 px-4 outline-none rounded-md shadow-sm h-[51px]`}
                name="description"
                placeholder="Description"
                value={achievement.description}
                onChange={(e) =>
                  handleArrayChange(e, index, "description", "achievements")
                }
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addAchievement}
          className={`w-full flex items-center justify-center gap-2 py-3 ${
            isDarkMode
              ? "bg-slate-800 text-slate-50 border-none"
              : "bg-slate-50 text-slate-800 border border-slate-500"
          } rounded-md shadow-sm hover:bg-blue-800 transition-colors duration-500 ease-in-out`}
        >
          <AddBox />
          Add Achievement
        </button>
      </div>
      <div className="mt-6 flex items-center justify-start gap-12">
        {/* Choose Template Section */}
        <div className="w-fit flex items-center justify-center flex-row gap-2">
          <h3 className="text-xl font-semibold">Choose Template</h3>
          <div className="flex flex-row items-start justify-between">
            <select
              name="template"
              value={formData.template}
              onChange={handleChange}
              className={`py-2 px-3 cursor-pointer rounded-md ${
                isDarkMode ? "bg-blue-800 text-white" : "bg-blue-500 text-white"
              }`}
            >
              <option value="template1">Template 1</option>
              <option value="template2">Template 2</option>
            </select>
          </div>
        </div>

        {/* Choose Image Shape Section */}
        <div className="w-fit flex items-center justify-center flex-row gap-2">
          <h3 className="text-xl font-semibold">Choose Image Shape</h3>
          <div className="flex flex-row items-start justify-between">
            <select
              name="imageShape"
              value={formData.imageShape}
              onChange={handleChange}
              className={`py-2 px-3 cursor-pointer rounded-md ${
                isDarkMode ? "bg-blue-800 text-white" : "bg-blue-500 text-white"
              }`}
            >
              <option value="circle">Circle</option>
              <option value="rectangle">Rectangle</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ResumeForm;
