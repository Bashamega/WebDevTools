import React from "react";
import Dropdown from "./dropdown";
import tools from "@/db/tools.json";

const OtherDropdown = ({ isDarkMode }) => {
  const otherTools = tools.filter((tool) => tool.ctg === "other");
  return <Dropdown tools={otherTools} isDarkMode={isDarkMode} />;
};

export default OtherDropdown;
