"use client";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { HexColorPicker } from "react-colorful";
import { NavBar } from "@/app/components/navbar";

export default function ColorPicker() {
  const [hexColor, setHexColor] = useState("#ffffff");
  const [RGBColor, setRGBColor] = useState();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toRGB = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : null;
  };

  const handleHex = () => {
    navigator.clipboard.writeText(hexColor);
    toast("Hex Code Copied!!", {
      duration: 1500,
      icon: "✅",
    });
  };

  const handleRGB = () => {
    navigator.clipboard.writeText(toRGB(hexColor));
    toast("RGB Code Copied!!", {
      duration: 1500,
      icon: "✅",
    });
  };

  useEffect(() => {
    setRGBColor(toRGB(hexColor));
  }, [hexColor]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <main
      className={`${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"} min-w-80`}
    >
      <NavBar
        title={"Color Picker"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 sm:grid-rows-1 sm:gap-x-8 h-[100vh] w-[100vw] items-center overflow-hidden">
        <div className="flex justify-center items-center sm:flex sm:justify-end sm:items-center">
          <span className="custom-color-picker">
            <HexColorPicker color={hexColor} onChange={setHexColor} />
          </span>
        </div>
        <div className="flex flex-col justify-center items-center mb-8 xl:pr-36">
          <h1 className="font-bold text-[3rem] sm:text-[3.2rem] lg:text-7xl xl:text-8xl pb-3">
            {hexColor}
          </h1>
          <h1 className="font-bold text-4xl sm:text-4xl lg:text-4xl xl:text-5xl pb-8">
            {RGBColor}
          </h1>
          <div className="buttons flex gap-2 sm:flex-col">
            <button
              onClick={handleHex}
              className="bg-blue-500 hover:bg-white hover:text-black hover:border-4 border-blue-700 font-bold p-4 mb-6 transition-all rounded-lg flex items-center"
            >
              Copy Hex Code
              <ContentCopyIcon fontSize="small" className="ml-2" />
            </button>
            <button
              onClick={handleRGB}
              className="bg-blue-500 hover:bg-white hover:text-black hover:border-4 border-blue-700 font-bold p-4 mb-6 transition-all rounded-lg flex items-center"
            >
              Copy RGB Code
              <ContentCopyIcon fontSize="small" className="ml-2" />
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  );
}
