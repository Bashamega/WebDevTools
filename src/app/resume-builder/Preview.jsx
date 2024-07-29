"use client";

import jsPDF from "jspdf";
import "jspdf-autotable";

const Preview = ({ data }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(data.name, 10, 10);
    doc.text(data.email, 10, 20);
    doc.autoTable({
      startY: 30,
      head: [["Education"]],
      body: [[data.education]],
    });
    doc.autoTable({
      startY: 50,
      head: [["Experience"]],
      body: [[data.experience]],
    });
    doc.autoTable({ startY: 70, head: [["Skills"]], body: [[data.skills]] });
    doc.save("resume.pdf");
  };

  return (
    <div>
      <h2 className="text-xl">Preview</h2>
      <div className="border p-4 mt-4">
        <p>
          <strong>Name:</strong> {data.name}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Education:</strong> {data.education}
        </p>
        <p>
          <strong>Experience:</strong> {data.experience}
        </p>
        <p>
          <strong>Skills:</strong> {data.skills}
        </p>
      </div>
      <button
        onClick={generatePDF}
        className="bg-green-500 text-white py-2 px-4 mt-4"
      >
        Download PDF
      </button>
    </div>
  );
};

export default Preview;
