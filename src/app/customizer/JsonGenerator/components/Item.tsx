import { RxDragHandleDots2 } from "react-icons/rx";
import { CiCircleRemove } from "react-icons/ci";
import "../styles.css";

import React from "react";

interface Field {
  id: string;
  fieldName: string;
  fieldType: string;
}

interface CategoryData {
  getECategoriesArr: () => string[];
  getOptionNameArr: (category: string) => string[];
}

interface ItemProps {
  field: Field;
  // handleChange: (id: string, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  // removeField: (id: string) => void;
  // controls: { start: (event: React.PointerEvent<HTMLDivElement>) => void };
  // categoryData: CategoryData;
  // isDaekMode: boolean;
  handleChange: (
    id: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;

  removeField: (id: string) => void;

  controls: { start: (event: React.PointerEvent<HTMLDivElement>) => void };

  categoryData: CategoryData;

  isDarkMode: boolean;
}

const Item: React.FC<ItemProps> = ({
  field,
  handleChange,
  removeField,
  controls,
  categoryData,
}) => {
  return (
    <div key={field.id} className="flex items-center bg-black-200 w-fit">
      <div
        className="p-1 mb-2 rounded-md cursor-pointer reorder-handle hover:bg-gray-800"
        onPointerDown={(e) => controls.start(e)}
      >
        <RxDragHandleDots2 size={25} color="gray" />
      </div>
      <div>
        <input
          type="text"
          name="fieldName"
          value={field.fieldName}
          onChange={(e) => handleChange(field.id, e)}
          onFocus={(e) => e.target.select()}
          onBlur={(e) => e.target.setSelectionRange(0, 0)}
          autoComplete="off"
          className="p-2 mb-2 mr-2 text-zinc-300 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-gray-500 focus:bg-gray-800"
        />
        <select
          name="fieldType"
          value={field.fieldType}
          onChange={(e) => handleChange(field.id, e)}
          className="p-2 mr-3 text-zinc-300 bg-black border border-gray-700 rounded-md focus:outline-none focus:border-gray-500 focus:bg-gray-800 scrollbar"
        >
          <option value="defualt">Select field type</option>
          {categoryData.getECategoriesArr().map((category, index) => (
            <optgroup key={index} label={category} className="">
              {categoryData.getOptionNameArr(category).map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <button
          onClick={() => removeField(field.id)}
          aria-label="Remove Field"
          className="text-gray-500 hover:text-red-400"
        >
          <CiCircleRemove
            size={20}
            className="transition-colors duration-300 "
          />
        </button>
      </div>
    </div>
  );
};

export default Item;
