"use client";
import React, { useEffect, useRef, useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Search from '../assets/search';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import './page.css'

export default function Nav() {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [codeString, setcodeString] = useState('(num) => num + 1');

  const [result, setResult] = useState('');
  const [HTML, setHTML] = useState('HTML')
  const [CSS, setCSS] = useState('CSS')
  const [JS, setJS] = useState('JAVASCRIPT')

  const handleHtmlChange = (value) => {
    console.log(value.target.value);
    setHTML(value.target.value)
  }
  const handleCSSChange = (value) => {
    console.log(value.target.value);
    setCSS(value.target.value)
  }
  const handleJsChange = (value) => {
    console.log(value.target.value);
    setJS(value.target.value)
  }

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
        <a href='https://web-dev-tools.vercel.app/codeedit' className='w-1/5 mr-2 flex border rounded p-2 hover:bg-blue-600'>

          <h1 className="text-white text-2xl font-bold mr-1">Web Dev Tools</h1>
          <p>Code editor</p>
        </a>

        <Search />
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 ml-96"
          onClick={handleDownload}
        >
          Download
        </button>
      </nav>
      <section className="flex h-1/4">
        <div className="w-1/3 h-full  border border-gray-200 relative">
          <textarea
            className="w-1/2 h-1/2 overflow-hidden outline-none text-black bg-transparent absolute z-10 p-2 syntax-highlighter-textarea"
            onChange={handleHtmlChange}
          ></textarea>
          <SyntaxHighlighter language="htmlbars" style={atomOneDark} className="w-full h-full relative !mt-0">
            {HTML}
          </SyntaxHighlighter>
        </div>
        <div className="w-1/3 h-full  border border-gray-200 relative">
          <textarea
            className="w-1/2 h-1/2 overflow-hidden outline-none text-black bg-transparent absolute z-10 p-2 syntax-highlighter-textarea"
            onChange={handleCSSChange}
          ></textarea>
          <SyntaxHighlighter language="css" style={atomOneDark} className="w-full h-full relative !mt-0">
            {CSS}
          </SyntaxHighlighter>
        </div>
        <div className="w-1/3 h-full  border border-gray-200 relative">
          <textarea
            className="w-1/2 h-1/2 overflow-hidden outline-none text-black bg-transparent absolute z-10 p-2 syntax-highlighter-textarea"
            onChange={handleJsChange}
          ></textarea>
          <SyntaxHighlighter language="javascript" style={atomOneDark} className="w-full h-full relative !mt-0">
            {JS}
          </SyntaxHighlighter>
        </div>
      </section>
      <section className=" bg-white w-full h-2/3">
        <iframe
          id="result-iframe"
          title="Result"
        ></iframe>
      </section>
    </div>
  );
}
