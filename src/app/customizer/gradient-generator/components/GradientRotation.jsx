import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import React from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";

const GradientRotation = ({
  gradientRotation,
  setGradientRotation,
  gradientRotations,
}) => {
  return (
    <div className="w-full relative">
      <div className="mb-2 flex justify-between items-center">
        <label className="text-xs">Rotation °</label>
      </div>

      <div className="flex items-center rounded-lg bg-gray-700 p-3 text-left text-sm/6 text-white">
        <div className="flex-1">
          <input
            type="number"
            placeholder="Rotation"
            className="outline-none bg-transparent pr-2 w-full text-center"
            value={gradientRotation.value}
            onChange={(e) => {
              setGradientRotation({
                id: gradientRotations.length + 1,
                name: `${e.target.value}°`,
                value: e.target.value,
              });
            }}
          />
        </div>

        <Listbox value={gradientRotation} onChange={setGradientRotation}>
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
  );
};

export default GradientRotation;
