import { PreviewHeader } from "./PreviewHeader";
import { LoadingSpinner } from "./LoadingSpinner";
import { JsonPreview } from "./JsonPreview";
import { CopyButton } from "./CopyButton";
interface PreviewSectionProps {
  responseData: any[];
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
  isLoading: boolean;
  isDarkMode: boolean;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  responseData,
  showPreview,
  setShowPreview,
  isLoading,
  isDarkMode,
}) => (
  <div
    className={
      " absolute top-1/2 shadow-lg rounded-md -translate-y-1/2 z-10 flex flex-col flex-shrink-0 h-[50vh]" +
      (isDarkMode ? " bg-gray-700 text-white" : " bg-white text-black")
    }
  >
    {responseData.length > 0 && showPreview && (
      <div className="flex flex-col max-h-[50vh] max-w-[40vw] min-w-[45vw] overflow-auto mr-2 p-2 ">
        <PreviewHeader setShowPreview={setShowPreview} />
        <div className="max-w-full pr-2">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="flex justify-center">
                <CopyButton data={responseData} />
              </div>
              <JsonPreview data={responseData} />
            </>
          )}
        </div>
      </div>
    )}
  </div>
);
