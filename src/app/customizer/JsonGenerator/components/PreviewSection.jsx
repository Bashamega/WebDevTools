import { PreviewHeader } from "./PreviewHeader";
import { LoadingSpinner } from "./LoadingSpinner";
import { JsonPreview } from "./JsonPreview";
export const PreviewSection = ({
  responseData,
  showPreview,
  setShowPreview,
  isLoading,
}) => (
  <div className="bg-white text-black absolute top-1/2 shadow-lg rounded-md -translate-y-1/2 z-10 flex flex-col flex-shrink-0 h-[50vh] dark:bg-gray-800">
    {responseData.length > 0 && showPreview && (
      <div className="flex flex-col max-h-[50vh] max-w-[40vw] min-w-[45vw] overflow-auto mr-2 p-2 ">
        <PreviewHeader setShowPreview={setShowPreview} />
        <div className="flex max-w-full pr-2 ">
          {isLoading ? <LoadingSpinner /> : <JsonPreview data={responseData} />}
        </div>
      </div>
    )}
  </div>
);
