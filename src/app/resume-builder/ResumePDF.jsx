import React from "react";
// import data from "./sample.json";

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

// Define styles
const styles = StyleSheet.create({
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

const ResumePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          {data.image && <Image style={styles.profileImage} src={data.image} />}
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.profession}>{data.workExperience[0].title}</Text>
          <Text style={styles.contactInfo}>Email: {data.email}</Text>
          <Text style={styles.contactInfo}>Phone: {data.phone}</Text>

          {data.links.linkedIn && (
            <Text style={styles.contactInfo}>
              LinkedIn:{" "}
              <Link src={data.links.linkedIn} style={styles.link}>
                {data.links.linkedIn}
              </Link>
            </Text>
          )}

          {data.links.github && (
            <Text style={styles.contactInfo}>
              GitHub:{" "}
              <Link src={data.links.github} style={styles.link}>
                {data.links.github}
              </Link>
            </Text>
          )}

          {data.links.website && (
            <Text style={styles.contactInfo}>
              Website:{" "}
              <Link src={data.links.website} style={styles.link}>
                {data.links.website}
              </Link>
            </Text>
          )}
        </View>
      </View>
      <View style={styles.view}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.workExperience.map((job) => (
          <View key={job.title}>
            <Text style={styles.title}>{job.title}</Text>
            <Text style={styles.subtitle}>{job.company}</Text>
            <Text style={styles.desc}>{job.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.view}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu, index) => (
          <View key={index}>
            <Text style={styles.title}>{edu.degree}</Text>
            <Text style={styles.subtitle}>{edu.institution}</Text>
            <Text style={styles.desc}>{edu.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.view}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skills}>
          {data.skills.map((skill) => (
            <Text key={skill.skill} style={styles.skill}>
              {skill}
            </Text>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

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
