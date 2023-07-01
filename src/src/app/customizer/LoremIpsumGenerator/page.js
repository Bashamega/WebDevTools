"use client"
import Search from '@/app/assets/search';
import React, { useState } from 'react';

export default function ButtonCustomizer() {
  const [paragraphs, setParagraphs] = useState(1);
  const [code, setcode] = useState("");

  const generateLoremIpsum = () => {
    let loremIpsumText = '';
    for (let i = 0; i < paragraphs; i++) {
      loremIpsumText += `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor orci quis metus ultricies, vitae finibus urna pellentesque. Sed commodo, tortor sed pharetra bibendum, turpis purus gravida orci, nec aliquet mi ligula eu purus. In at elit ex. Quisque ultricies pulvinar purus, at luctus justo lacinia vel. Vestibulum pulvinar lacus eu turpis rutrum, et fermentum sapien rhoncus. Nullam dapibus felis in neque ultricies ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In hac habitasse platea dictumst. Donec efficitur dolor a bibendum vehicula. Curabitur vitae est elit. Integer tempus massa elit, eget euismod nunc pharetra eget. Morbi efficitur metus in viverra finibus. Aliquam sollicitudin pharetra sapien nec bibendum. Etiam congue faucibus malesuada. Nunc vulputate congue vulputate.\n\n`;
    }
    setcode(loremIpsumText);
  };
  const copy =()=>{
    navigator.clipboard.writeText(code);
    setcode("Text coppied succesfully")
  }

  return (
    <main>
      <nav className="bg-blue-500 py-4 px-6 flex h-15">
        <a href="https://web-dev-tools.vercel.app/" className="w-1/5 mr-2 flex border rounded p-2 hover:bg-blue-600">
          <h1 className="text-white text-2xl font-bold mr-1">Web Dev Tools</h1>
          <p>Lorem Ipsum Generator</p>
        </a>
        <Search />
      </nav>
      <section className='flex items-center justify-center h-screen'>
        <div className=' bg-slate-800 p-10 w-full max-w-5xl overflow-y-scroll max-h-96'>
          <label htmlFor="paragraphs">Number of paragraphs:</label><br></br><br></br>
          <input
            type="number"
            id="paragraphs"
            value={paragraphs}
            min={1}
            className="text-black"
            max={10}
            onChange={(e) => setParagraphs(e.target.value)}
          /><br></br><br></br>
          <button onClick={generateLoremIpsum} className=' rounded bg-slate-500 text-white p-5'>Generate</button><br></br>
          <br></br>
          <button onClick={copy} className=' rounded bg-slate-500 text-white p-5'>Copy</button><br></br>
          {code}
        </div>
        
      </section>
    </main>
  );
}
