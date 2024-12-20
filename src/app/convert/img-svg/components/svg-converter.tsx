import React, { useEffect, useState } from "react";
import { useImage } from "../ImageContextApi";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import CircularProgress from "@mui/material/CircularProgress";
import { useCallback } from "react";

interface Cache {
  [key: string]: string;
}

interface CodeEditorProps {}

const cache = new Map(); // In-memory cache

const CodeEditor: React.FC<CodeEditorProps> = () => {
  const { imageData, fileName } = useImage() as {
    imageData: string;
    fileName: string;
  }; // Get file name from context
  const [svgData, setSvgData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Memoized function to convert image to SVG
  const convertToInlineSVG = useCallback(
    async ({ imageData }: { imageData: string }): Promise<void> => {
      // Check cache first
      if (cache.has(imageData)) {
        setSvgData(cache.get(imageData) as string);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(imageData);
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64 = (reader.result as string).split(",")[1];
          const svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%">
              <image href="data:image/png;base64,${base64}" x="0" y="0" width="100%" height="300px" />
            </svg>
          `;
          cache.set(imageData, svgContent); // Cache the result
          setSvgData(svgContent);
          setLoading(false);
        };

        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error converting image to SVG:", error);
        setLoading(false);
      }
    },
    [],
  );

  // Effect to handle image data changes
  useEffect(() => {
    if (imageData) {
      setLoading(true);
      convertToInlineSVG({ imageData });
    }
  }, [imageData, convertToInlineSVG]);

  // Function to download the generated SVG
  const downloadSVG = () => {
    if (svgData) {
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName.replace(/\.[^/.]+$/, "") + ".svg"; // Use file name from context
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div
      className="image-svg-converter-svgImage-500"
      style={{
        height: "58vh",
        width: "48vw",
        textAlign: "center",
        padding: "8px",
      }}
    >
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {svgData && !loading ? (
        <div
          className="image-svg-converter-svgImage-height-500"
          style={{
            marginTop: "33px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <object
            className="image-svg-converter-500-object"
            data={`data:image/svg+xml;base64,${btoa(svgData)}`}
            type="image/svg+xml"
            style={{ height: "42vh" }}
          >
            Your browser does not support SVG
          </object>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={downloadSVG}
              style={{ marginTop: "7px", width: "40%" }}
            >
              Download SVG
            </Button>
          </div>
        </div>
      ) : (
        !loading && (
          <p>No SVG data available. Upload an image to convert it to SVG.</p>
        )
      )}
    </div>
  );
};

export default CodeEditor;
