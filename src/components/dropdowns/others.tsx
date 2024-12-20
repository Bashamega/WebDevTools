"use client";
import React from "react";
import Dropdown from "./dropdown";
import tools from "@/db/tools.json";

interface OtherDropdownprops {
  isDarkMode: boolean;
}

const OtherDropdown: React.FC<OtherDropdownprops> = ({ isDarkMode }) => {
  const otherTools = tools.filter((tool) => tool.ctg === "other");
  return <Dropdown tools={otherTools} isDarkMode={isDarkMode} />;
};

export default OtherDropdown;
