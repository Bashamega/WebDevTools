"use client";
import React from "react";
import Dropdown from "./dropdown";
import tools from "@/db/tools.json";

interface EditorDropdownProps {
  isDarkMode: boolean;
}

const EditorDropdown: React.FC<EditorDropdownProps> = ({ isDarkMode }) => {
  const editorTools = tools.filter((tool) => tool.ctg === "editor");
  return <Dropdown tools={editorTools} isDarkMode={isDarkMode} />;
};

export default EditorDropdown;
