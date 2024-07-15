import { CloseSharp } from "@mui/icons-material";
import React, { useState } from "react";
export function FooterOptions({ file, setFile, files, saveFunction }) {
  const [Popup, setPop] = useState(false);
  const [localLang, setLocalLang] = useState("");
  const chooseLang = () => {
    setFile({ ...file, lang: localLang });
    setPop(false);
    files.forEach((element) => {
      if (element.name == file.name) {
        element.lang = localLang;
      }
    });
  };
  return (
    <footer className="h-[5vh] w-full bg-slate-400 flex">
      <div
        onClick={() => {
          setPop(true);
        }}
        className="bg-slate-600 hover:bg-slate-700 cursor-pointer h-full w-[200px] flex items-center  justify-center text-white"
      >
        {file.lang ? <p>{file.lang}</p> : <p>Choose a language</p>}
      </div>
      <div className="bg-slate-400 h-full w-1" />
      <button
        onClick={saveFunction}
        className="bg-slate-600 hover:bg-slate-700 cursor-pointer h-full w-[200px] flex items-center  justify-center text-white"
      >
        Download
      </button>
      {Popup ? (
        <section className="absolute top-0 left-0 flex justify-center items-center w-screen h-screen backdrop-blur-lg">
          <div className="p-5 rounded-lg shadow bg-gray-700 w-1/2 max-h-1/2">
            <CloseSharp
              onClick={() => {
                setPop(false);
              }}
              className="cursor-pointer"
            />
            <select
              onChange={(e) => setLocalLang(e.target.value)}
              className="bg-slate-600 rounded-lg p-2 hover:bg-slate-700 cursor-pointer text-center w-full flex items-center justify-center text-white"
            >
              <option value="">Choose a language</option>
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
              <option value="css">CSS</option>
              <option value="less">LESS</option>
              <option value="scss">SCSS</option>
              <option value="json">JSON</option>
              <option value="html">HTML</option>
            </select>
            <button
              onClick={chooseLang}
              className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Apply
            </button>
          </div>
        </section>
      ) : (
        <></>
      )}
    </footer>
  );
}
