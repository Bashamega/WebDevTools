"use client";

import React, { useState } from "react";
import { AddBox } from "@mui/icons-material";

const ResumeForm = ({ onFormChange, isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
    workExperience: [{ title: "", company: "", description: "" }],
    education: [{ degree: "", institution: "", description: "" }],
    skills: [""],
    links: { linkedIn: "", website: "", github: "" },
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

  const handleSkillsChange = (e, index) => {
    const newSkills = [...formData.skills];
    newSkills[index] = e.target.value;
    setFormData({ ...formData, skills: newSkills });
    onFormChange({ ...formData, skills: newSkills });
  };

  const handleLinksChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
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

  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        { title: "", company: "", description: "" },
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
        <div className="flex flex-row items-start justify-between my-6">
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
        <div className="w-full">
          <input
            className={` ${
              isDarkMode
                ? "bg-slate-800 text-slate-50 border-none"
                : "bg-slate-50 text-slate-800 border-slate-500 border"
            } w-[300px] py-2 px-2 outline-none  rounded-md`}
            type="file"
            name="image"
            placeholder="Your Photo"
            // value={formData.image}
            accept="image/*"
            onChange={(e) => handlePhotoChange(e)}
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
              } w-[300px] py-2 px-2 outline-none  rounded-md`}
              type="text"
              name="title"
              placeholder="Job Title"
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
      <div className="w-full mt-6">
        <h3 className="text-xl font-semibold">Education</h3>

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
              placeholder="Degree"
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
        {formData.skills.map((skill, index) => (
          <div key={index} className="my-4">
            <input
              className={` ${
                isDarkMode
                  ? "bg-slate-800 text-slate-50 border-none"
                  : "bg-slate-50 text-slate-800 border-slate-500 border"
              } w-[300px] py-2 px-2 outline-none  rounded-md`}
              type="text"
              name={`skill-${index}`}
              placeholder="Add Skills"
              value={skill}
              onChange={(e) => handleSkillsChange(e, index)}
              required
            />
          </div>
        ))}
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

      <div className="w-full mt-6 flex items-center justify-start gap-2">
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
    </form>
  );
};

export default ResumeForm;
