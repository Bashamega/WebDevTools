"use client";
import React, { useState } from "react";
import Search from "@/app/assets/search";
import InputRange from "@/app/components/Input/InputRange";
import Footer from "@/app/components/Footer";

const page = () => {
  const [shadow, setShadow] = useState({
    hOffset: 0,
    vOffset: 8,
    blur: 24,
    spread: 0,
    color: "#00000080",
    inset: false,
  });
  const [successfullyCopied, setSuccessfullyCopied] = useState(false);

  const handleCopyCSSClick = () => {
    navigator.clipboard
      .writeText(
        `box-shadow: ${shadow.hOffset}px ${shadow.vOffset}px ${shadow.blur}px ${
          shadow.spread
        }px ${shadow.color} ${shadow.inset ? "inset" : ""} ;`
      )
      .then(() => {
        setSuccessfullyCopied(true);
        setTimeout(() => {
          setSuccessfullyCopied(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  return (
    <div>
      <nav className="bg-blue-500 py-4 px-6 flex items-center justify-between">
        <a
          href="https://web-dev-tools.vercel.app/"
          className="flex items-center border rounded p-2 hover:bg-blue-600 mr-2"
        >
          <h1 className="text-white  text-lg md:text-2xl font-bold mr-2">
            Web Dev Tools
          </h1>
          <p>Box Shadow Generator</p>
        </a>
        <Search />
      </nav>
      <main className=" max-w-6xl m-auto">
        <div className="flex flex-col gap-3 mt-10 items-center">
          <h1 className="text-5xl font-extrabold text-center">
            Box Shadow Generator
          </h1>
          <p className="text-slate-400 text-center">
            Create and export beautiful box shadow.
          </p>
        </div>
        <div className="flex justify-between flex-col md:flex-row mb-[100px] mt-[50px] w-full md:h-[382px] max-w-6xl mx-auto gap-8 px-4">
          <div className=" bg-white justify-center items-center rounded-2xl flex  w-full h-full overflow-hidden py-[41px]">
            <div
              className="h-[300px] w-[300px] border"
              style={{
                boxShadow: `${shadow.hOffset}px ${shadow.vOffset}px ${
                  shadow.blur
                }px ${shadow.spread}px ${shadow.color} ${
                  shadow.inset ? "inset" : ""
                }`,
              }}
            ></div>
          </div>{" "}
          <div className="w-full flex flex-col justify-between rounded-2xl px-14 py-8 bg-slate-500 h-full">
            <div className="grid grid-cols-2 gap-2">
              <InputRange
                value={shadow.hOffset}
                name={"h-offset"}
                onChange={(e) =>
                  setShadow({ ...shadow, hOffset: e.target.value })
                }
              />
              <InputRange
                value={shadow.vOffset}
                name={"v-offset"}
                onChange={(e) =>
                  setShadow({ ...shadow, vOffset: e.target.value })
                }
              />
              <InputRange
                value={shadow.blur}
                name={"blur"}
                onChange={(e) => setShadow({ ...shadow, blur: e.target.value })}
              />
              <InputRange
                value={shadow.spread}
                name={"blur"}
                onChange={(e) =>
                  setShadow({ ...shadow, spread: e.target.value })
                }
              />
              <div>
                <h2 className=" text-white">color:{shadow.color}</h2>
                <input
                  type="color"
                  value={shadow.color}
                  id="color"
                  name="color"
                  onChange={(e) =>
                    setShadow({ ...shadow, color: e.target.value })
                  }
                />
              </div>
              <div>
                <h2 className=" text-white">inset:</h2>
                <input
                  type="checkbox"
                  id="inset"
                  className="w-6 h-6"
                  name="inset"
                  onChange={(e) => {
                    setShadow({ ...shadow, inset: e.target.checked });
                  }}
                />
              </div>
            </div>
            <div>
              <h3 className="my-2 py-4 px-3 bg-black rounded-lg">{`box-shadow: ${
                shadow.hOffset
              }px ${shadow.vOffset}px ${shadow.blur}px ${shadow.spread}px ${
                shadow.color
              } ${shadow.inset ? "inset" : ""};`}</h3>
              <div className="w-full relative py-2">
                <button
                  className="rounded-lg bg-blue-600 p-3 text-md font-semibold text-white w-full text-center border outline-none border-blue-600 active:scale-95 transition-transform duration-200"
                  onClick={() => handleCopyCSSClick()}
                >
                  Copy CSS
                </button>
                <p className=" h-2 text-green-500 text-center py-1">
                  {successfullyCopied ? "Successfully copied!" : " "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default page;
