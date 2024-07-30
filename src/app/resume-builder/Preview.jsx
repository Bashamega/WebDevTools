"use client";

const Preview = ({ data, isDarkMode }) => {
  const {
    name,
    email,
    phone,
    photo,
    workExperience,
    education,
    skills,
    links,
    template,
  } = data;

  const renderTemplate = () => {
    switch (template) {
      case "template1":
        return (
          <div>
            {photo && <img src={photo} alt="Profile" />}
            <h1>{name}</h1>
            <p>{email}</p>
            <p>{phone}</p>
            <h3>Work Experience</h3>
            {workExperience.map((job, index) => (
              <div key={index}>
                <h4>{job.title}</h4>
                <p>{job.company}</p>
                <p>{job.description}</p>
              </div>
            ))}
            <h3>Education</h3>
            {education.map((edu, index) => (
              <div key={index}>
                <h4>{edu.degree}</h4>
                <p>{edu.institution}</p>
                <p>{edu.description}</p>
              </div>
            ))}
            <h3>Skills</h3>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <h3>Links</h3>
            {links.linkedin && <p>LinkedIn: {links.linkedin}</p>}
            {links.website && <p>Website: {links.website}</p>}
            {links.github && <p>GitHub: {links.github}</p>}
          </div>
        );

      case "template2":
        return (
          <div>
            {photo && <img src={photo} alt="Profile" />}
            <h1>{name}</h1>
            <p>{email}</p>
            <p>{phone}</p>
            <h3>Work Experience</h3>
            {workExperience.map((job, index) => (
              <div key={index}>
                <h4>{job.title}</h4>
                <p>{job.company}</p>
                <p>{job.description}</p>
              </div>
            ))}
            <h3>Education</h3>
            {education.map((edu, index) => (
              <div key={index}>
                <h4>{edu.degree}</h4>
                <p>{edu.institution}</p>
                <p>{edu.description}</p>
              </div>
            ))}
            <h3>Skills</h3>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <h3>Links</h3>
            {links.linkedin && <p>LinkedIn: {links.linkedin}</p>}
          </div>
        );
    }
  };

  // return (
  //   <div className="w-full my-5">
  //     <h2 className="text-xl font-semibold mt-4">Preview Details</h2>
  //     <div
  //       className={`flex flex-col items-start flex-wrap w-full overflow-none border p-4 mt-4 ${isDarkMode ? "bg-slate-800" : "bg-blue-50"}`}
  //     >
  //       <div className="w-full mx-4">
  //         <p className="mt-3 mb-1 text-2xl font-semibold">
  //           <strong>Name:</strong> {name}
  //         </p>
  //         <p className="mt-3 mb-1 text-sm">
  //           <strong>Email:</strong> {email}
  //         </p>

  //         {phone && (
  //           <p className="mt-3 mb-1 text-sm">
  //             <strong>Number:</strong> {phone}
  //           </p>
  //         )}
  //       </div>

  //       <div className="w-full mx-6 ">
  //         <p className="mt-3 text-xl mb-4">
  //           <strong>Work Experience:</strong>
  //           <ul className="mx-4 mt-4">
  //             <li>{workExperience[0].title},</li>

  //             <li>{workExperience[0].company},</li>

  //             <li>{workExperience[0].description},</li>
  //           </ul>
  //         </p>
  //         <p className="mt-3 mb4 text-xl">
  //           <strong>Education:</strong>
  //           <ul className="mx-4 mt-4">
  //             <li>{education[0].degree},</li>

  //             <li>{education[0].institution},</li>

  //             <li>{education[0].description},</li>
  //           </ul>
  //         </p>
  //         <p className="mt-3 mb-4">
  //           <strong>Skills:</strong>

  //           <p className="mx-4 mt-4">{skills}</p>
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Preview;
