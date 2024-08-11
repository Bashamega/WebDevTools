"use client";

import React from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
  Link,
} from "@react-pdf/renderer";

// Some styles
const styles1 = StyleSheet.create({
  page: {
    backgroundColor: "#f2f2f2",
    padding: 30,
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
    width: 100,
    height: 100,
    borderRadius: "50%",
  },

  rectangleImage: {
    width: 100,
    height: 100,
    borderRadius: "0%",
  },

  profileDetails: {
    marginLeft: 0,
    display: "flex",
    alignItems: "start",
  },

  name: {
    fontSize: 28,
    color: "#2c3e50",
    marginBottom: 5,
    fontWeight: "bold",
  },

  profession: {
    fontSize: 14,
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
    fontSize: 12,
    color: "#7f8c8d",
    fontWeight: "bold",
    marginBottom: 5,
    paddingLeft: 10,
  },

  subLink: {
    fontSize: 12,
    color: "#7f8c8d",
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
    lineHeight: "1.5px",
  },

  link: {
    color: "#3498db",
    fontSize: 12,
    textDecoration: "none",
    fontStyle: "italic",
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
});

const ResumePDF = ({ data }) => {
  const {
    name,
    email,
    phone,
    address,
    image,
    imageShape,
    workExperience,
    projects,
    education,
    skills,
    links,
    achievements,
    template,
  } = data;

  switch (template) {
    case "template1":
      return (
        <Document>
          <Page size="A4" style={styles1.page}>
            <View style={styles1.header}>
              <View>
                <Image
                  style={
                    imageShape === "circle"
                      ? styles1.circleImage
                      : styles1.rectangleImage
                  }
                  src={image}
                />
              </View>
              <View style={styles1.profileDetails}>
                <Text style={styles1.name}>{name}</Text>
                {workExperience[0].title && (
                  <Text style={styles1.profession}>
                    {workExperience[0].title}
                  </Text>
                )}
                {email && (
                  <Text style={styles1.contactInfo}>
                    Email: <Text style={styles1.link}>{email}</Text>{" "}
                  </Text>
                )}
                {phone && (
                  <Text style={styles1.contactInfo}>Phone: {phone}</Text>
                )}
                {address && (
                  <Text style={styles1.contactInfo}>Address: {address}</Text>
                )}
                {links.linkedIn && (
                  <Text style={styles1.contactInfo}>
                    LinkedIn:
                    <Link src={links.linkedIn} style={styles1.link}>
                      {links.linkedIn}
                    </Link>
                  </Text>
                )}
                {links.github && (
                  <Text style={styles1.contactInfo}>
                    GitHub:
                    <Link src={links.github} style={styles1.link}>
                      {links.github}
                    </Link>
                  </Text>
                )}
                {links.website && (
                  <Text style={styles1.contactInfo}>
                    Website:
                    <Link src={links.website} style={styles1.link}>
                      {links.website}
                    </Link>
                  </Text>
                )}
              </View>
            </View>
            <View style={styles1.view}>
              <Text style={styles1.sectionTitle}>Experience</Text>
              {workExperience.map((job) => (
                <View key={job.title}>
                  <Text style={styles1.title}>{job.title}</Text>
                  <Text style={styles1.subtitle}>{job.company}</Text>
                  <Text style={styles1.desc}>• {job.description}</Text>
                </View>
              ))}
            </View>
            <View style={styles1.view}>
              <Text style={styles1.sectionTitle}>Education</Text>
              {education.map((edu, index) => (
                <View key={index}>
                  <Text style={styles1.title}>{edu.degree}</Text>
                  <Text style={styles1.subtitle}>{edu.institution}</Text>
                  <Text style={styles1.desc}>• {edu.description}</Text>
                </View>
              ))}
            </View>
            <View style={styles1.view}>
              <Text style={styles1.sectionTitle}>Projects</Text>
              {projects.map((project, index) => (
                <View key={index}>
                  <Text style={styles1.title}>{project.title}</Text>
                  <Text style={styles1.subLink}>
                    <Link style={styles1.link}>{project.liveUrl}</Link>
                  </Text>
                  <Text style={styles1.desc}>• {project.description}</Text>
                </View>
              ))}
            </View>
            <View style={styles1.view}>
              <Text style={styles1.sectionTitle}>Skills</Text>
              <View style={styles1.skills}>
                {skills.map((skillsCategory, index) => (
                  <View
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
                      <Text style={styles1.title}>
                        {skillsCategory.category}:
                      </Text>
                    )}

                    {skillsCategory.skills &&
                      skillsCategory.skills.map((skill, id) => (
                        <Text key={id} style={styles1.subtitle}>
                          {skill}
                        </Text>
                      ))}
                  </View>
                ))}
              </View>
            </View>
            {achievements && (
              <View style={styles1.view}>
                <Text style={styles1.sectionTitle}>Achievements</Text>
                <View
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
                    <View
                      key={index}
                      style={{
                        display: "flex",
                        gap: "2px",
                        flexDirection: "row",
                        // flexWrap: "wrap",
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                        }}
                      >
                        <Text style={styles1.title}>{achievement.title}:</Text>
                        <Text style={styles1.desc}>
                          • {achievement.description}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </Page>
        </Document>
      );

    case "template2":
      return (
        <Document>
          <Page
            size="A4"
            style={{ padding: 20, color: "#1e293b", fontFamily: "Helvetica" }}
          >
            <View style={{ width: "100%", padding: "24px" }}>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    // fontFamily: "Times-Roman",
                  }}
                >
                  {name}
                </Text>
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: "5px",
                  }}
                >
                  <Text style={{ fontSize: 12, fontStyle: "italic" }}>
                    <Link
                      style={{
                        color: "#020617",
                        textDecoration: "dotted",
                      }}
                      src={`mailto:${email}`}
                    >
                      {email}
                    </Link>
                  </Text>
                  <Text style={{ fontSize: 12 }}>
                    <Link
                      style={{
                        color: "#020617",
                        textDecoration: "dotted",
                      }}
                      src={`tel:${phone}`}
                    >
                      {phone}
                    </Link>
                  </Text>
                  <Text style={{ fontSize: 12 }}>{address}</Text>
                  <Text style={{ fontSize: 12 }}>
                    <Link
                      style={{
                        color: "#020617",
                        textDecoration: "dotted",
                      }}
                      src={links.linkedIn}
                    >
                      {links.linkedIn}
                    </Link>
                  </Text>
                  <Text style={{ fontSize: 12 }}>
                    <Link
                      style={{
                        color: "#020617",
                        textDecoration: "dotted",
                      }}
                      src={links.github}
                    >
                      {links.github}
                    </Link>
                  </Text>
                  <Text style={{ fontSize: 12 }}>
                    <Link
                      style={{
                        color: "#020617",
                        textDecoration: "dotted",
                      }}
                      src={links.website}
                    >
                      {links.website}
                    </Link>
                  </Text>
                </View>
              </View>
              <View
                //main
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    //section
                    marginBottom: 20,
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      //sectionTitle
                      fontSize: 18,
                      color: "#020617", // light-slate
                      marginBottom: 10,
                      borderBottom: "2px solid #000",
                      borderTop: "2px solid #000",
                      fontWeight: 600,
                      paddingTop: 3,
                      fontStyle: "italic",
                      // fontFamily: "Times-Bold",
                    }}
                  >
                    Experience
                  </Text>
                  {workExperience.map((workExp, index) => (
                    <View
                      key={index}
                      style={{ marginBottom: "5px", width: "100%" }}
                    >
                      <Text
                        //title
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          marginBottom: 5,
                          color: "#1e293b",
                          // fontFamily: "Times-Bold",
                        }}
                      >
                        {workExp.title}
                      </Text>
                      <Text
                        //subtitle
                        style={{
                          color: "#334155",
                          fontSize: 12,
                          marginBottom: 10,
                          fontStyle: "italic",
                          fontFamily: "Times-BoldItalic",
                        }}
                      >
                        {workExp.company}
                      </Text>
                      <View style={{ paddingLeft: "8px" }}>
                        <Text
                          style={{
                            //text
                            fontSize: 12,
                            marginBottom: 5,
                            fontWeight: 500,
                            color: "#020617",
                            lineHeight: "1.5px",
                          }}
                        >
                          • {workExp.description}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
                <View style={{ marginBottom: 20, width: "100%" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#020617", // light-slate
                      marginBottom: 10,
                      borderBottom: "2px solid #000",
                      borderTop: "2px solid #000",
                      fontWeight: 600,
                      paddingTop: 3,
                      fontStyle: "italic",
                      // fontFamily: "Times-Bold",
                    }}
                  >
                    Education
                  </Text>
                  {education.map((edu, index) => (
                    <View
                      key={index}
                      style={{ marginBottom: "5px", width: "100%" }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          marginBottom: 5,
                          color: "#1e293b",
                          // fontFamily: "Times-Bold",
                        }}
                      >
                        {edu.degree}
                      </Text>
                      <Text
                        style={{
                          color: "#334155",
                          fontSize: 12,
                          marginBottom: 10,
                          fontStyle: "italic",
                          fontFamily: "Times-BoldItalic",
                        }}
                      >
                        {edu.institution}
                      </Text>
                      <View style={{ paddingLeft: "8px" }}>
                        <Text
                          style={{
                            fontSize: 12,
                            marginBottom: 5,
                            fontWeight: 500,
                            color: "#020617", // light-slate
                            // fontFamily: "Times-Roman",
                            lineHeight: "1.5px",
                          }}
                        >
                          • {edu.description}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
                <View style={{ marginBottom: 20, width: "100%" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#020617", // light-slate
                      marginBottom: 10,
                      borderBottom: "2px solid #000",
                      borderTop: "2px solid #000",
                      fontWeight: 600,
                      paddingTop: 3,
                      fontStyle: "italic",
                      // fontFamily: "Times-Bold",
                    }}
                  >
                    Projects
                  </Text>
                  {projects.map((project, index) => (
                    <View
                      key={index}
                      style={{ marginBottom: "5px", width: "100%" }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          marginBottom: 5,
                          color: "#1e293b",
                          // fontFamily: "Times-Bold",
                        }}
                      >
                        {project.title}
                      </Text>
                      <Text
                        style={{
                          color: "#334155",
                          fontSize: 12,
                          marginBottom: 10,
                          fontStyle: "italic",
                          fontFamily: "Times-BoldItalic",
                        }}
                      >
                        <Link
                          style={{
                            color: "#334155",
                            textDecoration: "dotted",
                          }}
                          src={project.liveUrl}
                        >
                          {project.liveUrl}
                        </Link>
                      </Text>
                      <View style={{ paddingLeft: "8px" }}>
                        <Text
                          style={{
                            fontSize: 12,
                            marginBottom: 5,
                            fontWeight: 500,
                            color: "#020617", // light-slate
                            // fontFamily: "Times-Roman",
                            lineHeight: "1.5px",
                          }}
                        >
                          • {project.description}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
                <View style={{ width: "100%", marginBottom: 20 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#020617", // light-slate
                      marginBottom: 10,
                      borderBottom: "2px solid #000",
                      borderTop: "2px solid #000",
                      fontWeight: 600,
                      paddingTop: 3,
                    }}
                  >
                    Skills
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      justifyContent: "start",
                      flexWrap: "wrap",
                      // gap:"5px"
                    }}
                  >
                    {skills.map((skillsCategory, index) => (
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "start",
                          flexDirection: "row",
                          gap: "5px",
                          textTransform: "capitalize",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            marginBottom: 5,
                            color: "#1e293b",
                            // fontFamily: "Times-Bold",
                          }}
                        >
                          {skillsCategory.category}:
                        </Text>
                        {skillsCategory.skills.map((skill, id) => (
                          <Text
                            key={id}
                            style={{
                              //text
                              fontSize: 12,
                              marginBottom: 5,
                              fontWeight: "bold",
                              color: "#334155", // light-slate
                              // fontFamily: "Times-Roman",
                            }}
                          >
                            {skill}
                          </Text>
                        ))}
                      </View>
                    ))}
                  </View>
                </View>
                <View style={{ marginBottom: 20, width: "100%" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#020617", // light-slate
                      marginBottom: 10,
                      borderBottom: "2px solid #000",
                      borderTop: "2px solid #000",
                      fontWeight: 600,
                      paddingTop: 3,
                      // fontFamily: "Times-Bold",
                    }}
                  >
                    Achievements
                  </Text>
                  {achievements.map((achievement, index) => (
                    <View
                      key={index}
                      style={{ marginBottom: "5px", width: "100%" }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          marginBottom: 5,
                          color: "#1e293b",
                          // fontFamily: "Times-Bold",
                        }}
                      >
                        {achievement.title}:
                      </Text>

                      <View style={{ paddingLeft: "8px" }}>
                        <Text
                          style={{
                            //text
                            fontSize: 12,
                            marginBottom: 5,
                            fontWeight: 500,
                            color: "#020617",
                            lineHeight: "1.5px",
                          }}
                        >
                          • {achievement.description}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </Page>
        </Document>
      );
    default:
      return null;
  }
};

const ResumePDFDownloadLink = ({ data }) => (
  <PDFDownloadLink
    className="p-3  w-[180px] bg-blue-500 border-none rounded-lg text-white  hover:bg-blue-400 transition-all duration-300 mt-10"
    document={<ResumePDF data={data} />}
    fileName="resume.pdf"
  >
    {({ blob, url, loading, error }) =>
      loading ? "Loading document..." : "Download PDF"
    }
  </PDFDownloadLink>
);

export default ResumePDFDownloadLink;
