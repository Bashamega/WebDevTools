export const PreviewHeader = ({ setShowPreview }) => (
  <div className="relative flex justify-center pt-2 mb-1 font-sans text-2xl font-bold text-center bg-gray-500 text-white">
    <span>Preview</span>
    <span
      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:text-gray-400"
      onClick={() => setShowPreview(false)}
    >
      x
    </span>
  </div>
);
