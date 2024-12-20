interface ResultBoxProps {
  to: string;
  resultSnippet: string;
  isDarkMode: boolean;
}
export default function ResultBox({
  to,
  resultSnippet,
  isDarkMode,
}: ResultBoxProps) {
  return (
    <textarea
      className={`resize-none w-full shadow-inner p-4 border-0 ${
        isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
      }`}
      placeholder={`Your ${to} will be here`}
      rows={10}
      defaultValue={resultSnippet}
      readOnly={true}
    ></textarea>
  );
}
