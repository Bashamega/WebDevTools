"use client";
import React, { useState } from "react";
import InputRange from "@/app/components/Input/InputRange";
import Footer from "@/app/components/Footer";
import Swal from "sweetalert2";
// import Nav from "@/app/components/nav";
import { Nav } from "@/app/components/nav";

const Page = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const [shadow, setShadow] = useState({
    hOffset: 0,
    vOffset: 8,
    blur: 24,
    spread: 0,
    color: "#00000080",
    inset: false,
  });

  const handleCopyCSSClick = () => {
    navigator.clipboard
      .writeText(
        `box-shadow: ${shadow.hOffset}px ${shadow.vOffset}px ${shadow.blur}px ${shadow.spread}px ${shadow.color} ${shadow.inset ? "inset" : ""};`
      )
      .then(() => {
        Swal.fire({
          title: "Operation is complete!",
          text: "CSS code copied to clipboard!",
          icon: "success",
          confirmButtonColor: "#2563EB",
        });
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className={`${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-800"}`}>
      <Nav title={"Box Shadow generator"} isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
      <main className=" max-w-6xl m-auto min-w-80">
        <div className="flex flex-col gap-3 mt-10 items-center">
          <h1 className="text-5xl font-extrabold text-center">Box Shadow Generator</h1>
          <p className="text-slate-400 text-center">Create and export beautiful box shadow.</p>
        </div>
        <div className="flex justify-between flex-col md:flex-row mb-[100px] mt-[50px] w-full md:h-[382px] max-w-6xl mx-auto gap-8 px-4">
          <div className={`justify-center items-center rounded-2xl flex w-full h-full overflow-hidden py-[41px] ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
            <div
              className="h-[300px] w-[300px] border"
              style={{
                boxShadow: `${shadow.hOffset}px ${shadow.vOffset}px ${shadow.blur}px ${shadow.spread}px ${shadow.color} ${shadow.inset ? "inset" : ""}`,
              }}
            ></div>
          </div>
          <div className={`w-full flex flex-col justify-between rounded-2xl px-14 py-8 ${isDarkMode ? "bg-slate-800" : "bg-slate-500"} h-full`}>
            <div className="grid grid-cols-2 gap-2">
              <InputRange
                value={shadow.hOffset}
                name={"h-offset"}
                onChange={(e) => setShadow({ ...shadow, hOffset: e.target.value })}
              />
              <InputRange
                value={shadow.vOffset}
                name={"v-offset"}
                onChange={(e) => setShadow({ ...shadow, vOffset: e.target.value })}
              />
              <InputRange
                value={shadow.blur}
                name={"blur"}
                onChange={(e) => setShadow({ ...shadow, blur: e.target.value })}
              />
              <InputRange
                value={shadow.spread}
                name={"spread"}
                onChange={(e) => setShadow({ ...shadow, spread: e.target.value })}
              />
              <div>
                <h2 className="text-white">Color: {shadow.color}</h2>
                <input
                  type="color"
                  value={shadow.color}
                  id="color"
                  name="color"
                  onChange={(e) => setShadow({ ...shadow, color: e.target.value })}
                />
              </div>
              <div>
                <h2 className="text-white">Inset:</h2>
                <input
                  type="checkbox"
                  id="inset"
                  className="w-6 h-6"
                  name="inset"
                  onChange={(e) => setShadow({ ...shadow, inset: e.target.checked })}
                />
              </div>
            </div>
            <div>
              <h3 className="my-2 py-4 px-3 bg-gray-700 rounded-lg">
                {`box-shadow: ${shadow.hOffset}px ${shadow.vOffset}px ${shadow.blur}px ${shadow.spread}px ${shadow.color} ${shadow.inset ? "inset" : ""};`}
              </h3>
              <div className="w-full relative py-2">
                <button
  className="rounded-lg bg-blue-600 p-3 text-md font-semibold text-white w-full text-center border outline-none border-blue-600 active:scale-95 transition-transform duration-200 hover:bg-blue-700 hover:border-blue-700"
  onClick={handleCopyCSSClick}
>
  Copy CSS
</button>

              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Footer isDarkMode={isDarkMode} />
        </div>
      </main>
    </div>
  );
};

export default Page;
