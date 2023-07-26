"use client";
import Search from "@/app/assets/search";
import React, { useState } from "react";

export default function ButtonCustomizer() {
  const [cupcakes, setCupcakes] = useState(1);
  const [cup, setCup] = useState("");

  const generate = () => {
    let text = "";
    for (let i = 0; i < cupcakes; i++) {
      text +=
        "Cupcake ipsum dolor sit amet donut muffin caramels chocolate cake candy. Sweet jelly beans croissant cotton candy caramels chocolate cake lemon drops. Oat cake jujubes icing toffee sweet jelly beans cake apple pie chupa chups. Cheesecake marshmallow biscuit pastry macaroon bonbon bear claw. Gingerbread chupa chups sweet roll icing pudding. Marshmallow danish oat cake muffin brownie dessert jelly-o. Macaroon brownie candy canes pudding icing. Donut gummies jelly beans cotton candy lemon drops.\n\n";
    }
    setCup(text);
  };
  const copy = () => {
    navigator.clipboard.writeText(cup);
    setCup("Text copied successfully");
  };

  return (
    <main>
      <nav className="bg-blue-500 py-4 px-6 flex items-center justify-between h-15">
        <a
          href="https://web-dev-tools.vercel.app/"
          className="mr-2 flex border rounded items-center p-2 hover:bg-blue-600"
        >
          <h1 className="text-white text-[18px] md:text-2xl font-bold mr-4">
            Web Dev Tools
          </h1>
          <p>Cupcake Ipsum Generator</p>
        </a>
        <Search />
      </nav>
      <section className="flex items-center justify-center h-screen">
        <div className="bg-slate-800 p-10 w-full max-w-5xl overflow-y-scroll max-h-96">
          <label htmlFor="cupcakes">Number of cupcakes:</label>
          <br></br>
          <br></br>
          <div>
            <input
              type="number"
              id="cupcakes"
              value={cupcakes}
              min={1}
              max={10}
              onChange={(e) => setCupcakes(e.target.value)}
              class="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <br></br>
          <div class="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={generate}
              class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:outline-none"
            >
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Generate
              </span>
            </button>
            &emsp;
            <button
              type="button"
              onClick={copy}
              class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
            >
              Copy
            </button>
          </div>
          <br></br>
          <br></br>
          {cup}
        </div>
      </section>
    </main>
  );
}
