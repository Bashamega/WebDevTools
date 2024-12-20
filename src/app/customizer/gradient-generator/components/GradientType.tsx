import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import React from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";

interface GradientTypeProps {
  gradientType: { id: string; name: string; value: string };
  setGradientType: (type: { id: string; name: string; value: string }) => void;
  gradientTypes: { id: string; name: string; value: string }[];
}

const GradientType: React.FC<GradientTypeProps> = ({
  gradientType,
  setGradientType,
  gradientTypes,
}) => {
  return (
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
                    gradientType.id == grad.id ? "fill-blue-500" : "fill-white"
                  } group-data-[selected]:visible`}
                />
                <div
                  className={`text-sm/6 ${
                    gradientType.id == grad.id ? "text-blue-500" : "text-white"
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
  );
};

export default GradientType;
