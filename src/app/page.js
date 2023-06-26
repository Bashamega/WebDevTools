"use client";
import Image from 'next/image';
import Nav from './assets/nav';
import React from 'react';

export default function Home({state}) {
  return (
    <main className="">
      <title>Web dev tools</title>
      <Nav></Nav>
      <div id='about' className="py-8 px-6 flex justify-center">
        <div className="rounded-full bg-gradient-to-t from-indigo-500 to-purple-600 w-3/6 p-10">
          <h1 className="text-white text-2xl font-bold">About</h1>
          <p className="text-white mt-4">WebDev Tools is a comprehensive online platform designed to empower web developers with a wide array of code samples and snippets. Whether you are a seasoned professional or just starting your journey in web development, our website provides you with a vast collection of code examples to streamline your workflow, enhance productivity, and create exceptional websites and web applications.</p>
        </div>
      </div>
      <div id='contribute' className="py-8 px-6 flex justify-center ml-5 mt-10">
        <div className="rounded-full bg-gradient-to-t from-indigo-500 to-purple-600 w-3/6 p-10">
          <h1 className="text-white text-2xl font-bold">Contribute</h1>
          <p className="text-white mt-4">
            To contribute, please visit the <a href='https://github.com/Bashamega/WebDevTools' className='text-white hover:border-b-2 border-white'>GitHub repository</a>.<br></br>
            Then follow the guidelines in the Readme.
          </p>
        </div>
      </div>
      <div id='contributers' className="py-8 px-6 flex justify-center ml-5 mt-10">
        <div className="rounded-full bg-gradient-to-t from-indigo-500 to-purple-600 w-3/6 p-10">
          <h1 className="text-white text-2xl font-bold m-5">Contributeres</h1>
          <div className='flex'>
            <div  className=' bg-white w-1/4 rounded p-2 m-5'>
              <a href='https://github.com/Bashamega'>
                <img src='https://avatars.githubusercontent.com/u/110662505?v=4'></img>
                <h1 className='bold text-black center'>Bashamega</h1>
              </a>
              
            </div>
            <div  className=' bg-white w-1/4 rounded p-2 m-5'>
              <a href='https://github.com/elidakirigo'>
                <img src='https://avatars.githubusercontent.com/u/42931101?v=4'></img>
                <h1 className='bold text-black center'>Eli da (moon pie)</h1>
              </a>
              
            </div>
            <div  className=' bg-white w-1/4 rounded p-2 m-5'>
              <a href='https://github.com/Silent-Watcher'>
                <img src='https://avatars.githubusercontent.com/u/91375198?v=4'></img>
                <h1 className='bold text-black center'>Ali t.nazari</h1>
              </a>
              
            </div>
            
          </div>
          
          
        </div>
      </div>
    </main>


  );
}
