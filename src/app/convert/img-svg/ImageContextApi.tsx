// import React, { createContext, useContext, useState } from "react";

// const ImageContext = createContext<{
//   imageData: any;
//   setImageData: React.Dispatch<React.SetStateAction<any>>;
//   fileName: string;
//   setFileName: React.Dispatch<React.SetStateAction<string>>;
// }>({
//   imageData: null,
//   setImageData: () => {},
//   fileName: "",
//   setFileName: () => {}
// });

// import { ReactNode } from "react";

// export function ImageProvider({ children }: { children: ReactNode }) {
//   const [imageData, setImageData] = useState(null);
//   const [fileName, setFileName] = useState("");

//   return (
//     <ImageContext.Provider
//       value={{ imageData, setImageData, fileName, setFileName }}
//     >
//       {children}
//     </ImageContext.Provider>
//   );
// }

// export function useImage() {
//   return useContext(ImageContext);
// }

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context type with more specific types for image data and file name
interface ImageContextType {
  imageData: string | ArrayBuffer | null;
  setImageData: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null>
  >;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with default values
const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageProvider({ children }: { children: ReactNode }) {
  const [imageData, setImageData] = useState<string | ArrayBuffer | null>(null);
  const [fileName, setFileName] = useState<string>("");

  return (
    <ImageContext.Provider
      value={{ imageData, setImageData, fileName, setFileName }}
    >
      {children}
    </ImageContext.Provider>
  );
}

// Custom hook to use the image context
export function useImage() {
  const context = useContext(ImageContext);

  // Ensure that the context is used within the provider
  if (!context) {
    throw new Error("useImage must be used within an ImageProvider");
  }

  return context;
}
