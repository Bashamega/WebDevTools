"use client";
import React, { useState } from "react";
import { NavBar } from "@/components/navbar";

const Converter = () => {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleConvert = () => {
    const convertedCode = convertJsToTs(inputCode);
    setOutputCode(convertedCode);
  };

  const convertJsToTs = (jsCode) => {
    let tsCode = jsCode
      // Convert object declarations with inferred types for common data types
      .replace(/const\s+(\w+)\s*=\s*{([^}]+)}/g, (match, varName, props) => {
        const propLines = props
          .split(",")
          .map((prop) => {
            const [key, value] = prop.split(":").map((s) => s.trim());

            // Infer types based on the value format
            const inferredType = inferType(value);

            // Ensure both key and value are present to avoid extra ': any'
            return key && value ? `${key}: ${inferredType}` : "";
          })
          .filter(Boolean)
          .join(", "); // Filter out any empty properties

        return `const ${varName}: { ${propLines} } = {${props}};`;
      })
      // Convert array declarations with inferred types
      .replace(
        /const\s+(\w+)\s*=\s*\[([^;]+)\]/g,
        (match, varName, elements) => {
          const inferredType = inferArrayType(elements);
          return `const ${varName}: ${inferredType}[] = [${elements}]`;
        },
      )
      // Convert let, var variables with inferred types
      .replace(
        /(const|let|var)\s+(\w+)\s*=\s*([^;]+)/g,
        (match, declarationType, varName, value) => {
          const inferredType = inferType(value);
          return `${declarationType} ${varName}: ${inferredType} = ${value}`;
        },
      )
      // Convert function declarations with inferred parameter types
      .replace(/function\s+(\w+)\s*\(([^)]*)\)\s*{/g, (match, name, params) => {
        const typedParams = params
          .split(",")
          .map((param) => {
            const [paramName] = param.trim().split(" ");
            return `${paramName}: any`; // Default to `any` for parameters
          })
          .join(", ");

        return `function ${name}(${typedParams}): void {`;
      })
      // Clean up extra semicolons
      .replace(/;\s*;/g, ";") // Remove double semicolons
      .replace(/;\s*}/g, "}"); // Remove semicolon before closing braces

    return tsCode;
  };

  // Type inference function for simple values
  const inferType = (value) => {
    if (!isNaN(Number(value))) return "number";
    if (/^".*"$/.test(value) || /^'.*'$/.test(value)) return "string";
    if (/true|false/.test(value)) return "boolean";
    if (/^\[.*\]$/.test(value)) return "any[]"; // Default for arrays
    if (/^\{.*\}$/.test(value)) return "object"; // Default for objects
    return "any"; // Fallback for other types
  };

  // Type inference for array elements
  const inferArrayType = (elements) => {
    const elementArray = elements.split(",").map((el) => el.trim());
    const inferredType = elementArray.every((el) => !isNaN(Number(el)))
      ? "number"
      : elementArray.every((el) => /^".*"$/.test(el))
        ? "string"
        : "any"; // Fallback for mixed or unknown types

    return inferredType;
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-500"
      } min-h-screen w-full pb-2`}
    >
      <NavBar
        title={"GitHub Issue Finder"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      {/* <h1 className="text-2xl font-bold text-center mb-4">JS to TS Converter</h1> */}
      <h1 className="relative z-10 font-sans text-5xl font-bold text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600 mb-7 mt-4">
        JS to TS Converter
      </h1>

      <div className="flex flex-col md:flex-row gap-2">
        <textarea
          className={`
            w-full
            ml-7
            mr-4 
            p-2
            rounded-lg 
            border border-gray-300 
            focus:ring-2 focus:ring-blue-500 
            focus:outline-none 
            transition duration-200 ease-in-out 
            text-gray-700 
            placeholder-gray-400 
            shadow-sm 
            hover:shadow-md
            ${
              isDarkMode
                ? "bg-gray-800 text-gray-400"
                : "bg-gray-200 text-gray-500"
            } `}
          rows="10"
          placeholder="Paste JavaScript code here..."
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        ></textarea>

        <textarea
          className={`
            w-full 
            mr-7
            p-2
            rounded-lg 
            border border-gray-300 
            focus:ring-2 focus:ring-blue-500 
            focus:outline-none 
            transition duration-200 ease-in-out 
            text-gray-700 
            placeholder-gray-400 
            shadow-sm 
            hover:shadow-md
            ${
              isDarkMode
                ? "bg-gray-800 text-gray-400"
                : "bg-gray-200 text-gray-500"
            } `}
          rows="10"
          readOnly
          value={outputCode}
        ></textarea>
      </div>

      <button
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 mt-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 ml-7"
        onClick={handleConvert}
      >
        Convert to TypeScript
      </button>
    </div>
  );
};

export default Converter;
