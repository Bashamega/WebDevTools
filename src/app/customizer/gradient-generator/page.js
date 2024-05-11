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
const gradientTypes = [
  { id: 1, name: "Linear", value: "linear-gradient" },
  { id: 2, name: "Radial", value: "radial-gradient" },
  { id: 3, name: "Conic", value: "conic-gradient" },
];
const gradientPositions = [
  { id: 1, name: "0%", value: 0 },
  { id: 2, name: "10%", value: 10 },
  { id: 3, name: "20%", value: 20 },
  { id: 4, name: "30%", value: 30 },
  { id: 5, name: "40%", value: 40 },
  { id: 6, name: "50%", value: 50 },
  { id: 7, name: "60%", value: 60 },
  { id: 8, name: "70%", value: 70 },
  { id: 9, name: "80%", value: 80 },
  { id: 10, name: "90%", value: 90 },
  { id: 11, name: "100%", value: 100 },
];
const gradientRotations = [
  { id: 1, name: "0°", value: 0 },
  { id: 2, name: "45°", value: 45 },
  { id: 3, name: "90°", value: 90 },
  { id: 4, name: "135°", value: 135 },
  { id: 5, name: "180°", value: 180 },
  { id: 6, name: "225°", value: 225 },
  { id: 7, name: "270°", value: 270 },
  { id: 8, name: "315°", value: 315 },
  { id: 9, name: "360°", value: 360 },
];

const GradientGenerator = () => {
  const [selected, setSelected] = useState(people[1]);
  const [colorsList, setColorsList] = useState([]);
  const [gradient, setGradient] = useState("");
  const [gradientType, setGradientType] = useState(gradientTypes[0]);
  const [gradientPosition, setGradientPosition] = useState(
    gradientPositions[0]
  );
  const [gradientRotation, setGradientRotation] = useState(
    gradientRotations[0]
  );

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
    console.log(colorsList);
    let newGrad = colorsList
      .map((color, index) => {
        return `${color.color} ${color.position}%`;
      })
      .join(", ");

    if (gradientType.value === "linear-gradient") {
      setGradient(
        `${gradientType.value}(${gradientRotation.value}deg, ${newGrad})`
      );
    } else if (gradientType.value === "conic-gradient") {
      setGradient(
        `${gradientType.value}(from ${gradientRotation.value}deg, ${newGrad})`
      );
    } else {
      setGradient(`${gradientType.value}(${newGrad})`);
    }
    console.log(gradient);
    console.log(colorsList);
  }, [colorsList, gradientType, gradientPosition, gradientRotation]);

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
              <div className="w-full relative">
                <div className="mb-2 flex justify-between items-center">
                  <label className="text-xs">Type</label>
                </div>

                <Listbox value={gradientType} onChange={setGradientType}>
                  <ListboxButton
                    className="relative block w-full rounded-lg bg-gray-700 py-3 pr-8 pl-3 text-left text-sm/6 text-white
                      focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  >
                    {gradientType.name}
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
                      {gradientTypes.map((grad) => (
                        <ListboxOption
                          key={grad.name}
                          value={grad}
                          className={`group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none ${
                            gradientType.id == grad.id
                              ? "bg-blue-500 bg-opacity-20"
                              : "data-[focus]:bg-white/10"
                          }`}
                        >
                          <FaCheck
                            className={`invisible text-xs ${
                              gradientType.id == grad.id
                                ? "fill-blue-500"
                                : "fill-white"
                            } group-data-[selected]:visible`}
                          />
                          <div
                            className={`text-sm/6 ${
                              gradientType.id == grad.id
                                ? "text-blue-500"
                                : "text-white"
                            }`}
                          >
                            {grad.name}
                          </div>
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </Listbox>
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

                  <Listbox
                    value={gradientRotation}
                    onChange={setGradientRotation}
                  >
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
                        {gradientRotations.map((rot) => (
                          <ListboxOption
                            key={rot.name}
                            value={rot}
                            className={`group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none ${
                              gradientRotation.id == rot.id
                                ? "bg-blue-500 bg-opacity-20"
                                : "data-[focus]:bg-white/10"
                            }`}
                          >
                            <FaCheck
                              className={`invisible text-xs ${
                                gradientRotation.id == rot.id
                                  ? "fill-blue-500"
                                  : "fill-white"
                              } group-data-[selected]:visible`}
                            />
                            <div
                              className={`text-sm/6 ${
                                gradientRotation.id == rot.id
                                  ? "text-blue-500"
                                  : "text-white"
                              }`}
                            >
                              {rot.name}
                            </div>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Transition>
                  </Listbox>
                </div>
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
                      placeholder="Position"
                      className="outline-none bg-transparent pr-2 w-full text-center"
                      value={gradientPosition.value}
                      onChange={(e) => {
                        setGradientPosition({
                          id: gradientPositions.length + 1,
                          name: `${e.target.value}%`,
                          value: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <Listbox
                    value={gradientPosition}
                    onChange={setGradientPosition}
                  >
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
                        {gradientPositions.map((pos) => (
                          <ListboxOption
                            key={pos.name}
                            value={pos}
                            className={`group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none ${
                              gradientPosition.id == pos.id
                                ? "bg-blue-500 bg-opacity-20"
                                : "data-[focus]:bg-white/10"
                            }`}
                          >
                            <FaCheck
                              className={`invisible text-xs ${
                                gradientPosition.id == pos.id
                                  ? "fill-blue-500"
                                  : "fill-white"
                              } group-data-[selected]:visible`}
                            />
                            <div
                              className={`text-sm/6 ${
                                gradientPosition.id == pos.id
                                  ? "text-blue-500"
                                  : "text-white"
                              }`}
                            >
                              {pos.name}
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
            className={`w-1/2 h-auto rounded-xl`}
            style={{
              // background: `${colorsList.length > 1 && colorsList[0].color}`,
              backgroundImage: `${gradient}`,
            }}
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
