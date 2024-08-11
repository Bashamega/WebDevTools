"use client";

const Preview = ({ isDarkMode, data }) => {
  const {
    name,
    email,
    phone,
    imageShape,
    address,
    image,
    workExperience,
    education,
    skills,
    links,
    template,
    projects,
    achievements,
  } = data;

  const styles = {
    template1: {
      backgroundColor: "#f2f2f2",
      padding: "50px 80px",
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

    circleImage: {
      width: "35%",
      borderRadius: "50%",
    },
    rectangleImage: {
      width: "35%",
      borderRadius: "0",
    },

    profileDetails: {
      marginLeft: 0,
    },
    name: {
      fontSize: 30,
      color: "#2c3e50",
      // marginBottom: 5,
    },
    profession: {
      fontSize: 14,
      color: "#7f8c8d",
      // marginBottom: 10,
    },

    contactInfo: {
      fontSize: 12,
      color: "#7f8c8d",
      // marginBottom: 2,
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
      fontSize: 14,
      color: "#7f8c8d",

      marginBottom: 5,
      paddingLeft: 10,
    },
    subLink: {
      fontSize: 12,
      color: "#7f8c8d",

      marginBottom: 5,
      paddingLeft: 10,
    },

    desc: {
      fontSize: 14,
      color: "#000",
      marginBottom: 5,
      paddingLeft: 10,
    },

    link: {
      color: "#3498db",
      fontSize: 12,
      textDecoration: "none",
      textTransform: "none",
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
      marginBottom: 5,
      fontSize: 10,
    },

    view: {
      marginBottom: 15,
      textTransform: "capitalize",
    },
  };

  const styles2 = {
    page: {
      padding: 20,
      fontFamily: "Helvetica",
      color: "#1e293b",
    },

    main: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    name: {
      fontSize: 28,
      fontWeight: "bold",
    },

    contactInfo: {
      fontSize: 13,
    },
    sectionTitle: {
      fontSize: 18,
      color: "#020617", // light-slate
      marginBottom: 10,
      borderBottom: "2px solid #000",
      borderTop: "2px solid #000",
      fontWeight: "600",
    },
    text: {
      fontSize: 14,
      marginBottom: 5,
      color: "#020617", // light-slate
    },
    title: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 5,
      color: "#1e293b",
    },

    subtitle: {
      color: "#334155",
    },
    section: {
      marginBottom: 20,
      width: "100%",
    },
  };

  const renderTemplate = () => {
    switch (template) {
      case "template1":
        return (
          <div
            style={styles.template1}
            className={`w-full ${
              isDarkMode ? "bg-slate-100" : "bg-slate-50"
            } my-6`}
          >
            <div
              style={styles.header}
              className="flex items-start justify-between w-full"
            >
              <div className="flex items-center justify-start w-full">
                {image && (
                  <img
                    src={image}
                    alt="Profile Image"
                    style={
                      imageShape === "circle"
                        ? styles.circleImage
                        : styles.rectangleImage
                    }
                  />
                )}
              </div>
              <div className=" flex flex-col justify-start items-start w-2/4 py-4">
                <p style={styles.name}>{name}</p>
                <p style={styles.profession}>{data.workExperience[0].title}</p>

                <p className="text-lg" style={styles.contactInfo}>
                  {email}
                </p>
                {phone && (
                  <p className="text-base" style={styles.contactInfo}>
                    {phone}
                  </p>
                )}

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
                <div key={index} style={styles.view}>
                  <h4 style={styles.title}>{job.title}</h4>
                  <p style={styles.subtitle}>{job.company}</p>
                  <p style={styles.desc}>{job.description}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 style={styles.sectionTitle}>Education</h3>
              {education.map((edu, index) => (
                <div key={index} style={styles.view}>
                  <h4 style={styles.title}>{edu.degree}</h4>
                  <p style={styles.subtitle}>{edu.institution}</p>
                  <p style={styles.desc}>{edu.description}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 style={styles.sectionTitle}>Projects</h3>
              {projects.map((project, index) => (
                <div key={index} style={styles.view}>
                  <h4 style={styles.title}>{project.title}</h4>
                  <p style={styles.subLink}>
                    <span style={styles.link}>{project.liveUrl}</span>
                  </p>
                  <p style={styles.desc}>• {project.description}</p>
                </div>
              ))}
            </div>

            <div style={styles.view}>
              <h3 style={styles.sectionTitle}>Skills</h3>
              <div style={styles.skills}>
                {skills.map((skillsCategory, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "start",
                      flexDirection: "row",
                      gap: "2px",
                      width: "100%",
                      textTransform: "capitalize",
                    }}
                  >
                    {skillsCategory.category && (
                      <span style={styles.title}>
                        {skillsCategory.category}:
                      </span>
                    )}

                    {skillsCategory.skills.map((skill, id) => (
                      <span key={id} style={styles.subtitle}>
                        {skill}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {achievements && (
              <div style={styles.view}>
                {achievements && (
                  <span style={styles.sectionTitle}>Achievements</span>
                )}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "start",
                    flexWrap: "wrap",
                    gap: "5px",
                    flexDirection: "column",
                  }}
                >
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: "2px",
                        flexDirection: "row",
                        // flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                        }}
                      >
                        <span style={styles.title}>{achievement.title}:</span>
                        <span style={styles.subtitle}>
                          {achievement.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case "template2":
        return (
          <main
            style={styles2.page}
            className={`${
              isDarkMode ? "bg-slate-100" : "bg-slate-50"
            } my-6 h-full`}
          >
            {data && (
              <div className="w-full p-8">
                <header className="flex items-center justify-center flex-col mb-1">
                  {name && (
                    <h4 className="text-slate-950" style={styles2.name}>
                      {name}
                    </h4>
                  )}

                  <div className="flex flex-row gap-1 items-center flex-wrap text-slate-800 justify-center">
                    {email && (
                      <span style={styles2.contactInfo}>
                        <a src={links.website} style={styles2.link}>
                          {" "}
                          {email}
                        </a>
                      </span>
                    )}

                    {phone && (
                      <span style={styles2.contactInfo}>
                        <a src={links.website} style={styles2.link}>
                          {" "}
                          {phone}
                        </a>
                      </span>
                    )}

                    {address && (
                      <span style={styles2.contactInfo}>{address}</span>
                    )}

                    {links.linkedIn && (
                      <span style={styles2.contactInfo}>
                        <a src={links.linkedIn} style={styles2.link}>
                          {links.linkedIn}
                        </a>
                      </span>
                    )}

                    {links.github && (
                      <span style={styles2.contactInfo}>
                        <a src={links.github} style={styles2.link}>
                          {" "}
                          {links.github}
                        </a>
                      </span>
                    )}

                    {links.website && (
                      <span style={styles2.contactInfo}>
                        <a src={links.website} style={styles2.link}>
                          {" "}
                          {links.website}
                        </a>
                      </span>
                    )}
                  </div>
                </header>
                <div style={styles2.main}>
                  <div style={styles2.section}>
                    <h6 style={styles2.sectionTitle}>Experience</h6>

                    {workExperience.map((workExp, index) => (
                      <div key={index}>
                        <div style={styles2.text}>
                          <div>
                            <h6 style={styles2.title}>{workExp.title}</h6>
                            <span style={styles2.subtitle}>
                              {" "}
                              {workExp.company}
                            </span>
                          </div>{" "}
                        </div>
                        <p className="pl-4" style={styles2.text}>
                          • {workExp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div style={styles2.section}>
                    <h6 style={styles2.sectionTitle}>Projects</h6>

                    {projects.map((project, index) => (
                      <div key={index}>
                        <div style={styles2.text}>
                          <div style={{ fontWeight: "bold" }}>
                            {project.title}
                          </div>{" "}
                          <span style={styles2.subtitle}>
                            {project.liveUrl}
                          </span>
                        </div>
                        <p className="pl-4" style={styles2.text}>
                          • {project.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div style={styles2.section} className="w-full">
                    <p style={styles2.sectionTitle}>Education</p>
                    {education.map((edu, index) => (
                      <div key={index}>
                        <div style={styles2.text}>
                          <h6>{edu.degree}</h6>
                          <span style={styles2.subtitle}>
                            {" "}
                            {edu.institution}
                          </span>
                        </div>
                        <p style={styles2.text}>• {edu.description}</p>
                      </div>
                    ))}
                  </div>

                  <div style={styles2.section} className="text-sm">
                    <p style={styles2.sectionTitle}>Skills</p>
                    <div className="w-full flex items-start justify-start flex-wrap gap-2 flex-col">
                      {skills.map((skillCategory, idx) => (
                        <div key={idx}>
                          {skillCategory.skills.map((skill, index) => (
                            <div key={index} className="flex items-start  ">
                              {skillCategory.category && (
                                <span
                                  style={styles2.text}
                                  className="font-bold "
                                >
                                  {skillCategory.category}:
                                </span>
                              )}
                              <p className="pl-2">{skill}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {achievements && (
                    <div style={styles2.section} className="text-sm">
                      <p style={styles2.sectionTitle}>Achievements</p>
                      <div className="w-full flex items-start justify-start flex-wrap gap-2 flex-col">
                        {achievements.map((achievement, index) => (
                          <div key={index} className="flex items-start  ">
                            <span style={styles2.text} className="font-bold ">
                              {achievement.title}:
                            </span>
                            <p className="pl-2">{achievement.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        );
      default:
        return null;
    }
  };

  return <div>{renderTemplate()}</div>;
};

export default Preview;
