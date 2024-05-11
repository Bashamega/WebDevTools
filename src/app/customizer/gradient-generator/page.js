"use client";
import Nav from "@/app/assets/nav";
import React, { useEffect, useState } from "react";
import { FaGithub, FaHome, FaCheck, FaChevronDown } from "react-icons/fa";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import ColorsList from "./components/ColorsList";
import "./gradient-generator.css";

const people = [
  { id: 1, name: "Tom Cook" },
  { id: 2, name: "Wade Cooper" },
  { id: 3, name: "Tanya Fox" },
  { id: 4, name: "Arlene Mccoy" },
  { id: 5, name: "Devon Webb" },
];

const GradientGenerator = () => {
  const [selected, setSelected] = useState(people[1]);
  const [colorsList, setColorsList] = useState([]);
  const [gradient, setGradient] = useState("");

  const generateRandomColor = () => {
    return (
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
    );
  };

  const getItems = (count) => {
    let items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        id: `item-${new Date().getTime().toString()}`,
        color: generateRandomColor(),
      });
    }
    console.log(items);
    return items;
  };

  useEffect(() => {
    setColorsList(getItems(2));
  }, []);

  useEffect(() => {
    let gradient = "";
    if (colorsList.length == 1) {
      gradient = colorsList[0].color;
      setGradient(gradient);
    } else {
      gradient = colorsList
        .map((color, index) => {
          return `${color.color} ${index * 50}%`;
        })
        .join(", ");
      setGradient(`linear-gradient(${gradient})`);
    }
  }, [colorsList]);

  return (
    <main className="" class="bg-gray-900">
      <title>Web dev tools</title>
      <Nav></Nav>
      <div class="flex justify-center flex-col items-center w-full">
        <div className="flex flex-col gap-3 mt-10 items-center">
          <h1 className="text-5xl font-extrabold">Gradient Generator</h1>
          <p className="text-slate-400">
            Create and export beautiful gradients.
          </p>
        </div>

        <div className="flex justify-between flex-col md:flex-row mb-[100px] mt-[50px] w-full max-w-6xl mx-auto gap-8">
          {/* generator maker */}
          <div className="w-1/2 p-5 rounded-xl bg-gray-800 shadow-lg">
            <div className="mb-4">
              <ColorsList
                colorsList={colorsList}
                setColorsList={setColorsList}
              />
            </div>

            <div className="flex justify-between items-center gap-4 mb-6">
              <div>
                <div className="mb-2 flex justify-between items-center">
                  <label className="text-xs">Color</label>
                  <button className="text-xs underline text-blue-500">
                    Remove
                  </button>
                </div>
                <div className="w-full flex items-center justify-between p-2.5 py-1 text-left text-sm/6 bg-gray-700 rounded-lg relative">
                  <input
                    type="text"
                    placeholder="Color 1"
                    className="flex-1 outline-none bg-transparent pr-2"
                  />
                  <input
                    type="color"
                    className="bg-transparent border-none outline-none w-10 h-10 cursor-pointer rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full relative">
                <div className="mb-2 flex justify-between items-center">
                  <label className="text-xs">Type</label>
                </div>

                <Listbox value={selected} onChange={setSelected}>
                  <ListboxButton
                    className="relative block w-full rounded-lg bg-gray-700 py-3 pr-8 pl-3 text-left text-sm/6 text-white
                      focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  >
                    {selected.name}
                    <FaChevronDown
                      className="group pointer-events-none absolute top-[18px] right-2.5 text-xs fill-white"
                      aria-hidden="true"
                    />
                  </ListboxButton>
                  <Transition
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ListboxOptions
                      anchor="bottom"
                      className="w-[var(--button-width)] rounded-xl border border-white/5 bg-gray-700 p-1 focus:outline-none"
                    >
                      {people.map((person) => (
                        <ListboxOption
                          key={person.name}
                          value={person}
                          className={`group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none ${
                            selected.id == person.id
                              ? "bg-blue-500 bg-opacity-20"
                              : "data-[focus]:bg-white/10"
                          }`}
                        >
                          <FaCheck
                            className={`invisible text-xs ${
                              selected.id == person.id
                                ? "fill-blue-500"
                                : "fill-white"
                            } group-data-[selected]:visible`}
                          />
                          <div
                            className={`text-sm/6 ${
                              selected.id == person.id
                                ? "text-blue-500"
                                : "text-white"
                            }`}
                          >
                            {person.name}
                          </div>
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </Listbox>
              </div>
            </div>

            <div className="flex justify-between items-center gap-4 mb-6">
              <div className="w-full relative">
                <div className="mb-2 flex justify-between items-center">
                  <label className="text-xs">Position</label>
                </div>

                <div className="flex items-center rounded-lg bg-gray-700 p-3 text-left text-sm/6 text-white">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Color 1"
                      className="outline-none bg-transparent pr-2 w-full text-center"
                      value="0%"
                    />
                  </div>

                  <Listbox value={selected} onChange={setSelected}>
                    <ListboxButton className="relative block focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 w-8 h-6 text-center">
                      <FaChevronDown
                        className="group pointer-events-none absolute top-1.5 right-0 text-xs fill-white"
                        aria-hidden="true"
                      />
                    </ListboxButton>
                    <Transition
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <ListboxOptions
                        anchor="bottom"
                        className="w-fit rounded-xl border border-white/5 bg-gray-700 p-1 focus:outline-none"
                      >
                        {people.map((person) => (
                          <ListboxOption
                            key={person.name}
                            value={person}
                            className={`group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none ${
                              selected.id == person.id
                                ? "bg-blue-500 bg-opacity-20"
                                : "data-[focus]:bg-white/10"
                            }`}
                          >
                            <FaCheck
                              className={`invisible text-xs ${
                                selected.id == person.id
                                  ? "fill-blue-500"
                                  : "fill-white"
                              } group-data-[selected]:visible`}
                            />
                            <div
                              className={`text-sm/6 ${
                                selected.id == person.id
                                  ? "text-blue-500"
                                  : "text-white"
                              }`}
                            >
                              {person.name}
                            </div>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Transition>
                  </Listbox>
                </div>
              </div>

              <div className="w-full relative">
                <div className="mb-2 flex justify-between items-center">
                  <label className="text-xs">Rotation</label>
                </div>

                <div className="flex items-center rounded-lg bg-gray-700 p-3 text-left text-sm/6 text-white">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Color 1"
                      className="outline-none bg-transparent pr-2 w-full text-center"
                      value="176°"
                    />
                  </div>

                  <Listbox value={selected} onChange={setSelected}>
                    <ListboxButton className="relative block focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 w-8 h-6 text-center">
                      <FaChevronDown
                        className="group pointer-events-none absolute top-1.5 right-0 text-xs fill-white"
                        aria-hidden="true"
                      />
                    </ListboxButton>
                    <Transition
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <ListboxOptions
                        anchor="bottom"
                        className="w-fit rounded-xl border border-white/5 bg-gray-700 p-1 focus:outline-none"
                      >
                        {people.map((person) => (
                          <ListboxOption
                            key={person.name}
                            value={person}
                            className={`group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none ${
                              selected.id == person.id
                                ? "bg-blue-500 bg-opacity-20"
                                : "data-[focus]:bg-white/10"
                            }`}
                          >
                            <FaCheck
                              className={`invisible text-xs ${
                                selected.id == person.id
                                  ? "fill-blue-500"
                                  : "fill-white"
                              } group-data-[selected]:visible`}
                            />
                            <div
                              className={`text-sm/6 ${
                                selected.id == person.id
                                  ? "text-blue-500"
                                  : "text-white"
                              }`}
                            >
                              {person.name}
                            </div>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Transition>
                  </Listbox>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center gap-4 mt-12">
              <div className="w-full relative">
                <button className="rounded-lg bg-gray-700 p-3 text-md font-semibold text-white w-full text-center border outline-none border-gray-600 active:scale-95 transition-transform duration-200">
                  Random
                </button>
              </div>

              <div className="w-full relative">
                <button className="rounded-lg bg-blue-600 p-3 text-md font-semibold text-white w-full text-center border outline-none border-blue-600 active:scale-95 transition-transform duration-200">
                  Copy CSS
                </button>
              </div>
            </div>
          </div>
          <div
            className={`w-1/2 bg-slate-100 h-auto rounded-xl`}
            style={{ background: `${gradient}` }}
          ></div>
        </div>

        <footer class="w-[26rem] md:w-[40rem] max-w-full bg-white rounded-lg shadow m-4 dark:bg-gray-800">
          <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © {new Date().getFullYear()}{" "}
              <a
                href="https://web-dev-tools.vercel.app/"
                class="hover:underline"
              >
                WebDevTools
              </a>
              . All Rights Reserved.
            </span>{" "}
            &emsp;
            <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a
                  href="https://web-dev-tools.vercel.app/"
                  class="mr-4 hover:underline md:mr-6 flex items-center justify-center gap-2"
                >
                  <FaHome />
                  Home
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Bashamega/WebDevTools"
                  class="hover:underline flex items-center justify-center gap-2"
                >
                  <FaGithub />
                  Repository
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default GradientGenerator;
