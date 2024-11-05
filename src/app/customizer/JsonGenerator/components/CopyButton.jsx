import { useState } from "react";

export const CopyButton = ({ data }) => {
  const [buttonText, setButtonText] = useState("Copy");

  const handleCopy = () => {
    const jsonData = JSON.stringify(
      data,
      (key, value) =>
        typeof value === "bigint" ? value.toString() + "n" : value,
      2,
    );
    navigator.clipboard.writeText(jsonData);
    setButtonText("Copied");
    setTimeout(() => setButtonText("Copy"), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1 pl-3 pr-3 mt-2 text-zinc-300 bg-black border border-gray-700 rounded-md ml-7 w-fit hover:bg-gray-800"
    >
      {buttonText}
    </button>
  );
};
