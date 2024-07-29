"use client";

const Preview = ({ data, isDarkMode }) => {
  // const generatePDF = () => {
  //   const doc = new jsPDF();
  //   doc.text(data.name, 20, 20);
  //   doc.text(data.email, 20, 25);
  //   doc.autoTable({
  //     startY: 30,
  //     head: [["Education"]],
  //     body: [[data.education]],
  //   });
  //   doc.autoTable({
  //     startY: 60,
  //     head: [["Experience"]],
  //     body: [[data.experience]],
  //   });
  //   doc.autoTable({ startY: 90, head: [["Skills"]], body: [[data.skills]] });
  //   doc.save("resume.pdf");
  // };

  return (
    <div>
      <h2 className="text-xl font-semibold mt-4">Preview Details</h2>
      <div
        className={`flex flex-col items-start flex-wrap w-full overflow-none border p-4 mt-4 ${isDarkMode ? "bg-slate-800" : "bg-blue-50"}`}
      >
        <p className="mt-3 mb-1">
          <strong>Name:</strong> {data.name}
        </p>
        <p className="mt-3 mb-1">
          <strong>Email:</strong> {data.email}
        </p>
        <p className="mt-3 mb-1">
          <strong>Education:</strong> {data.education}
        </p>
        <p className="mt-3 mb-1">
          <strong>Experience:</strong> {data.experience}
        </p>
        <p className="mt-3 mb-1">
          <strong>Skills:</strong> {data.skills}
        </p>
      </div>
      {/* <button
        onClick={generatePDF}
        className="bg-green-500 text-white py-2 px-4 mt-4"
      >
        Download PDF
      </button> */}
    </div>
  );
};

export default Preview;
