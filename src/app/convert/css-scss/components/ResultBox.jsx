export default function ResultBox({
  to,
  resultSnippet,
  isDarkMode,
}) {
  return (
    <textarea
      className={`w-full shadow-inner p-4 border-0 ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
      placeholder={`Your ${to} will be here`}
      rows="10"
      defaultValue={resultSnippet}
    ></textarea>
  );
}
