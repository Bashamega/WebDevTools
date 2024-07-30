import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
    borderBottomStyle: "solid",
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  contact: {
    fontSize: 12,
    marginTop: 5,
  },
  heading: {
    fontSize: 18,
    marginBottom: 5,
    color: "#333",
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 2,
  },
  company: {
    fontSize: 10,
    fontStyle: "italic",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    marginBottom: 10,
  },
  skill: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: "bold",
  },
});

const ResumePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.contact}>{data.email}</Text>
        <Text style={styles.contact}>{data.phone}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Work Experience</Text>
        {data.workExperience.map((job, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.company}>{job.company}</Text>
            <Text style={styles.description}>{job.description}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Education</Text>
        {data.education.map((edu, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.jobTitle}>{edu.degree}</Text>
            <Text style={styles.company}>{edu.institution}</Text>
            <Text style={styles.description}>{edu.description}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Skills</Text>
        {data.skills.map((skill, index) => (
          <Text key={index} style={styles.skill}>
            {skill}
          </Text>
        ))}
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
