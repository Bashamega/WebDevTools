import { Editor } from "@monaco-editor/react";
import React from "react";

interface CodeEditorProps {
  language: string;
  theme: string;
  value: string;
  onChange: (value: string | undefined) => void;
}

export default function CodeEditor({
  language,
  theme,
  value,
  onChange,
}: CodeEditorProps) {
  return (
    <Editor
      height="85vh"
      width="80vw"
      language={language}
      theme={theme}
      value={value}
      onChange={(value) => onChange(value ?? "")}
    />
  );
}
