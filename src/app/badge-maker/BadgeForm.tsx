// app/BadgeForm.jsx
// "use client";

// import { useState } from "react";
// import React from "react";

// interface BadgeFormProps {
//   onSubmit: (badgeData: any) => void;
//   isDarkMode: boolean;
// }
// interface BadgeData {
//   label: string;
//   message: string;
//   labelColor: string;
//   color: string;
//   logoBase64: string;
//   links: string[];
//   style: string;
// }

// export default function BadgeForm({ onSubmit, isDarkMode }: BadgeFormProps){
//   const [label, setLabel] = useState("");
//   const [message, setMessage] = useState("");
//   const [labelColor, setLabelColor] = useState("");
//   const [color, setColor] = useState("");
//   const [logoBase64, setLogoBase64] = useState("");
//   const [links, setLinks] = useState("");
//   const [style, setStyle] = useState("flat");

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
//     e.preventDefault();
//     const badgeData: BadgeData = {
//       label,
//       message,
//       labelColor,
//       color,
//       logoBase64: logoBase64 || "",
//       links: links
//         .split("\n")
//         .map((link) => link.trim())
//         .filter((link) => link),
//       style,
//     };
//     onSubmit(badgeData);
//   };

//   return (
//     <div
//       className={`${
//         isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-800"
//       } min-h-screen flex-col justify-center w-screen mt-2.5 `}
//     >
//       <div className="w-2/3 mx-auto">
//         <h1 className="text-4xl font-bold mb-6 text-center">
//           Badge Customizer
//         </h1>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-lg font-medium mb-2" htmlFor="label">
//               Badge Label
//             </label>
//             <input
//               id="label"
//               type="text"
//               className={`${
//                 isDarkMode
//                   ? "bg-gray-800 text-gray-200"
//                   : "bg-white text-gray-900 border-gray-400"
//               } w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               value={label}
//               onChange={(e) => setLabel(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-lg font-medium mb-2" htmlFor="message">
//               Badge Message
//             </label>
//             <input
//               id="message"
//               type="text"
//               className={`${
//                 isDarkMode
//                   ? "bg-gray-800 text-gray-200"
//                   : "bg-white text-gray-900 border-gray-400"
//               } w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-lg font-medium mb-2"
//               htmlFor="labelColor"
//             >
//               Label Color
//             </label>
//             <input
//               id="labelColor"
//               type="color"
//               className={`${
//                 isDarkMode
//                   ? "bg-gray-800 text-gray-200"
//                   : "bg-white text-gray-900 border-gray-400"
//               } w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               value={labelColor}
//               onChange={(e) => setLabelColor(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-lg font-medium mb-2" htmlFor="color">
//               Badge Color
//             </label>
//             <input
//               id="color"
//               type="color"
//               className={`${
//                 isDarkMode
//                   ? "bg-gray-800 text-gray-200"
//                   : "bg-white text-gray-900 border-gray-400"
//               } w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               value={color}
//               onChange={(e) => setColor(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-lg font-medium mb-2"
//               htmlFor="logoBase64"
//             >
//               Logo (Base64 - optional)
//             </label>
//             <input
//               id="logoBase64"
//               type="text"
//               className={`${
//                 isDarkMode
//                   ? "bg-gray-800 text-gray-200"
//                   : "bg-white text-gray-900 border-gray-400"
//               } w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               value={logoBase64}
//               onChange={(e) => setLogoBase64(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-lg font-medium mb-2" htmlFor="links">
//               Links (one per line - optional)
//             </label>
//             <textarea
//               id="links"
//               rows={4}
//               className={`${
//                 isDarkMode
//                   ? "bg-gray-800 text-gray-200"
//                   : "bg-white text-gray-900 border-gray-400"
//               } w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               value={links}
//               onChange={(e) => setLinks(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-lg font-medium mb-2" htmlFor="style">
//               Badge Style
//             </label>
//             <select
//               id="style"
//               className={`${
//                 isDarkMode
//                   ? "bg-gray-800 text-gray-200"
//                   : "bg-white text-gray-900 border-gray-400"
//               } w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               value={style}
//               onChange={(e) => setStyle(e.target.value)}
//             >
//               <option value="flat">Flat</option>
//               <option value="flat-square">Flat Square</option>
//               <option value="plastic">Plastic</option>
//               <option value="for-the-badge">For the Badge</option>
//               <option value="social">Social</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500  text-white px-4 py-2 rounded-lg hover:bg-blue-600 "
//           >
//             Generate Badge
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";

interface BadgeFormProps {
  onSubmit: (badgeData: any) => void;
  isDarkMode: boolean;
}

interface BadgeData {
  label: string;
  message: string;
  labelColor: string;
  color: string;
  logoBase64: string;
  links: string[];
  style: string;
}

export default function BadgeForm({ onSubmit, isDarkMode }: BadgeFormProps) {
  const [label, setLabel] = useState("");
  const [message, setMessage] = useState("");
  const [labelColor, setLabelColor] = useState("#000000");
  const [color, setColor] = useState("#4CAF50");
  const [logoBase64, setLogoBase64] = useState("");
  const [links, setLinks] = useState("");
  const [style, setStyle] = useState("flat");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!label || !message) {
      setError("Both Label and Message fields are required.");
      return;
    }

    setError(""); // Clear any existing error
    const badgeData: BadgeData = {
      label,
      message,
      labelColor,
      color,
      logoBase64: logoBase64 || "",
      links: links
        .split("\n")
        .map((link) => link.trim())
        .filter((link) => link),
      style,
    };
    onSubmit(badgeData);
  };

  const inputClasses = `w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    isDarkMode
      ? "bg-gray-800 text-gray-200"
      : "bg-white text-gray-900 border-gray-400"
  }`;

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-800"
      } min-h-screen flex-col justify-center w-screen mt-2.5`}
    >
      <div className="w-2/3 mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Badge Customizer
        </h1>

        {error && (
          <div className="mb-4 text-red-500 font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="label">
              Badge Label <span className="text-red-500">*</span>
            </label>
            <input
              id="label"
              type="text"
              aria-label="Badge Label"
              className={inputClasses}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="message">
              Badge Message <span className="text-red-500">*</span>
            </label>
            <input
              id="message"
              type="text"
              aria-label="Badge Message"
              className={inputClasses}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-lg font-medium mb-2"
              htmlFor="labelColor"
            >
              Label Color
            </label>
            <input
              id="labelColor"
              type="color"
              aria-label="Label Color"
              className={inputClasses}
              value={labelColor}
              onChange={(e) => setLabelColor(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="color">
              Badge Color
            </label>
            <input
              id="color"
              type="color"
              aria-label="Badge Color"
              className={inputClasses}
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-lg font-medium mb-2"
              htmlFor="logoBase64"
            >
              Logo (Base64 - optional)
            </label>
            <input
              id="logoBase64"
              type="text"
              aria-label="Logo Base64"
              className={inputClasses}
              value={logoBase64}
              onChange={(e) => setLogoBase64(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="links">
              Links (one per line - optional)
            </label>
            <textarea
              id="links"
              rows={4}
              aria-label="Badge Links"
              className={inputClasses}
              value={links}
              onChange={(e) => setLinks(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="style">
              Badge Style
            </label>
            <select
              id="style"
              aria-label="Badge Style"
              className={inputClasses}
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="flat">Flat</option>
              <option value="flat-square">Flat Square</option>
              <option value="plastic">Plastic</option>
              <option value="for-the-badge">For the Badge</option>
              <option value="social">Social</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Generate Badge
          </button>
        </form>
      </div>
    </div>
  );
}
