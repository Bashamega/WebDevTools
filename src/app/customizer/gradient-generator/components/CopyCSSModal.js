import React from "react";

const CopyCSSModal = ({ gradientRef, colorsListRef, setCopyCSSModal }) => {
  const copyCSSCode = async () => {
    const data = `/* Standard syntax */
      background: ${gradientRef.current};
      /* Safari browser */
      background: ${
        colorsListRef.current.length > 1
          ? "-webkit-" + gradientRef.current
          : gradientRef.current
      };
      /* Opera browser */
      background: ${
        colorsListRef.current.length > 1
          ? "-o-" + gradientRef.current
          : gradientRef.current
      };
      /* Firefox browser */
      background: ${
        colorsListRef.current.length > 1
          ? "-moz-" + gradientRef.current
          : gradientRef.current
      };
      /* IE browser */
      background: ${
        colorsListRef.current.length > 1
          ? "-ms-" + gradientRef.current
          : gradientRef.current
      };`;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(data);
        alert("Copied to clipboard!");
      } else {
        var textArea = document.createElement("textarea");
        textArea.style.position = "fixed";
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.border = "none";
        textArea.style.outline = "none";
        textArea.style.boxShadow = "none";
        textArea.value = data;

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        alert("Copied to clipboard!");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to cop. Please try again.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full md:h-full h-[100vh] overflow-hidden md:overflow-auto p-4 z-50 flex justify-center items-center bg-slate-400 bg-opacity-30">
      <div className="bg-white rounded-lg md:w-2/4 w-full p-3 md:h-auto h-full overflow-auto">
        <div className="flex flex-col justify-between gap-3 relative">
          <div className="flex items-center justify-center">
            <button
              className="absolute left-0 top-0 text-black text-xl bg-neutral-200 w-7 h-7 rounded-full flex items-center justify-center"
              onClick={() => setCopyCSSModal(false)}
            >
              &times;
            </button>
            <h2 className="text-black font-semibold">Gradient CSS</h2>
          </div>

          <div className="border-y border-gray-200 p-4">
            <div className="border border-gray-200 p-3 rounded-lg">
              <pre className="whitespace-pre-wrap text-black">
                <div className="mb-2">
                  <div className="text-[#8c8c8c80]">/* Standard syntax */</div>
                  <div className="flex gap-2">
                    <span className="text-[#00a67d]">background:</span>
                    <span className="text-[#e9950c]">
                      {gradientRef.current};
                    </span>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="text-[#8c8c8c80]">/* Safari browser */</div>
                  <div className="flex gap-2">
                    <span className="text-[#00a67d]">background:</span>
                    <span className="text-[#e9950c]">
                      {colorsListRef.current.length > 1
                        ? "-webkit-" + gradientRef.current
                        : gradientRef.current}
                      ;
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-[#8c8c8c80]">/* Opera browser */</div>
                  <div className="flex gap-2">
                    <span className="text-[#00a67d]">background:</span>
                    <span className="text-[#e9950c]">
                      {colorsListRef.current.length > 1
                        ? "-o-" + gradientRef.current
                        : gradientRef.current}
                      ;
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-[#8c8c8c80]">/* Firefox browser */</div>
                  <div className="flex gap-2">
                    <span className="text-[#00a67d]">background:</span>
                    <span className="text-[#e9950c]">
                      {colorsListRef.current.length > 1
                        ? "-moz-" + gradientRef.current
                        : gradientRef.current}
                      ;
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-[#8c8c8c80]">/* IE browser */</div>
                  <div className="flex gap-2">
                    <span className="text-[#00a67d]">background:</span>
                    <span className="text-[#e9950c]">
                      {colorsListRef.current.length > 1
                        ? "-ms-" + gradientRef.current
                        : gradientRef.current}
                      ;
                    </span>
                  </div>
                </div>
              </pre>
            </div>
          </div>

          <div className="flex justify-between items-center gap-4">
            <div className="w-full relative">
              <button
                className="rounded-lg bg-gray-700 p-3 text-sm font-semibold text-white w-full text-center border outline-none border-gray-600 active:scale-95 transition-transform duration-200"
                onClick={() => setCopyCSSModal(false)}
              >
                Generate Another
              </button>
            </div>

            <div className="w-full relative">
              <button
                className="rounded-lg bg-blue-600 p-3 text-sm font-semibold text-white w-full text-center border outline-none border-blue-600 active:scale-95 transition-transform duration-200"
                onClick={() => copyCSSCode()}
              >
                Copy CSS Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyCSSModal;
