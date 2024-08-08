"use client";

const Preview = ({ isDarkMode, data }) => {
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
      // backgroundColor: "#f2f2f2",
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
      width: "40%",
      height: "40%",
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

  const styles2 = {
    page: {
      // backgroundColor: "#ffffff",
      padding: 20,
      fontFamily: "Helvetica",
      color: "#333",
    },
    sidebar: {
      width: "30%",
      padding: 20,
      backgroundColor: "#f7f7f7",
      borderRight: "2px solid #3498db",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    main: {
      width: "70%",
      padding: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: "50%",
      border: "2px solid #3498db",
      marginBottom: 20,
      alignSelf: "center",
    },
    name: {
      fontSize: 24,
      color: "#2c3e50",
      marginBottom: 5,
      fontWeight: "bold",
    },
    profession: {
      fontSize: 18,
      color: "#7f8c8d",
      marginBottom: 10,
    },
    contactInfo: {
      fontSize: 12,
      color: "#7f8c8d",
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 18,
      color: "#2c3e50",
      marginBottom: 10,
      borderBottom: "2px solid #3498db",
      paddingBottom: 3,
    },
    text: {
      fontSize: 12,
      color: "#333",
      marginBottom: 5,
    },
    link: {
      color: "#3498db",
    },
    skills: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "start",
    },
    skill: {
      backgroundColor: "#3498db",
      color: "#fff",
      padding: 5,
      borderRadius: 5,
      marginRight: 5,
      marginBottom: 5,
      fontSize: 10,
    },
    experience: {
      marginBottom: 20,
    },
    education: {
      marginBottom: 20,
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
                  <img src={image} alt="Profile" style={styles.profileImage} />
                )}
              </div>
              <div className="w-full flex flex-col justify-end items-end py-4">
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

            <div style={styles.view}>
              <h3 style={styles.sectionTitle}>Skills</h3>
              <div style={styles.skills}>
                {skills.map((skill, index) => (
                  <span key={index} style={styles.skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
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
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <div style={styles2.sidebar}>
                    {image && <img style={styles2.profileImage} src={image} />}

                    {name && <p style={styles2.name}>{name}</p>}

                    {workExperience && (
                      <p style={styles2.profession}>
                        {workExperience[0].title}
                      </p>
                    )}
                    {email && <p style={styles2.contactInfo}>Email: {email}</p>}

                    {phone && <p style={styles2.contactInfo}>Phone: {phone}</p>}
                    {links.linkedIn && (
                      <p style={styles2.contactInfo}>
                        LinkedIn:{" "}
                        <a src={links.linkedIn} style={styles2.link}>
                          {links.linkedIn}
                        </a>
                      </p>
                    )}
                    {links.github && (
                      <p style={styles2.contactInfo}>
                        GitHub:{" "}
                        <a src={links.github} style={styles2.link}>
                          {" "}
                          {links.github}
                        </a>
                      </p>
                    )}

                    {links.website && (
                      <p style={styles2.contactInfo}>
                        Website:{" "}
                        <a src={links.website} style={styles2.link}>
                          {" "}
                          {links.website}
                        </a>
                      </p>
                    )}
                  </div>
                  <div style={styles2.main}>
                    <div style={styles2.experience}>
                      <p style={styles2.sectionTitle}>Experience</p>

                      {workExperience.map((workExp, index) => (
                        <div key={index}>
                          <div style={styles2.text}>
                            <div style={{ fontWeight: "bold" }}>
                              {workExp.title}
                            </div>{" "}
                            at
                            {workExp.company}
                          </div>
                          <p style={styles2.text}>{workExp.description}</p>
                        </div>
                      ))}
                    </div>

                    <div style={styles2.education}>
                      <p style={styles2.sectionTitle}>Education</p>
                      {education.map((edu, index) => (
                        <div key={index}>
                          <p style={styles2.text}>
                            <p style={{ fontWeight: "bold" }}>{edu.degree}</p>{" "}
                            {edu.institution}
                          </p>
                          <p style={styles2.text}>{edu.description}</p>
                        </div>
                      ))}
                    </div>

                    <p style={styles2.sectionTitle}>Skills</p>

                    {skills.map((skill, index) => (
                      <div key={index} style={styles2.skills}>
                        <p style={styles2.skill}>{skill}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </main>
        );
      default:
        return null;
    }
  };

  // return (

  return <div>{renderTemplate()}</div>;
};

export default Preview;
