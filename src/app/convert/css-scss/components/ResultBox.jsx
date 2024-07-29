export default function ResultBox({
  to,
  resultSnippet,
  isDarkMode,
}) {
  return (
    <textarea
      className={`resize-none w-full shadow-inner p-2 border-0 ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
      placeholder={`Your ${to} will be here`}
      rows="10"
      defaultValue={resultSnippet}
    ></textarea>
  );
}
