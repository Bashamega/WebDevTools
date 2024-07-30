"use client";

const Preview = ({ data, isDarkMode }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mt-4">Preview Details</h2>
      <div
        className={`flex flex-col items-start flex-wrap w-full overflow-none border p-4 mt-4 ${isDarkMode ? "bg-slate-800" : "bg-blue-50"}`}
      >
        <div className="w-full mx-4">
          <p className="mt-3 mb-1 text-2xl font-semibold">
            <strong>Name:</strong> {data.name}
          </p>
          <p className="mt-3 mb-1 text-sm">
            <strong>Email:</strong> {data.email}
          </p>

          {data.phone && (
            <p className="mt-3 mb-1 text-sm">
              <strong>Number:</strong> {data.phone}
            </p>
          )}
        </div>

        <div className="w-full mx-6 ">
          <p className="mt-3 text-xl mb-4">
            <strong>Work Experience:</strong>
            <ul className="mx-4 mt-4">
              <li>{data.workExperience[0].title},</li>

              <li>{data.workExperience[0].company},</li>

              <li>{data.workExperience[0].description},</li>
            </ul>
          </p>
          <p className="mt-3 mb4 text-xl">
            <strong>Education:</strong>
            <ul className="mx-4 mt-4">
              <li>{data.education[0].degree},</li>

              <li>{data.education[0].institution},</li>

              <li>{data.education[0].description},</li>
            </ul>
          </p>
          <p className="mt-3 mb-4">
            <strong>Skills:</strong>

            <p className="mx-4 mt-4">{data.skills}</p>
          </p>
        </div>
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
