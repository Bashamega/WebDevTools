import React, { createContext, useContext, useState } from 'react';

const ImageContext = createContext();

export function ImageProvider({ children }) {
  const [imageData, setImageData] = useState(null);
  const [fileName, setFileName] = useState('');

  return (
    <ImageContext.Provider value={{ imageData, setImageData, fileName, setFileName }}>
      {children}
    </ImageContext.Provider>
  );
}

export function useImage() {
  return useContext(ImageContext);
}
