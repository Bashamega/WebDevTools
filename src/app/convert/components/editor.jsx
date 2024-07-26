import { Editor } from "@monaco-editor/react";

export default function CodeEditor({ language, theme, value, onChange }) {
  return (
    <Editor
      height="100vh"
      width="50vw"
      language={language}
      theme={theme}
      value={value}
      onChange={onChange}
      className=" sticky"
    />
  );
}
