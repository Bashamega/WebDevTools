"use client";
import { Nav } from "@/app/components/nav";
import React, { use, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function ButtonCustomizer() {
  const [backgroundColor, setBackgroundColor] = useState("#FF0000");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [borderRadius, setBorderRadius] = useState(4);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(200);
  const [cursor, setCursor] = useState("pointer");
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState("bold");
  const [fontFamily, setFontFamily] = useState("tahoma");
  const [showCode, setShowCode] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleCopyCode = () => {
    const code = `
<button style="
  background-color: ${backgroundColor};
  color: ${textColor};
  border-radius: ${borderRadius}px;
  padding: 10px 20px;
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  font-family: ${fontFamily};
  border: none;
  cursor: ${cursor};
  width: ${width}px;
  height: ${height}px;
">
  Customized Button
</button>
`;
    navigator.clipboard.writeText(code);
    setShowCode(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 2000);
  };

  const handleBackgroundColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  const handleWidthChange = (event) => {
    setWidth(event.target.value);
  };

  const handleCursorChange = (event) => {
    setCursor(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleTextColorChange = (event) => {
    setTextColor(event.target.value);
  };

  const handleBorderRadiusChange = (event) => {
    setBorderRadius(Number(event.target.value));
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleFontWeightChange = (event) => {
    setFontWeight(event.target.value);
  };

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };

  const handleCodeButtonClick = () => {
    setShowCode(true);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const buttonStyles = {
    backgroundColor,
    color: textColor,
    borderRadius: `${borderRadius}px`,
    padding: "10px 20px",
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    fontFamily: fontFamily,
    border: "none",
    cursor: cursor,
    width: `${width}px`,
    height: `${height}px`,
  };

  const cursorOptions = [
    "auto",
    "default",
    "none",
    "context-menu",
    "help",
    "pointer",
    "progress",
    "wait",
    "cell",
    "crosshair",
    "text",
    "vertical-text",
    "alias",
    "copy",
    "move",
    "no-drop",
    "not-allowed",
    "grab",
    "grabbing",
    "all-scroll",
    "col-resize",
    "row-resize",
    "n-resize",
    "e-resize",
    "s-resize",
    "w-resize",
    "ne-resize",
    "nw-resize",
    "se-resize",
    "sw-resize",
    "ew-resize",
    "ns-resize",
    "nesw-resize",
    "nwse-resize",
    "zoom-in",
    "zoom-out",
  ];

  const fontWeights = [
    "normal",
    "bold",
    "bolder",
    "lighter",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ];

  const fontFamilies = [
    "Arial, sans-serif",
    "Helvetica, sans-serif",
    "Times New Roman, serif",
    "Georgia, serif",
    "Courier New, monospace",
    "Verdana, sans-serif",
    "Impact, sans-serif",
    "Comic Sans MS, cursive",
    "Trebuchet MS, sans-serif",
    "Arial Black, sans-serif",
    "Lucida Sans Unicode, sans-serif",
    "Palatino Linotype, serif",
    "Tahoma, sans-serif",
    "Garamond, serif",
    "MS Sans Serif, sans-serif",
    "Open Sans, sans-serif",
    "Roboto, sans-serif",
    "Montserrat, sans-serif",
    "Lato, sans-serif",
    "Oswald, sans-serif",
    "Raleway, sans-serif",
    "Noto Sans, sans-serif",
    "Source Sans Pro, sans-serif",
    "IBM Plex Sans, sans-serif",
    "Playfair Display, serif",
    "Merriweather, serif",
    "Roboto Slab, serif",
    "Cabin, sans-serif",
    "Ubuntu, sans-serif",
    "Droid Serif, serif",
    "PT Sans, sans-serif",
    "Quicksand, sans-serif",
  ];

  return (
    <div className={`${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"} min-w-80`}>
      <Nav title={"Button Customizer"} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button style={buttonStyles} className="text-4xl">
          Customized Button
        </button>
      </section>

      <Tabs className="fixed bottom-0 left-0 right-0 mt-5 bg-slate-700">
        <TabList className="flex border-b bg-slate-600 flex-wrap p-2 gap-4">
          <Tab className="font-mono cursor-pointer p-1">Background Color</Tab>
          <Tab className="font-mono cursor-pointer p-1">Text Color</Tab>
          <Tab className="font-mono cursor-pointer p-1">Border Radius</Tab>
          <Tab className="font-mono cursor-pointer p-1">Width and Height</Tab>
          <Tab className="font-mono cursor-pointer p-1">Cursor</Tab>
          <Tab className="font-mono cursor-pointer p-1">Font</Tab>
        </TabList>

        <TabPanel className="bg-slate-700">
          <div className={`${
  isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"
} my-8 w-full rounded-md shadow-md flex flex-col items-center`}>
   
            <h2 className="text-2xl font-bold mb-4 font-mono">
              Button Customizer
            </h2>
            <div className="mb-4">
              <label className="mr-2 font-mono">Background Color:</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={handleBackgroundColorChange}
              />
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className={`${
  isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"
} my-8 w-full rounded-md shadow-md flex flex-col items-center`}>
            <h2 className="text-2xl font-bold mb-4 font-mono">
              Button Customizer
            </h2>
            <div className="mb-4">
              <label className="mr-2 font-mono">Text Color:</label>
              <input
                type="color"
                value={textColor}
                onChange={handleTextColorChange}
              />
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className={`${
  isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"
} my-8 w-full rounded-md shadow-md flex flex-col items-center`}>
            <h2 className="text-2xl font-bold mb-4 font-mono">
              Button Customizer
            </h2>
            <div className="mb-4">
              <label className="mr-2 font-mono">Border Radius:</label>
              <input
                type="number"
                min="0"
                placeholder="Enter border radius"
                className="text-white bg-gray-700 p-1 rounded-md font-mono"
                value={borderRadius}
                onChange={handleBorderRadiusChange}
              />
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className={`${
  isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"
} my-8 w-full rounded-md shadow-md flex flex-col items-center`}>
            <h2 className="text-2xl font-bold mb-4 font-mono">
              Button Customizer
            </h2>
            <div className="mb-4">
              <label className="mr-2 font-mono">Width:</label>
              <input
                type="number"
                min="0"
                placeholder="Enter width"
                className="text-white bg-gray-700 p-1 rounded-md font-mono"
                value={width}
                onChange={handleWidthChange}
              />
            </div>
            <div className="mb-4">
              <label className="mr-2 font-mono">Height:</label>
              <input
                type="number"
                min="0"
                placeholder="Enter height"
                className="text-white bg-gray-700 p-1 rounded-md font-mono"
                value={height}
                onChange={handleHeightChange}
              />
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className={`${
  isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"
} my-8 w-full rounded-md shadow-md flex flex-col items-center`}>
            <h2 className="text-2xl font-bold mb-4 font-mono">
              Button Customizer
            </h2>
            <div className="mb-4">
              <label className="mr-2 font-mono">Cursor:</label>
              <select
                name="cursor-options"
                id="cursor-options"
                onChange={handleCursorChange}
                value={cursor}
                className="text-white bg-gray-700 p-1 rounded-md font-mono"
              >
                {cursorOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className={`${
  isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"
} my-8 w-full rounded-md shadow-md flex flex-col items-center`}>
            <h2 className="text-2xl font-bold mb-4 font-mono">
              Button Customizer
            </h2>
            <div className="mb-4">
              <label className="mr-2 font-mono">Font Size:</label>
              <input
                type="number"
                min="0"
                className="text-white bg-gray-700 p-1 rounded-md font-mono"
                value={fontSize}
                onChange={handleFontSizeChange}
              />
            </div>
            <div className="mb-4">
              <label className="mr-2 font-mono">Font Weight:</label>
              <select
                name="weight-options"
                id="weight-options"
                onChange={handleFontWeightChange}
                value={fontWeight}
                className="text-white bg-gray-700 p-1 rounded-md font-mono"
              >
                {fontWeights.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="mr-2 font-mono">Font Family:</label>
              <select
                name="family-options"
                id="family-options"
                onChange={handleFontFamilyChange}
                value={fontFamily}
                className="text-white bg-gray-700 p-1 rounded-md font-mono"
              >
                {fontFamilies.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </TabPanel>
      </Tabs>

      {showSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline-block mr-2 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="inline-block align-middle">
              Action successfully completed!
            </span>
          </div>
        </div>
      )}
      {/* <Nav title={"Button customizer"} /> */}

      <button
        className="m-3 bg-red-700 p-5 rounded text-gray-400 font-bold"
        onClick={handleCodeButtonClick}
      >
        Show Code
      </button>

      {showCode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-slate-500 p-8 rounded-lg">
            <p className="text-white font-mono">
              &lt;button style=" background-color: {backgroundColor}; color:
              {textColor}; border-radius: {borderRadius}px; padding: 10px 20px;
              font-size: {fontSize}px; font-weight: {fontWeight}; font-family:
              {fontFamily}; border: none; cursor: {cursor}; width: {width}px;
              height: {height}px; "&gt; Customized Button &lt;/button&gt;
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 mr-2 rounded"
              onClick={handleCopyCode}
            >
              Copy Code
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
              onClick={() => setShowCode(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

