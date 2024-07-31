"use client";

const Preview = ({ data, isDarkMode }) => {
  const {
    name,
    email,
    phone,
    image,
    workExperience,
    education,
    skills,
    links,
    template,
  } = data;

  const styles = {
    template1: {
      fontFamily: "Arial, sans-serif",
      margin: "20px",
    },
    template2: {
      fontFamily: "Georgia, serif",
      margin: "20px",
    },
    image: {
      width: "150px",
      borderRadius: "50%",
      marginBottom: "20px",
    },
    name: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    contact: {
      fontSize: "14px",
      marginBottom: "10px",
    },
    sectionTitle: {
      fontSize: "18px",
      marginTop: "20px",
      marginBottom: "10px",
    },
    section: {
      marginBottom: "20px",
    },
    jobTitle: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    company: {
      fontSize: "14px",
      fontStyle: "italic",
    },
    description: {
      fontSize: "14px",
    },
    degree: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    institution: {
      fontSize: "14px",
      fontStyle: "italic",
    },
    skillsList: {
      listStyleType: "none",
      padding: "0",
    },
    skill: {
      fontSize: "14px",
      fontWeight: "bold",
    },
    link: {
      fontSize: "14px",
      color: "blue",
      textDecoration: "underline",
      marginTop: "5px",
    },
  };

  const renderTemplate = () => {
    switch (template) {
      case "template1":
        return (
          <div style={styles.template1}>
            {image && <img src={image} alt="Profile" style={styles.image} />}
            <h1 style={styles.name}>{name}</h1>
            <p style={styles.contact}>{email}</p>
            <p style={styles.contact}>{phone}</p>
            <h3 style={styles.sectionTitle}>Work Experience</h3>
            {workExperience.map((job, index) => (
              <div key={index} style={styles.section}>
                <h4 style={styles.jobTitle}>{job.title}</h4>
                <p style={styles.company}>{job.company}</p>
                <p style={styles.description}>{job.description}</p>
              </div>
            ))}
            <h3 style={styles.sectionTitle}>Education</h3>
            {education.map((edu, index) => (
              <div key={index} style={styles.section}>
                <h4 style={styles.degree}>{edu.degree}</h4>
                <p style={styles.institution}>{edu.institution}</p>
                <p style={styles.description}>{edu.description}</p>
              </div>
            ))}
            <h3 style={styles.sectionTitle}>Skills</h3>
            <ul style={styles.skillsList}>
              {skills.map((skill, index) => (
                <li key={index} style={styles.skill}>
                  {skill}
                </li>
              ))}
            </ul>
            <h3 style={styles.sectionTitle}>Links</h3>
            {links.linkedin && (
              <p style={styles.link}>LinkedIn: {links.linkedin}</p>
            )}
            {links.website && (
              <p style={styles.link}>Website: {links.website}</p>
            )}
            {links.github && <p style={styles.link}>GitHub: {links.github}</p>}
          </div>
        );
      case "template2":
        return (
          <div style={styles.template2}>
            {image && <img src={image} alt="Profile" style={styles.image} />}
            <h1 style={styles.name}>{name}</h1>
            <p style={styles.contact}>{email}</p>
            <p style={styles.contact}>{phone}</p>
            <h3 style={styles.sectionTitle}>Work Experience</h3>
            {workExperience.map((job, index) => (
              <div key={index} style={styles.section}>
                <h4 style={styles.jobTitle}>{job.title}</h4>
                <p style={styles.company}>{job.company}</p>
                <p style={styles.description}>{job.description}</p>
              </div>
            ))}
            <h3 style={styles.sectionTitle}>Education</h3>
            {education.map((edu, index) => (
              <div key={index} style={styles.section}>
                <h4 style={styles.degree}>{edu.degree}</h4>
                <p style={styles.institution}>{edu.institution}</p>
                <p style={styles.description}>{edu.description}</p>
              </div>
            ))}
            <h3 style={styles.sectionTitle}>Skills</h3>
            <ul style={styles.skillsList}>
              {skills.map((skill, index) => (
                <li key={index} style={styles.skill}>
                  {skill}
                </li>
              ))}
            </ul>
            <h3 style={styles.sectionTitle}>Links</h3>
            {links.linkedin && (
              <p style={styles.link}>LinkedIn: {links.linkedin}</p>
            )}
            {links.website && (
              <p style={styles.link}>Website: {links.website}</p>
            )}
            {links.github && <p style={styles.link}>GitHub: {links.github}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  // return (

  return <div>{renderTemplate()}</div>;
};

export default Preview;

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
