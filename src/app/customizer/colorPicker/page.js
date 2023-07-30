"use client"
import React, { useState } from 'react'
import Search from "@/app/assets/search";

import { HexColorPicker } from "react-colorful"

export default function colorPicker() {
  const [hexColor, setHexColor] = useState("#ffffff");

  const handleHex = () => {
    navigator.clipboard.writeText(hexColor);
  }

  const handleRGB = () => {

    const toRGB = (hex) => {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? `(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
    }

    navigator.clipboard.writeText(toRGB(hexColor));
  }

  return (
    <main>
      <nav className="bg-blue-500 py-4 px-6 flex items-center justify-between h-15">
        <a
          href="https://web-dev-tools.vercel.app/"
          className="mr-2 flex border items-center rounded p-2 hover:bg-blue-600"
        >
          <h1 className="text-white text-lg md:text-2xl font-bold mr-4">
            Web Dev Tools
          </h1>
          <p>Color Picker</p>
        </a>
        <Search />
      </nav>
      <div className="grid grid-rows-2 grid-cols-1 gap-y-16 sm:grid-cols-2 sm:grid-rows-1 sm:gap-x-8 h-[100vh] w-[100vw] overflow-hidden">
        <div className="flex justify-center items-center sm:flex sm:justify-end sm:items-center">
          <span className="custom-color-picker">
            <HexColorPicker color={hexColor} onChange={setHexColor} />
          </span>
        </div>
        <div className="flex flex-col jusitfy-center items-center mb-8 sm:pt-[270px] xl:pr-36">
          <h1 className="font-bold text-[5.5rem] sm:text-[4rem] lg:text-7xl xl:text-8xl pb-8">{hexColor}</h1>
          <button onClick={handleHex} className="bg-blue-500 hover:bg-blue-700 font-bold p-4 mb-6 transition-all">Copy Hex Code</button>
          <button onClick={handleRGB} className="bg-blue-500 hover:bg-blue-700 font-bold p-4 mb-6 transition-all">Copy RGB Code</button>
        </div>
      </div>
    </main>
  )
}
