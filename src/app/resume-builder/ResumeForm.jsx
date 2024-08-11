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
      { category: "Programming Languages", skills: [""] },
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
    console.log(e);
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

  // Adding Function
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

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ""] });
  };

  const addAchievement = () => {
    setFormData({ ...formData, achievements: [...formData.achievements, ""] });
  };

  return (
    <form className="w-full">
      <div className="w-full my-6">
        <h3 className="text-xl font-semibold">Personal Info</h3>
        <div className="flex flex-row items-start justify-between my-4">
          <input
            className={` ${
              isDarkMode
                ? "bg-slate-800 text-slate-50 border-none"
                : "bg-slate-50 text-slate-800 border-slate-500 border"
            } w-[300px] py-2 px-2 outline-none  rounded-md`}
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className={` ${
              isDarkMode
                ? "bg-slate-800 text-slate-50 border-none"
                : "bg-slate-50 text-slate-800 border-slate-500 border"
            } w-[300px] py-2 px-2 outline-none  rounded-md`}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className={` ${
              isDarkMode
                ? "bg-slate-800 text-slate-50 border-none"
                : "bg-slate-50 text-slate-800 border-slate-500 border"
            } w-[300px] py-2 px-2 outline-none  rounded-md`}
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row items-start justify-between my-4">
          <input
            className={` ${
              isDarkMode
                ? "bg-slate-800 text-slate-50 border-none"
                : "bg-slate-50 text-slate-800 border-slate-500 border"
            } w-[300px] py-2 px-2 outline-none  rounded-md`}
            type="url"
            name="linkedIn"
            placeholder="Your LinkedIn"
            value={formData.links.linkedIn}
            onChange={(e) => handleLinksChange(e)}
          />
          <input
            className={` ${
              isDarkMode
                ? "bg-slate-800 text-slate-50 border-none"
                : "bg-slate-50 text-slate-800 border-slate-500 border"
            } w-[300px] py-2 px-2 outline-none  rounded-md`}
            type="url"
            name="website"
            placeholder="Your Personal Website"
            value={formData.links.website}
            onChange={(e) => handleLinksChange(e)}
          />
          <input
            className={` ${
              isDarkMode
                ? "bg-slate-800 text-slate-50 border-none"
                : "bg-slate-50 text-slate-800 border-slate-500 border"
            } w-[300px] py-2 px-2 outline-none  rounded-md`}
            type="url"
            name="github"
            placeholder="Your Github"
            value={formData.links.github}
            onChange={(e) => handleLinksChange(e)}
          />
        </div>

        <div className="flex flex-row items-start gap-[2.2rem] my-4">
          <input
            className={` ${
              isDarkMode
                ? "bg-slate-800 text-slate-50 border-none"
                : "bg-slate-50 text-slate-800 border-slate-500 border"
            } w-[300px] py-2 px-2 outline-none  rounded-md`}
            type="text"
            name="address"
            placeholder="Your Address"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            className={` ${
              isDarkMode
                ? "bg-slate-800 text-slate-50 border-none"
                : "bg-slate-50 text-slate-800 border-slate-500 border"
            } w-[300px] py-2 px-2 outline-none  rounded-md ${
              formData.template === "template2"
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            type="file"
            name="image"
            placeholder="Your Photo"
            accept="image/*"
            onChange={(e) => handlePhotoChange(e)}
            disabled={formData.template === "template2"}
          />
        </div>
      </div>
      <div className="w-full my-6">
        <h3 className="text-xl font-semibold">Work Experience</h3>
        {formData.workExperience.map((job, index) => (
          <div
            key={index}
            className="flex flex-row items-start justify-between my-4"
          >
            <input
              className={` ${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border-slate-500 border"
              } w-[300px] py-2 px-2 outline-none  rounded-md `}
              type="text"
              name="title"
              placeholder="Work Experience Title"
              value={job.title}
              onChange={(e) =>
                handleArrayChange(e, index, "title", "workExperience")
              }
              required
            />
            <input
              className={` ${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border-slate-500 border"
              } w-[300px] py-2 px-2 outline-none  rounded-md`}
              type="text"
              name="company"
              placeholder="Company"
              value={job.company}
              onChange={(e) =>
                handleArrayChange(e, index, "company", "workExperience")
              }
              required
            />
            <textarea
              className={` ${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border-slate-500 border"
              } w-[300px] py-2 px-2 outline-none  rounded-md`}
              name="description"
              placeholder="Description"
              value={job.description}
              onChange={(e) =>
                handleArrayChange(e, index, "description", "workExperience")
              }
              required
            />
          </div>
        ))}
        <button
          className=" text-blue-500 flex items-center justify-evenly gap-1"
          type="button"
          onClick={addWorkExperience}
        >
          <span className="text-xl">
            <AddBox />
          </span>
          Another Experience
        </button>
      </div>
      <div className="w-full my-6">
        <h3 className="text-xl font-semibold">Your Projects</h3>
        {formData.projects.map((project, index) => (
          <div
            key={index}
            className="flex flex-row items-start justify-between my-4"
          >
            <input
              className={` ${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border-slate-500 border"
              } w-[300px] py-2 px-2 outline-none  rounded-md`}
              type="text"
              name="title"
              placeholder="Project Name"
              value={project.title}
              onChange={(e) => handleArrayChange(e, index, "title", "projects")}
              required
            />
            <input
              className={` ${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border-slate-500 border"
              } w-[300px] py-2 px-2 outline-none  rounded-md`}
              type="url"
              name="liveUrl"
              placeholder="Project Link"
              value={project.liveUrl}
              onChange={(e) =>
                handleArrayChange(e, index, "liveUrl", "projects")
              }
              required
            />
            <textarea
              className={` ${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border-slate-500 border"
              } w-[300px] py-2 px-2 outline-none  rounded-md`}
              name="description"
              placeholder="About Project"
              value={project.description}
              onChange={(e) =>
                handleArrayChange(e, index, "description", "projects")
              }
              required
            />
          </div>
        ))}
        <button
          className=" text-blue-500 flex items-center justify-evenly gap-1"
          type="button"
          onClick={addProjects}
        >
          <span className="text-xl">
            <AddBox />
          </span>
          Another Project
        </button>
      </div>
      <div className="w-full mt-6">
        <h3 className="text-xl font-semibold">Education or Certificates</h3>

        {formData.education.map((edu, index) => (
          <div
            key={index}
            className="flex flex-row items-start justify-between my-4"
          >
            <input
              className={` ${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border-slate-500 border"
              } w-[300px] py-2 px-2 outline-none  rounded-md`}
              type="text"
              name="degree"
              placeholder="Title"
              value={edu.degree}
              onChange={(e) =>
                handleArrayChange(e, index, "degree", "education")
              }
              required
            />
            <input
              className={` ${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border-slate-500 border"
              } w-[300px] py-2 px-2 outline-none  rounded-md`}
              type="text"
              name="institution"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) =>
                handleArrayChange(e, index, "institution", "education")
              }
              required
            />
            <textarea
              className={` ${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border-slate-500 border"
              } w-[300px] py-2 px-2 outline-none  rounded-md`}
              name="description"
              placeholder="Description"
              value={edu.description}
              onChange={(e) =>
                handleArrayChange(e, index, "description", "education")
              }
              required
            />
          </div>
        ))}
        <button
          className=" text-blue-500 flex items-center justify-evenly gap-1"
          type="button"
          onClick={addEducation}
        >
          <span className="text-xl">
            <AddBox />
          </span>
          Another Education
        </button>
      </div>

      <div className="w-full mt-6">
        <h3 className="text-xl font-semibold">Skills</h3>
        <div className="flex flex-row items-start justify-between my-4 flex-wrap w-full">
          {formData.skills.map((skillCategory, index) => (
            <div key={index} className="mb-4">
              {skillCategory.skills.map((s, id) => (
                <input
                  className={` ${
                    isDarkMode
                      ? "bg-slate-800 text-slate-50 border-none"
                      : "bg-slate-50 text-slate-800 border-slate-500 border"
                  } w-[300px] py-2 px-2 outline-none  rounded-md mb-2`}
                  type="text"
                  name={skillCategory.category}
                  placeholder={`${skillCategory.category}`}
                  value={s}
                  onChange={(e) => handleSkillsChange(e, index, id)}
                  key={id}
                />
              ))}
            </div>
          ))}
        </div>
        <button
          className=" text-blue-500 flex items-center justify-evenly gap-1 my-6"
          type="button"
          onClick={addSkill}
        >
          <span className="text-xl">
            <AddBox />
          </span>
          Another Skills
        </button>
      </div>
      <div className="w-full my-6">
        <h3 className="text-xl font-semibold">Achievements</h3>
        {formData.achievements.map((achievement, index) => (
          <div key={index} className="flex items-start my-4 w-full gap-[2rem]">
            <input
              className={` ${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border-slate-500 border"
              } w-[300px] py-2 px-2 outline-none rounded-md`}
              type="text"
              name="title"
              placeholder="Achievement Title"
              value={achievement.title}
              onChange={(e) =>
                handleArrayChange(e, index, "title", "achievements")
              }
            />
            <textarea
              className={` ${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border-slate-500 border"
              } w-[300px] py-2 px-2 outline-none rounded-md ml-4`}
              name="description"
              placeholder="Achievement Description"
              value={achievement.description}
              onChange={(e) =>
                handleArrayChange(e, index, "description", "achievements")
              }
            />
          </div>
        ))}
        <button
          className="text-blue-500 flex items-center justify-evenly gap-1"
          type="button"
          onClick={addAchievement}
        >
          <span className="text-xl">
            <AddBox />
          </span>
          Another Achievement
        </button>
      </div>

      <div className=" mt-6 flex items-center justify-start gap-12">
        <div className="w-fit flex items-center justify-center flex-row gap-2">
          <h3 className="text-xl font-semibold">Choose Template</h3>

          <div className="flex flex-row items-start justify-between">
            <select
              name="template"
              value={formData.template}
              onChange={handleChange}
              className="py-2 px-3 bg-blue-500 text-white cursor-pointer rounded-md"
            >
              <option value="template1">Template 1</option>
              <option value="template2">Template 2</option>
            </select>
          </div>
        </div>

        <div className="w-fit flex items-center justify-center flex-row gap-2">
          <h3 className="text-xl font-semibold">Choose Image shape</h3>

          <div className="flex flex-row items-start justify-between">
            <select
              name="imageShape"
              value={formData.imageShape}
              onChange={handleChange}
              className="py-2 px-3 bg-blue-500 text-white cursor-pointer rounded-md"
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
