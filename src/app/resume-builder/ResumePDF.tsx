"use client";

import React from "react";

// import Home from "../app/resume-builder/page";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  //PDFDownloadLink,
  Image,
  Link,
  Svg,
  Path,
} from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FaCloud, FaGithub, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";

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
    alignItems: "flex-start",
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

const EmailIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path
      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
      fill="black"
    />
  </Svg>
);

const PhoneIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 512 512">
    <Path
      d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"
      fill="#000"
    />
  </Svg>
);

interface IconProps {
  width?: string;
  height?: string;
  color?: string;
}

const LinkedInIcon: React.FC<IconProps> = (props) => (
  <Svg
    width={props.width || "12"}
    height={props.height || "12"}
    viewBox="0 0 448 512"
    {...props}
  >
    <Path
      d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
      fill="#000"
    />
  </Svg>
);

interface GithubIconProps {
  width?: string;
  height?: string;
  color?: string;
}

const GithubIcon: React.FC<GithubIconProps> = (props) => (
  <Svg
    width={props.width || "12"}
    height={props.height || "12"}
    viewBox="0 0 448 512"
    {...props}
  >
    <Path
      d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM277.3 415.7c-8.4 1.5-11.5-3.7-11.5-8 0-5.4.2-33 .2-55.3 0-15.6-5.2-25.5-11.3-30.7 37-4.1 76-9.2 76-73.1 0-18.2-6.5-27.3-17.1-39 1.7-4.3 7.4-22-1.7-45-13.9-4.3-45.7 17.9-45.7 17.9-13.2-3.7-27.5-5.6-41.6-5.6-14.1 0-28.4 1.9-41.6 5.6 0 0-31.8-22.2-45.7-17.9-9.1 22.9-3.5 40.6-1.7 45-10.6 11.7-15.6 20.8-15.6 39 0 63.6 37.3 69 74.3 73.1-4.8 4.3-9.1 11.7-10.6 22.3-9.5 4.3-33.8 11.7-48.3-13.9-9.1-15.8-25.5-17.1-25.5-17.1-16.2-.2-1.1 10.2-1.1 10.2 10.8 5 18.4 24.2 18.4 24.2 9.7 29.7 56.1 19.7 56.1 19.7 0 13.9.2 36.5.2 40.6 0 4.3-3 9.5-11.5 8-66-22.1-112.2-84.9-112.2-158.3 0-91.8 70.2-161.5 162-161.5S388 165.6 388 257.4c.1 73.4-44.7 136.3-110.7 158.3zm-98.1-61.1c-1.9.4-3.7-.4-3.9-1.7-.2-1.5 1.1-2.8 3-3.2 1.9-.2 3.7.6 3.9 1.9.3 1.3-1 2.6-3 3zm-9.5-.9c0 1.3-1.5 2.4-3.5 2.4-2.2.2-3.7-.9-3.7-2.4 0-1.3 1.5-2.4 3.5-2.4 1.9-.2 3.7.9 3.7 2.4zm-13.7-1.1c-.4 1.3-2.4 1.9-4.1 1.3-1.9-.4-3.2-1.9-2.8-3.2.4-1.3 2.4-1.9 4.1-1.5 2 .6 3.3 2.1 2.8 3.4zm-12.3-5.4c-.9 1.1-2.8.9-4.3-.6-1.5-1.3-1.9-3.2-.9-4.1.9-1.1 2.8-.9 4.3.6 1.3 1.3 1.8 3.3.9 4.1zm-9.1-9.1c-.9.6-2.6 0-3.7-1.5s-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3 1.1 1.5 1.1 3.3 0 4.1zm-6.5-9.7c-.9.9-2.4.4-3.5-.6-1.1-1.3-1.3-2.8-.4-3.5.9-.9 2.4-.4 3.5.6 1.1 1.3 1.3 2.8.4 3.5zm-6.7-7.4c-.4.9-1.7 1.1-2.8.4-1.3-.6-1.9-1.7-1.5-2.6.4-.6 1.5-.9 2.8-.4 1.3.7 1.9 1.8 1.5 2.6z"
      fill="#000"
    />
  </Svg>
);

interface WebsiteIconProps {
  width?: string;
  height?: string;
  color?: string;
}

const WebsiteIcon: React.FC<WebsiteIconProps> = (props) => (
  <Svg
    width={props.width || "12"}
    height={props.height || "12"}
    viewBox="0 0 640 512"
    {...props}
  >
    <Path
      d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"
      fill={props.color || "#000"}
    />
  </Svg>
);

interface AddIconProps {
  width?: string;
  height?: string;
  color?: string;
}

const AddIcon: React.FC<AddIconProps> = (props) => (
  <Svg width="12" height="12" viewBox="0 0 384 512" {...props}>
    <Path
      d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
      fill={props.color || "#000"}
    />
  </Svg>
);

// interface ResumeData {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   image: string;
//   imageShape: string;
//   workExperience: { title: string; company: string; description: string }[];
//   projects: { title: string; liveUrl: string; description: string }[];
//   education: { degree: string; institution: string; description: string }[];
//   skills: { category: string; skills: string[] }[];
//   links: { linkedIn?: string; github?: string; website?: string };
//   achievements: { title: string; description: string }[];
//   template: string;

// }

//const ResumePDF = ({ data }: { data: ResumeData }) => {
//const ResumePDF: React.FC<{ data: ResumeData }> = ({ data }) => {

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  imageShape: string;
  workExperience: {
    title: string;
    company: string;
    description: string;
  }[];
  projects: {
    title: string;
    liveUrl: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    description: string;
  }[];
  skills: {
    category: string;
    skills: string[];
  }[];
  links: {
    linkedIn?: string;
    github?: string;
    website?: string;
  };
  achievements: {
    title: string;
    description: string;
  }[];
  template: string;
}

const ResumePDF: React.FC<{ data: ResumeData }> = ({ data }) => {
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
                {/* {image && (
                  <Image
                    style={
                      imageShape === "circle"
                        ? styles1.circleImage
                        : styles1.rectangleImage
                    }
                    src={image || ""} */}

                {/* {image && (
  <Image
    style={
      imageShape === "circle"
        ? styles1.circleImage
        : styles1.rectangleImage
    }
    src={image || ""}
    alt={imageShape === "circle" ? "Circular profile image" : "Rectangular profile image"} // Add a meaningful alt text
  />
)} */}

                {image && (
                  <Image
                    style={
                      imageShape === "circle"
                        ? styles1.circleImage
                        : styles1.rectangleImage
                    }
                    src={image || ""}
                    alt-text="image" // Decorative image
                  />
                )}
              </View>
              <View style={styles1.profileDetails}>
                <Text style={styles1.name}>{name}</Text>
                {workExperience[0].title && (
                  <Text style={styles1.profession}>
                    {workExperience[0].title}
                  </Text>
                )}
                {email && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <EmailIcon />
                    <Link
                      style={{
                        marginLeft: 4,
                        fontSize: 12,
                        color: "#000",
                        textDecoration: "none",
                      }}
                      src={`mailto:${email}`}
                    >
                      {email}
                    </Link>
                  </View>
                )}
                {address && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <AddIcon />
                    <Text
                      style={{
                        marginLeft: 4,
                        fontSize: 12,
                        color: "#000",
                      }}
                    >
                      {address}
                    </Text>
                  </View>
                )}
                {phone && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <PhoneIcon />
                    <Link
                      style={{
                        marginLeft: 4,
                        fontSize: 12,
                        color: "#000",
                        textDecoration: "none",
                      }}
                      src={`tel:${phone}`}
                    >
                      {phone}
                    </Link>
                  </View>
                )}
                {links.linkedIn && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <LinkedInIcon />
                    <Link
                      style={{
                        marginLeft: 4,
                        fontSize: 12,
                        color: "blue",
                        textDecoration: "none",
                      }}
                      src={links.linkedIn}
                    >
                      {links.linkedIn}
                    </Link>
                  </View>
                )}
                {links.github && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <GithubIcon />
                    <Link
                      style={{
                        marginLeft: 4,
                        fontSize: 12,
                        color: "#000",
                        textDecoration: "none",
                      }}
                      src={links.github}
                    >
                      {links.github}
                    </Link>
                  </View>
                )}
                {links.website && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <WebsiteIcon />
                    <Link
                      style={{
                        marginLeft: 4,
                        fontSize: 12,
                        color: "#000",
                        textDecoration: "none",
                      }}
                      src={links.website}
                    >
                      {links.website}
                    </Link>
                  </View>
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
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
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
                    alignItems: "flex-start", // Corrected alignment
                    justifyContent: "flex-start", // Corrected alignment
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
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginBottom: 10,
                  width: "100%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "5px",
                    width: "70%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 800,
                    }}
                  >
                    {name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#334155",
                    }}
                  >
                    {workExperience[0].title}
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "5px",
                    width: "55%",
                  }}
                >
                  {email && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 2,
                      }}
                    >
                      <EmailIcon />
                      <Link
                        style={{
                          marginLeft: 4,
                          fontSize: 12,
                          color: "#000",
                          textDecoration: "none",
                        }}
                        href={`mailto:${email}`}
                      >
                        {email}
                      </Link>
                    </View>
                  )}
                  {phone && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 2,
                      }}
                    >
                      <PhoneIcon />
                      <Link
                        style={{
                          marginLeft: 4,
                          fontSize: 12,
                          color: "#000",
                          textDecoration: "none",
                        }}
                        href={`tel:${phone}`}
                      >
                        {phone}
                      </Link>
                    </View>
                  )}
                  {address && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 2,
                      }}
                    >
                      <AddIcon />
                      <Text
                        style={{
                          marginLeft: 4,
                          fontSize: 12,
                          color: "#000",
                        }}
                      >
                        {address}
                      </Text>
                    </View>
                  )}
                  {links.linkedIn && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 2,
                      }}
                    >
                      <LinkedInIcon />
                      <Link
                        style={{
                          marginLeft: 4,
                          fontSize: 12,
                          color: "blue",
                          textDecoration: "none",
                        }}
                        href={links.linkedIn}
                      >
                        {links.linkedIn}
                      </Link>
                    </View>
                  )}
                  {links.github && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 2,
                      }}
                    >
                      <GithubIcon />
                      <Link
                        style={{
                          marginLeft: 4,
                          fontSize: 12,
                          color: "blue",
                          textDecoration: "none",
                        }}
                        href={links.github}
                      >
                        {links.github}
                      </Link>
                    </View>
                  )}
                  {links.website && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 2,
                      }}
                    >
                      <WebsiteIcon />
                      <Link
                        style={{
                          marginLeft: 4,
                          fontSize: 12,
                          color: "blue",
                          textDecoration: "none",
                        }}
                        href={links.website}
                      >
                        {links.website}
                      </Link>
                    </View>
                  )}
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
                  {/* {workExperience.map((workExp, index) => (
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
                      </Text> */}

                  {workExperience.map((workExp, index) => (
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
                        }}
                      >
                        {workExp.title || "Untitled Work Experience"}
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
                            textDecoration: "underline",
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
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    {skills.map((skillsCategory, index) => (
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
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

// interface BlobProviderParams {
//   blob: Blob;
//   url: string;
//   loading: boolean;
// }

// const ResumePDFDownloadLink: React.FC<{ data: ResumeData }> = ({ data }) => (
//   <PDFDownloadLink
//     className="p-3 w-[180px] bg-blue-500 border-none rounded-lg text-white hover:bg-blue-400 transition-all duration-300 mt-10"
//     document={<ResumePDF data={data} />}
//     fileName="resume.pdf"
//   >
//     {({ loading }: BlobProviderParams) =>
//       loading ? "Loading document..." : "Download PDF"
//     }
//   </PDFDownloadLink>

//   interface PDFDownloadLinkParams {
//     loading: boolean;
//     url: string;
//     blob: Blob;
//   }

//   const ResumePDFDownloadLink: React.FC<{ data: ResumeData }> = ({ data }) => (
//     <PDFDownloadLink
//       className="p-3 w-[180px] bg-blue-500 border-none rounded-lg text-white hover:bg-blue-400 transition-all duration-300 mt-10"
//       document={<ResumePDF data={data} />}
//       fileName="resume.pdf"
//     >
//       {(params: PDFDownloadLinkParams) => {
//         const { loading } = params;
//         return <>{loading ? "Loading document..." : "Download PDF"}</>;
//       }}
//     </PDFDownloadLink>
//   );

// export default ResumePDFDownloadLink;

// interface PDFDownloadLinkParams {
//   loading: boolean;
//   url?: string;
//   blob?: Blob;
// }

// const ResumePDFDownloadLink: React.FC<{ data: ResumeData }> = ({ data }) => (
//   <PDFDownloadLink
//     className="p-3 w-[180px] bg-blue-500 border-none rounded-lg text-white hover:bg-blue-400 transition-all duration-300 mt-10"
//     document={<ResumePDF data={data} />}
//     fileName="resume.pdf"
//   >

//       {({ loading }: { loading: boolean }) =>
//     loading ? <span>Loading document...</span> : <span>Download PDF</span>
//   }

//   </PDFDownloadLink>
// );

const ResumePDFDownloadLink: React.FC<{ data: ResumeData }> = ({ data }) => (
  <PDFDownloadLink
    className="p-3 w-[180px] bg-blue-500 border-none rounded-lg text-white hover:bg-blue-400 transition-all duration-300 mt-10"
    document={<ResumePDF data={data} />}
    fileName="resume.pdf"
  >
    {/* {({ loading }: { loading: boolean }) => 
      loading ? <span>Loading document...</span> : <span>Download PDF</span>
    } */}
  </PDFDownloadLink>
);

export default ResumePDFDownloadLink;
