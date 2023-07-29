"use client"
import React, { useState } from 'react'
import Search from "@/app/assets/search";

import { HexColorPicker } from "react-colorful"

export default function colorPicker() {
  const [hexColor, setHexColor] = useState("#ffffff");
  const [RGBColor, setRGBCOlor] = useState("");

  const handleHex = async () => {
    console.log("Write HEX to clipboard");
  }

  const handleRGB = async () => {
    console.log("Write RBG to clipboard");
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
        <div className="flex flex-col jusitfy-center items-center sm:pt-[310px] mb-8">
          <h1 className="font-bold text-8xl sm:text-7xl pb-8">{hexColor}</h1>
          <button onClick={handleHex} className="bg-blue-500 hover:bg-blue-700 font-bold p-4 mb-6 transition-all">Copy Hex Code</button>
          <button onClick={handleRGB} className="bg-blue-500 hover:bg-blue-700 font-bold p-4 mb-6 transition-all">Copy RGB Code</button>
        </div>
      </div>
    </main>
  )
}
