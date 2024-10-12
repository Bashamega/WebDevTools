"use client";
import React, { useState } from "react";
import { NavBar } from "@/components/navbar";

const Converter = () => {
  const [inputJSON, setInputJSON] = useState("");
  const [outputJava, setOutputJava] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    if (outputJava) {
      navigator.clipboard.writeText(outputJava);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleConvert = () => {
    try {
      const jsonObject = JSON.parse(inputJSON);
      const convertedCode = convertJsonToJava(jsonObject, "RootClass");
      setOutputJava(convertedCode);
    } catch (error) {
      setOutputJava(`Error: ${error.message}. Please check your JSON input.`);
    }
  };

  const convertJsonToJava = (json, className) => {
    let javaCode = `public class ${className} {\n`;

    for (const [key, value] of Object.entries(json)) {
      const type = getJavaType(value);
      const fieldName = toCamelCase(key);
      javaCode += `    private ${type} ${fieldName};\n`;
    }

    // Generate getters and setters
    for (const [key, value] of Object.entries(json)) {
      const type = getJavaType(value);
      const fieldName = toCamelCase(key);
      const capitalizedFieldName =
        fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

      // Getter
      javaCode += `\n    public ${type} get${capitalizedFieldName}() {\n`;
      javaCode += `        return ${fieldName};\n`;
      javaCode += `    }\n`;

      // Setter
      javaCode += `\n    public void set${capitalizedFieldName}(${type} ${fieldName}) {\n`;
      javaCode += `        this.${fieldName} = ${fieldName};\n`;
      javaCode += `    }\n`;
    }

    javaCode += "}\n";

    // Generate nested classes
    for (const [key, value] of Object.entries(json)) {
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        const nestedClassName = key.charAt(0).toUpperCase() + key.slice(1);
        javaCode += "\n" + convertJsonToJava(value, nestedClassName);
      }
    }

    return javaCode;
  };

  const getJavaType = (value) => {
    if (value === null) return "Object";
    if (typeof value === "string") return "String";
    if (typeof value === "number") {
      return Number.isInteger(value) ? "int" : "double";
    }
    if (typeof value === "boolean") return "boolean";
    if (Array.isArray(value)) {
      if (value.length === 0) return "List<Object>";
      return `List<${getJavaType(value[0])}>`;
    }
    if (typeof value === "object") {
      return capitalizeFirstLetter(value.constructor.name);
    }
    return "Object";
  };

  const toCamelCase = (str) => {
    return str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div
      className={`${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-500"} min-h-screen w-full pb-2`}
    >
      <NavBar
        title="JSON to Java Converter"
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <h1 className="relative z-10 font-sans text-5xl font-bold text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600 mb-7 mt-4">
        JSON to Java Converter
      </h1>

      <div className="flex flex-col md:flex-row gap-2">
        <textarea
          className={`w-full ml-7 mr-4 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 ease-in-out placeholder-gray-400 shadow-sm hover:shadow-md resize-none ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-500"}`}
          rows="10"
          placeholder="Paste JSON here..."
          value={inputJSON}
          onChange={(e) => setInputJSON(e.target.value)}
        ></textarea>

        <div className="relative w-full mr-7">
          <textarea
            className={`w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 ease-in-out placeholder-gray-400 shadow-sm hover:shadow-md resize-none ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-500"}`}
            rows="10"
            readOnly
            value={outputJava}
          ></textarea>

          <button
            className={`absolute top-2 right-2 ${
              copySuccess ? "bg-green-500" : "bg-gray-200 hover:bg-gray-300"
            } rounded p-2 focus:outline-none transition-colors duration-200`}
            onClick={handleCopy}
          >
            {copySuccess ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 7.707a1 1 0 00-1.414-1.414L9 12.586l-2.293-2.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <button
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 mt-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 ml-7"
        onClick={handleConvert}
      >
        Convert to Java
      </button>
    </div>
  );
};

export default Converter;
