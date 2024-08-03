"use client";
import data from "./sample.json";

const Preview = ({ isDarkMode }) => {
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
      backgroundColor: "#f2f2f2",
      padding: 50,
      fontFamily: "Helvetica",
      color: "#333",
    },

    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },

    profileImage: {
      width: 100,
      height: 100,
      borderRadius: "50%",
    },

    profileDetails: {
      marginLeft: 0,
    },
    name: {
      fontSize: 28,
      color: "#2c3e50",
      marginBottom: 5,
      fontWeight: "bold",
    },
    profession: {
      fontSize: 20,
      color: "#7f8c8d",
      marginBottom: 10,
    },

    contactInfo: {
      fontSize: 12,
      color: "#7f8c8d",
      marginBottom: 2,
    },

    sectionTitle: {
      fontSize: 22,
      color: "#2c3e50",
      marginBottom: 10,
      borderBottom: "2px solid #3498db",
      paddingBottom: 3,
    },

    title: {
      fontSize: 16,
      color: "#333",
      marginBottom: 6,
    },
    subtitle: {
      fontSize: 15,
      color: "#333",
      fontWeight: "bold",
      marginBottom: 5,
      paddingLeft: 10,
    },

    desc: {
      fontSize: 14,
      color: "#000",
      fontWeight: "bold",
      marginBottom: 5,
      paddingLeft: 10,
    },

    link: {
      color: "#3498db",
    },

    skills: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },

    skill: {
      backgroundColor: "#3498db",
      color: "#fff",
      padding: 8,
      borderRadius: 5,
      marginRight: 20,
      marginBottom: 5,
      fontSize: 10,
    },

    view: {
      marginBottom: 15,
      textTransform: "capitalize",
    },
  };

  const renderTemplate = () => {
    switch (template) {
      case "template1":
        return (
          <div
            style={styles.template1}
            className={`w-full ${isDarkMode ? " bg-slate-800" : "bg-slate-50"} my-6`}
          >
            <div
              style={styles.header}
              className="flex items-start justify-between w-full"
            >
              <div className="w-full rounded-full flex items-start justify-start">
                {image && (
                  <img src={image} alt="Profile" style={styles.profileImage} />
                )}
              </div>
              <div className="w-full flex flex-col justify-end items-end">
                <p style={styles.name}>{name}</p>
                <p style={styles.profession}>{data.workExperience[0].title}</p>
                <p className="text-lg" style={styles.contactInfo}>
                  {email}
                </p>
                <p className="text-base" style={styles.contactInfo}>
                  {phone}
                </p>

                <div className=" ">
                  {links.linkedIn && (
                    <p style={styles.contactInfo}>
                      LinkedIn:{" "}
                      <span className="text-blue-500 cursor-pointer">
                        {links.linkedIn}
                      </span>
                    </p>
                  )}
                  {links.website && (
                    <p style={styles.contactInfo}>
                      Website:{" "}
                      <span className="text-blue-500 cursor-pointer">
                        {links.website}
                      </span>
                    </p>
                  )}
                  {links.github && (
                    <p style={styles.contactInfo}>
                      GitHub:{" "}
                      <span className="text-blue-500 cursor-pointer">
                        {links.github}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h3 style={styles.sectionTitle}>Work Experience</h3>
              {workExperience.map((job, index) => (
                <div key={index} style={styles.section}>
                  <h4 style={styles.jobTitle}>{job.title}</h4>
                  <p style={styles.company}>{job.company}</p>
                  <p style={styles.description}>{job.description}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 style={styles.sectionTitle}>Education</h3>
              {education.map((edu, index) => (
                <div key={index} style={styles.section}>
                  <h4 style={styles.degree}>{edu.degree}</h4>
                  <p style={styles.institution}>{edu.institution}</p>
                  <p style={styles.description}>{edu.description}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 style={styles.sectionTitle}>Skills</h3>
              <ul style={styles.skillsList}>
                {skills.map((skill, index) => (
                  <li key={index} style={styles.skill}>
                    - {skill}
                  </li>
                ))}
              </ul>
            </div>
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
