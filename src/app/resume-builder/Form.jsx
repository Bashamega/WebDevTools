import React, { useState } from "react";

const ResumeForm = ({ onSubmit, isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    workExperience: [{ title: "", company: "", description: "" }],
    education: [{ degree: "", institution: "", description: "" }],
    skills: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, index, field, arrayName) => {
    const newArray = [...formData[arrayName]];
    newArray[index][field] = e.target.value;
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="w-full my-6">
        <h3 className="text-xl font-semibold">Personal Info</h3>
        <div className="flex flex-row items-start justify-between">
          <input
            className={` ${isDarkMode ? "bg-slate-800 text-slate-50 border-none" : "bg-slate-50 text-slate-800 border-slate-500 border"} w-[300px] py-2 px-2 outline-none  rounded-md`}
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className={` ${isDarkMode ? "bg-slate-800 text-slate-50 border-none" : "bg-slate-50 text-slate-800 border-slate-500 border"} w-[300px] py-2 px-2 outline-none  rounded-md`}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className={` ${isDarkMode ? "bg-slate-800 text-slate-50 border-none" : "bg-slate-50 text-slate-800 border-slate-500 border"} w-[300px] py-2 px-2 outline-none  rounded-md`}
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="w-full my-6">
        <h3 className="text-xl font-semibold">Work Experience</h3>
        {formData.workExperience.map((job, index) => (
          <div
            key={index}
            className="flex flex-row items-start justify-between"
          >
            <input
              className={` ${isDarkMode ? "bg-slate-800 text-slate-50 border-none" : "bg-slate-50 text-slate-800 border-slate-500 border"} w-[300px] py-2 px-2 outline-none  rounded-md`}
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
              className={` ${isDarkMode ? "bg-slate-800 text-slate-50 border-none" : "bg-slate-50 text-slate-800 border-slate-500 border"} w-[300px] py-2 px-2 outline-none  rounded-md`}
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
              className={` ${isDarkMode ? "bg-slate-800 text-slate-50 border-none" : "bg-slate-50 text-slate-800 border-slate-500 border"} w-[300px] py-2 px-2 outline-none  rounded-md`}
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
      </div>
      <div className="w-full mt-6">
        <h3 className="text-xl font-semibold">Education</h3>
        {formData.education.map((edu, index) => (
          <div
            key={index}
            className="flex flex-row items-start justify-between"
          >
            <input
              className={` ${isDarkMode ? "bg-slate-800 text-slate-50 border-none" : "bg-slate-50 text-slate-800 border-slate-500 border"} w-[300px] py-2 px-2 outline-none  rounded-md`}
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
              className={` ${isDarkMode ? "bg-slate-800 text-slate-50 border-none" : "bg-slate-50 text-slate-800 border-slate-500 border"} w-[300px] py-2 px-2 outline-none  rounded-md`}
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
              className={` ${isDarkMode ? "bg-slate-800 text-slate-50 border-none" : "bg-slate-50 text-slate-800 border-slate-500 border"} w-[300px] py-2 px-2 outline-none  rounded-md`}
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
      </div>
      <div className="w-full">
        <h3 className="text-xl font-semibold">Skills</h3>
        {formData.skills.map((skill, index) => (
          <input
            className={` ${isDarkMode ? "bg-slate-800 text-slate-50 border-none" : "bg-slate-50 text-slate-800 border-slate-500 border"} w-[300px] py-2 px-2 outline-none  rounded-md`}
            key={index}
            type="text"
            name={`skill-${index}`}
            placeholder="Skill"
            value={skill}
            onChange={(e) => {
              const newSkills = [...formData.skills];
              newSkills[index] = e.target.value;
              setFormData({ ...formData, skills: newSkills });
            }}
            required
          />
        ))}
      </div>
      <button
        className="p-3 w-[180px] bg-blue-500 border-none rounded-lg text-white my-6 hover:bg-blue-400 transition-all duration-300"
        type="submit"
      >
        Generate Resume
      </button>
    </form>
  );
};

export default ResumeForm;
