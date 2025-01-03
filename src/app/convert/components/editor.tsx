import { Editor } from "@monaco-editor/react";

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