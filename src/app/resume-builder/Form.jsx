import React, { useState } from "react";

const ResumeForm = ({ onSubmit }) => {
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <h3>Work Experience</h3>
      {formData.workExperience.map((job, index) => (
        <div key={index}>
          <input
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
      <h3>Education</h3>
      {formData.education.map((edu, index) => (
        <div key={index}>
          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => handleArrayChange(e, index, "degree", "education")}
            required
          />
          <input
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
      <h3>Skills</h3>
      {formData.skills.map((skill, index) => (
        <input
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
      <button type="submit">Generate Resume</button>
    </form>
  );
};

export default ResumeForm;
