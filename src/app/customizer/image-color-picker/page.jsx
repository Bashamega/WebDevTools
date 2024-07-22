/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState } from "react";
import Nav from "@/app/components/nav";
import toast, { Toaster } from "react-hot-toast";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { NavBar } from "@/app/components/navbar";

const ColorPicker = () => {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          canvasRef.current.width = img.width;
          canvasRef.current.height = img.height;
          const ctx = canvasRef.current.getContext("2d");
          ctx.drawImage(img, 0, 0);
        };
        img.src = e.target.result;
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const imageRatio = canvas.width / canvas.height;
    const imageWidth = canvas.width;
    const imageHeight = canvas.height;

    const adjustedX = Math.floor(x * (imageWidth / rect.width));
    const adjustedY = Math.floor(y * (imageHeight / rect.height));

    const ctx = canvas.getContext("2d");
    const pixel = ctx.getImageData(adjustedX, adjustedY, 1, 1).data;

    setColor(`rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`);
  };

  const drawImageOnCanvas = (ctx, image) => {
    const img = new Image();
    img.onload = () => {
      canvasRef.current.width = img.width;
      canvasRef.current.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = image;
  };

  function rgbToHex(color) {
    if (!color) {
      return;
    }
    const rgbRegex = /rgb\((\d+), (\d+), (\d+)\)/;
    const match = color.match(rgbRegex);
    if (!match) {
      return null;
    }
    const red = parseInt(match[1], 10).toString(16).padStart(2, "0");
    const green = parseInt(match[2], 10).toString(16).padStart(2, "0");
    const blue = parseInt(match[3], 10).toString(16).padStart(2, "0");

    return `# ${red}${green}${blue}`;
  }

  const handleHex = () => {
    navigator.clipboard.writeText(rgbToHex(color));
    toast("Hex Code Copied!!", {
      duration: 1500,
      icon: "✅",
    });
  };

  const handleRGB = () => {
    navigator.clipboard.writeText(color);
    toast("RGB Code Copied!!", {
      duration: 1500,
      icon: "✅",
    });
  };

  return (
    <main
      className={`${isDarkMode ? "bg-gray-900 " : "bg-white text-black"} min-w-80 h-screen`}
    >
      <NavBar
        title={"Image Color Picker"}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />
      <section
        className={`${isDarkMode ? "bg-gray-700" : "bg-gray-300"} mx-8 min-w-80`}
      >
        <div className="color-picker px-8 py-20 my-10 flex flex-col gap-14 justify-center items-center h-150">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-center leading-6 text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          <div className="flex flex-col gap-14 justify-center items-center md:flex-row">
            {image && (
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className="w-full max-w-screen-2xl max-h-1/2 max-w-1/2 cursor-crosshair flex-1"
              />
            )}
            {image && (
              <img
                className="hidden"
                src={image}
                alt="Uploaded"
                onLoad={() =>
                  drawImageOnCanvas(canvasRef.current.getContext("2d"), image)
                }
              />
            )}

            <div className="flex flex-1 flex-col jusitfy-center items-center gap-6 mb-8">
              {color && (
                <div
                  className="w-60 h-16"
                  style={{
                    backgroundColor: color,
                  }}
                ></div>
              )}
              <h1 className="text-3xl font-extrabold ">
                Hex:
                <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
                  {rgbToHex(color)}
                </small>
              </h1>

              <h1 className="text-3xl font-extrabold ">
                RGB:
                <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
                  {color}
                </small>
              </h1>

              <div className="buttons flex gap-2">
                <button
                  onClick={handleHex}
                  className="bg-blue-500  hover:bg-white hover:text-black hover:border-4 border-blue-700 font-bold p-4 mb-6 transition-all rounded-lg flex items-center"
                >
                  Hex Code
                  <ContentCopyIcon fontSize="sm ml-2" />
                </button>
                <button
                  onClick={handleRGB}
                  className="bg-blue-500 hover:bg-white hover:text-black hover:border-4 border-blue-700 font-bold p-4 mb-6 transition-all rounded-lg flex items-center"
                >
                  RGB Code
                  <ContentCopyIcon fontSize="sm ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default ColorPicker;
