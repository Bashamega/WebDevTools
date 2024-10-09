import React from "react";

export default function LabelButton(props) {
  return (
    <React.Fragment>
      <button
        onClick={() =>
          props.handleSelectedLabel({
            id: props.labelId,
            name: props.name,
            color: props.bgColor,
          })
        }
        className="inline-block px-2 py-1 text-xs p-9 font-semibold text-white rounded-full truncate
                   hover:scale-105 hover:shadow-lg"
        style={{
          backgroundColor: `#${props.bgColor}`,
          color: props.isDarkColor(`#${props.bgColor}`) ? "white" : "black",
        }}
      >
        {props.name}
        {props.isRemovable && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-4 w-4 text-black font-bold ml-1 cursor-pointer inline-flex rounded-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>
    </React.Fragment>
  );
}
