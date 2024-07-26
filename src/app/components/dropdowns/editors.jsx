import React from "react";
import Dropdown from "./dropdown";
import tools from "../../../db/tools.json";

const EditorDropdown = ({ isDarkMode }) => {
  const editorTools = tools.filter((tool) => tool.ctg === "editor");
  return <Dropdown tools={editorTools} isDarkMode={isDarkMode} />;
};

export default EditorDropdown;
