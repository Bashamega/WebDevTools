export const ActionButtons = ({
  setIsLoading,
  setPreviewClicked,
  setSubmitClicked,
  numRows,
  setNumRows,
}) => (
  <div className="fixed bottom-5 bg-white left-1/2 -translate-x-1/2 px-40 rounded flex gap-2 justify-center items-center py-2 dark:bg-gray-800">
    <button
      onClick={() => {
        setIsLoading(true);
        setPreviewClicked(true);
      }}
      className="flex p-1 pl-3 pr-3 bg-black border border-gray-700 rounded-md ml-0 w-fit hover:bg-gray-800 hover:text-white dark:text-gray-400"
    >
      <span className="p-1 text-zinc-300">Preview</span>
    </button>
    <button
      onClick={() => {
        setIsLoading(true);
        setSubmitClicked(true);
      }}
      className="flex p-1 pl-3 pr-3 bg-black border border-gray-700 rounded-md ml-2 w-fit hover:bg-gray-800 hover:text-white dark:text-gray-400"
    >
      <span className="p-1 text-zinc-300">Export</span>
    </button>
    <input
      type="text"
      className="w-40 p-2 mt-2 bg-black border border-gray-700 rounded-md focus:outline-none focus:border-gray-500 text-zinc-300 focus:bg-gray-800 ml-7"
      placeholder="# Rows"
      value={numRows}
      onChange={(e) => setNumRows(e.target.value)}
    />
  </div>
);
