// app/BadgeForm.jsx
"use client";

import { useState } from "react";

export default function BadgeForm({ onSubmit, isDarkMode }) {
  const [label, setLabel] = useState("");
  const [message, setMessage] = useState("");
  const [labelColor, setLabelColor] = useState("");
  const [color, setColor] = useState("");
  const [logoBase64, setLogoBase64] = useState("");
  const [links, setLinks] = useState("");
  const [style, setStyle] = useState("flat");

  const handleSubmit = (e) => {
    e.preventDefault();
    const badgeData = {
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

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-800"
      } min-h-screen flex-col justify-center w-screen mt-2.5 `}
    >
      <div className="w-2/3 mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Badge Customizer
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="label">
              Badge Label
            </label>
            <input
              id="label"
              type="text"
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="message">
              Badge Message
            </label>
            <input
              id="message"
              type="text"
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              rows="4"
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900 border-gray-400"
              } w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
            className="bg-blue-500  text-white px-4 py-2 rounded-lg hover:bg-blue-600 "
          >
            Generate Badge
          </button>
        </form>
      </div>
    </div>
  );
}
