"use client";
import Search from "@/app/assets/search";
import React, { useState } from "react";
import { FaHeading, FaPython, FaCss3, FaPhp, FaJava, FaPhotoFilm } from "react-icons/fa";
import { LuHeading2 } from "react-icons/lu";
import { BiLogoJavascript } from "react-icons/bi";
import { AiFillHtml5 } from "react-icons/ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ReadMeGenerator() {

  const [text, setText] = useState("");
  function download() {
    const markdownText = text.trim();
    const markdownBlob = new Blob([markdownText], { type: 'text/markdown' });
    const url = URL.createObjectURL(markdownBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    link.click();
    URL.revokeObjectURL(url);
  }
  function insert(t) {
    if (t === "heading") {
      setText(`${text}\n# heading`);
    }
    if (t === "sub") {
      setText(`${text}\n## heading`);
    }
    if (t === "img") {
      setText(`${text}\n![My Image](path/to/image.png)
      `);
    }
    if(t=== "table"){
      setText(`${text}\n
| Column 1 | Column 2 | Column 3 | \n
| -------- | -------- | -------- | \n
| Row 1    | Data 1   | Data 2   | \n
| Row 2    | Data 3   | Data 4   | \n
| Row 3    | Data 5   | Data 6   |`)
    }
    
  }

  function code(lang) {
    setText(text + "\n```" + lang + "\n\n```");
  }

  return (
    <main className="h-screen">
      <nav className="bg-blue-500 py-4 px-6 flex h-1/5">
        <a
          href="https://web-dev-tools.vercel.app/"
          className="w-1/5 mr-2 flex border rounded p-2 hover:bg-blue-600"
        >
          <h1 className="text-white text-2xl font-bold mr-1">Web Dev Tools</h1>
          <p>Read Me Generator</p>
        </a>
        <Search />
      </nav>
      <section className="flex h-4/5">
        <section className="w-1/3 bg-slate-400 overflow-y-scroll">
          <button
            className="w-full bg-slate-400 hover:bg-slate-500 flex items-center justify-center text-white font-bold p-4"
            onClick={download}
          >
            Download          
            </button>
          <button
            className="w-full bg-slate-400 hover:bg-slate-500 flex items-center justify-center text-white font-bold p-4"
            onClick={() => insert("heading")}
          >
            Heading
            <FaHeading className="ml-5 text-black text-4xl"></FaHeading>
          </button>
          <button
            className="w-full bg-slate-400 hover:bg-slate-500 flex items-center justify-center text-white font-bold p-4"
            onClick={() => insert("sub")}
          >
            Sub-Heading
            <LuHeading2 className="ml-5 text-black text-4xl"></LuHeading2>
          </button>
          <button
            className="w-full bg-slate-400 hover:bg-slate-500 flex items-center justify-center text-white font-bold p-4"
            onClick={() => insert("img")}
          >
            Image
          </button>
          <button
            className="w-full bg-slate-400 hover:bg-slate-500 flex items-center justify-center text-white font-bold p-4"
            onClick={() => insert("table")}
          >
            Table
          </button>
          <hr></hr>
          <button
            className="w-full bg-slate-400 hover:bg-slate-500 flex items-center justify-center text-white font-bold p-4"
            onClick={() => code("py")}
          >
            PY code
            <FaPython className="ml-5 text-black text-4xl"></FaPython>
          </button>
          <button
            className="w-full bg-slate-400 hover:bg-slate-500 flex items-center justify-center text-white font-bold p-4"
            onClick={() => code("js")}
          >
            JS code
            <BiLogoJavascript className="ml-5 text-black text-4xl"></BiLogoJavascript>
          </button>
          <button
            className="w-full bg-slate-400 hover:bg-slate-500 flex items-center justify-center text-white font-bold p-4"
            onClick={() => code("HTML")}
          >
            HTML code
            <AiFillHtml5 className="ml-5 text-black text-4xl"></AiFillHtml5>
          </button>
          <button
            className="w-full bg-slate-400 hover:bg-slate-500 flex items-center justify-center text-white font-bold p-4"
            onClick={() => code("CSS")}
          >
            CSS code
            <FaCss3 className="ml-5 text-black text-4xl"></FaCss3>
          </button>
          <button
            className="w-full bg-slate-400 hover:bg-slate-500 flex items-center justify-center text-white font-bold p-4"
            onClick={() => code("PHP")}
          >
            PHP code
            <FaPhp className="ml-5 text-black text-4xl"></FaPhp>
          </button>
          <button
            className="w-full bg-slate-400 hover:bg-slate-500 flex items-center justify-center text-white font-bold p-4"
            onClick={() => code("JAVA")}
          >
            JAVA code
            <FaJava className="ml-5 text-black text-4xl"></FaJava>
          </button>
        </section>
        <section className="w-1/3 bg-slate-600">
          <textarea
            className="w-full h-full bg-slate-600 resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </section>
        <section className="w-1/3 bg-white text-black overflow-scroll prose">
        <ReactMarkdown plugins={[remarkGfm]}>{text}</ReactMarkdown>
        </section>
      </section>
    </main>
  );
}
