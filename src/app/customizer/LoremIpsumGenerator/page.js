"use client";
import Search from "@/app/assets/search";
import React, { useState } from "react";

export default function ButtonCustomizer() {
  const [paragraphs, setParagraphs] = useState(1);
  const [code, setcode] = useState("");

  const generateLoremIpsum = () => {
    let loremIpsumText = "";
    for (let i = 0; i < paragraphs; i++) {
      loremIpsumText += `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor orci quis metus ultricies, vitae finibus urna pellentesque. Sed commodo, tortor sed pharetra bibendum, turpis purus gravida orci, nec aliquet mi ligula eu purus. In at elit ex. Quisque ultricies pulvinar purus, at luctus justo lacinia vel. Vestibulum pulvinar lacus eu turpis rutrum, et fermentum sapien rhoncus. Nullam dapibus felis in neque ultricies ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In hac habitasse platea dictumst. Donec efficitur dolor a bibendum vehicula. Curabitur vitae est elit. Integer tempus massa elit, eget euismod nunc pharetra eget. Morbi efficitur metus in viverra finibus. Aliquam sollicitudin pharetra sapien nec bibendum. Etiam congue faucibus malesuada. Nunc vulputate congue vulputate.\n\n`;
    }
    setcode(loremIpsumText);
  };
  const copy = () => {
    navigator.clipboard.writeText(code);
    setcode("Text coppied succesfully");
  };

  return (
    <main className="h-screen flex flex-col gap-10">
      <nav className="bg-blue-500 py-4 px-6 flex h-15">
        <a
          href="https://web-dev-tools.vercel.app/"
          className="w-1/5 mr-2 flex border rounded p-2 hover:bg-blue-600"
        >
          <h1 className="text-white text-2xl font-bold mr-1">Web Dev Tools</h1>
          <p>Lorem Ipsum Generator</p>
        </a>
        <Search />
      </nav>
      <section className="flex items-center justify-center">
        <div className=" bg-white text-black p-10 w-full max-w-5xl overflow-y-scroll max-h-[75vh]">
          <div className="flex justify-between pb-5">
            <div className="flex gap-2 items-center">
              <label htmlFor="paragraphs">Number of paragraphs:</label>
              <input
                type="number"
                id="paragraphs"
                value={paragraphs}
                min={1}
                className="text-black bg-gray-100 text-center"
                max={10}
                onChange={(e) => setParagraphs(e.target.value)}
              />
            </div>
            <div className="flex gap-5">
              <button
                onClick={generateLoremIpsum}
                className=" rounded bg-slate-500 text-white p-5"
              >
                Generate
              </button>
              <button
                onClick={copy}
                className=" rounded bg-slate-500 text-white p-5"
              >
                Copy
              </button>
            </div>
          </div>
          {code}
        </div>
      </section>
    </main>
  );
}
