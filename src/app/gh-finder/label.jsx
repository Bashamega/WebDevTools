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
      </button>
    </React.Fragment>
  );
}
