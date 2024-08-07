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
});

const styles2 = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
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
});

const ResumePDF = ({ data }) => {
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

  switch (template) {
    case "template1":
      return (
        <Document>
          <Page size="A4" style={styles1.page}>
            <View style={styles1.header}>
              <View>
                {image && <Image style={styles1.profileImage} src={image} />}
              </View>
              <View style={styles1.profileDetails}>
                <Text style={styles1.name}>{name}</Text>
                <Text style={styles1.profession}>
                  {workExperience[0].title}
                </Text>
                <Text style={styles1.contactInfo}>Email: {email}</Text>
                <Text style={styles1.contactInfo}>Phone: {phone}</Text>

                {links.linkedIn && (
                  <Text style={styles1.contactInfo}>
                    LinkedIn:{" "}
                    <Link src={links.linkedIn} style={styles1.link}>
                      {links.linkedIn}
                    </Link>
                  </Text>
                )}

                {links.github && (
                  <Text style={styles1.contactInfo}>
                    GitHub:{" "}
                    <Link src={links.github} style={styles1.link}>
                      {links.github}
                    </Link>
                  </Text>
                )}

                {links.website && (
                  <Text style={styles1.contactInfo}>
                    Website:{" "}
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
                  <Text style={styles1.desc}>{job.description}</Text>
                </View>
              ))}
            </View>

            <View style={styles1.view}>
              <Text style={styles1.sectionTitle}>Education</Text>
              {education.map((edu, index) => (
                <View key={index}>
                  <Text style={styles1.title}>{edu.degree}</Text>
                  <Text style={styles1.subtitle}>{edu.institution}</Text>
                  <Text style={styles1.desc}>{edu.description}</Text>
                </View>
              ))}
            </View>

            <View style={styles1.view}>
              <Text style={styles1.sectionTitle}>Skills</Text>
              <View style={styles1.skills}>
                {/* {skills.map((skill, index) => (
                  <Text key={index} style={styles1.skill}>
                    {skill}
                  </Text>
                ))} */}
              </View>
            </View>
          </Page>
        </Document>
      );

    case "template2":
      return (
        <Document>
          <Page size="A4" style={styles2.page}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={styles2.sidebar}>
                <Image style={styles2.profileImage} src={image} />
                <Text style={styles2.name}>{name}</Text>
                <Text style={styles2.profession}>
                  {workExperience[0].title}
                </Text>
                <Text style={styles2.contactInfo}>Email: {email}</Text>
                <Text style={styles2.contactInfo}>Phone: {phone}</Text>

                <Text style={styles2.contactInfo}>
                  LinkedIn:{" "}
                  <Link src={links.linkedIn} style={styles2.link}>
                    {links.linkedIn}
                  </Link>
                </Text>

                <Text style={styles2.contactInfo}>
                  GitHub:{" "}
                  <Link src={links.github} style={styles2.link}>
                    {" "}
                    {links.github}
                  </Link>
                </Text>

                <Text style={styles2.contactInfo}>
                  Website:{" "}
                  <Link src={links.website} style={styles2.link}>
                    {" "}
                    {links.website}
                  </Link>
                </Text>
              </View>
              <View style={styles2.main}>
                <View style={styles2.experience}>
                  <Text style={styles2.sectionTitle}>Experience</Text>

                  {workExperience.map((workExp, index) => (
                    <View key={index}>
                      <Text style={styles2.text}>
                        <Text style={{ fontWeight: "bold" }}>
                          {workExp.title}
                        </Text>{" "}
                        at
                        {workExp.company}
                      </Text>
                      <Text style={styles2.text}>{workExp.description}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles2.education}>
                  <Text style={styles2.sectionTitle}>Education</Text>
                  {education.map((edu, index) => (
                    <View key={index}>
                      <Text style={styles2.text}>
                        <Text style={{ fontWeight: "bold" }}>{edu.degree}</Text>{" "}
                        {edu.institution}
                      </Text>
                      <Text style={styles2.text}>{edu.description}</Text>
                    </View>
                  ))}
                </View>

                <Text style={styles2.sectionTitle}>Skills</Text>

                {skills.map((skill, index) => (
                  <View key={index} style={styles2.skills}>
                    <Text style={styles2.skill}>{skill}</Text>
                  </View>
                ))}
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
