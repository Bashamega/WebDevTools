"use client";
import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Search from '../assets/search';

export default function Nav() {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');

  const handleHtmlChange = (event) => {
    const newHtmlCode = event.target.value;
    setHtmlCode(newHtmlCode);
  };

  const handleCssChange = (event) => {
    const newCssCode = event.target.value;
    setCssCode(newCssCode);
  };

  const handleJsChange = (event) => {
    const newJsCode = event.target.value;
    setJsCode(newJsCode);
  };

  const handleDownload = () => {
    const zip = new JSZip();

    // Add HTML file to zip
    zip.file('index.html', htmlCode);

    // Add CSS file to zip
    zip.file('style.css', cssCode);

    // Add JS file to zip
    zip.file('script.js', jsCode);

    // Generate the zip file
    zip.generateAsync({ type: 'blob' }).then((content) => {
      // Save the zip file
      saveAs(content, 'code_files.zip');
    });
  };
  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = ''; // Required for Chrome
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  return (
    <div>
      <nav className="bg-blue-500 py-4 px-6 flex">
      <div className=" w-20% flex"><h1 className='text-white text-2xl font-bold'>Web Dev Tools</h1> <p>Code editor</p></div>
      <Search />
      <div className=' ml-80'>
        <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" onClick={handleDownload}>
          Download
        </button>
      </div>
      </nav>
      <section className="flex">
        <div className="w-1/3 h-40 bottom-2 border border-gray-200">
          <textarea
            className="w-full h-full outline-none resize-none text-black"
            placeholder="HTML"
            onChange={handleHtmlChange}
            value={htmlCode}
          ></textarea>
        </div>
        <div className="w-1/3 h-40 border border-gray-200 text-black">
          <textarea
            className="w-full h-full outline-none resize-none text-black"
            placeholder="CSS"
            onChange={handleCssChange}
            value={cssCode}
          ></textarea>
        </div>
        <div className="w-1/3 h-40 border border-gray-200">
          <textarea
            className="w-full h-full outline-none resize-none text-black"
            placeholder="JS"
            onChange={handleJsChange}
            value={jsCode}
          ></textarea>
        </div>
      </section>
      <section></section>
    </div>
  );
}
