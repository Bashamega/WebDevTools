import React from "react";
import Dropdown from "./dropdown";
import tools from "../../../db/tools.json";

const GeneratorDropdown = ({ isDarkMode }) => {
  const generatorTools = tools.filter((tool) => tool.ctg === "generator");
  return <Dropdown tools={generatorTools} isDarkMode={isDarkMode} />;
};

export default GeneratorDropdown;
