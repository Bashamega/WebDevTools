"use client";
import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Search from '../assets/search';
export default function Nav() {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [result, setResult] = useState('');

  const handleHtmlChange = (event) => {
    const newHtmlCode = event.target.value;
    setHtmlCode(newHtmlCode);
    executeCode(newHtmlCode, cssCode, jsCode);
  };

  const handleCssChange = (event) => {
    const newCssCode = event.target.value;
    setCssCode(newCssCode);
    executeCode(htmlCode, newCssCode, jsCode);
  };

  const handleJsChange = (event) => {
    const newJsCode = event.target.value;
    setJsCode(newJsCode);
    executeCode(htmlCode, cssCode, newJsCode);
  };

  const executeCode = (html, css, js) => {
    const iframe = document.getElementById('result-iframe').contentWindow.document;
    iframe.open();
    iframe.writeln(
      `
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `
    );
    iframe.close();
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

  return (
    <div className='h-screen'>
      <nav className="bg-blue-500 py-4 px-6 flex h-15">
        <a href='https://web-dev-tools.vercel.app/' class='w-1/5 mr-2 flex border rounded p-2 hover:bg-blue-600'>
          
          <h1 className="text-white text-2xl font-bold mr-1">Web Dev Tools</h1>
          <p>Code editor</p>
          
        </a>
        
        <Search/>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 ml-96"
          onClick={handleDownload}
        >
          Download
        </button>
      </nav>
      <section className="flex h-1/4">
        <div className="w-1/3 h-full bottom-2 border border-gray-200">
          <textarea
            className="w-full h-full outline-none resize-none bg-slate-700"
            placeholder="HTML"
            onChange={handleHtmlChange}
            value={htmlCode}
          ></textarea>
        </div>
        <div className="w-1/3 h-full border border-gray-200 text-black">
          <textarea
            className="w-full h-full outline-none resize-none text-black bg-slate-700"
            placeholder="CSS"
            onChange={handleCssChange}
            value={cssCode}
          ></textarea>
        </div>
        <div className="w-1/3 h-full border border-gray-200">
          <textarea
            className="w-full h-full outline-none resize-none text-black bg-slate-700"
            placeholder="JS"
            onChange={handleJsChange}
            value={jsCode}
          ></textarea>
        </div>
      </section>
      <section className="bg-white w-full h-2/3 flex">
        <iframe
          id="result-iframe"
          title="Result"
          className=" w-full"
        ></iframe>
      </section>
    </div>
  );
}