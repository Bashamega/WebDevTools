// import * as React from "react";
// import { useState } from "react";
// import { styled } from "@mui/material/styles";
// import Button from "@mui/material/Button";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { useImage } from "../ImageContextApi";
// import Image from "next/image";

// interface ImageContextType {
//   setImageData: (data: string | ArrayBuffer | null) => void;
//   setFileName: (name: string) => void;
// }

// interface InputFileUploadprops{

// }

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

// const InputFileUpload: React.FC<InputFileUploadprops> = () => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [fileName, setFileName] = useState("");
//   const { setImageData, setFileName: setImageFileName } = useImage() as ImageContextType;

//   const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedImage(reader.result as string | null);
//         setImageData(reader.result);
//         setFileName(file.name); // Save file name
//         setImageFileName(file.name); // Update context with file name
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleCancel = () => {
//     setSelectedImage(null);
//     setImageData(null);
//     setFileName(""); // Clear file name
//     setImageFileName(""); // Clear context file name
//   };

//   return (
//     <div
//       className="img-svg-image-uploader-500"
//       style={{
//         height: "100vh",
//         width: "50vw",
//         textAlign: "center",
//         padding: "20px",
//       }}
//     >
//       {selectedImage && (
//         <div
//           style={{
//             marginTop: "20px",
//             marginBottom: "20px",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Image
//             src={selectedImage}
//             alt="Selected"
//             style={{ maxWidth: "100%", maxHeight: "300px" }}
//           />
//         </div>
//       )}
//       <Button
//         component="label"
//         variant="contained"
//         startIcon={<CloudUploadIcon />}
//       >
//         Upload file
//         <VisuallyHiddenInput
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//         />
//       </Button>
//       <Button
//         variant="contained"
//         color="secondary"
//         startIcon={<CancelIcon />}
//         onClick={handleCancel}
//         style={{ marginLeft: "10px" }}
//       >
//         Cancel
//       </Button>
//     </div>
//   );
// }

// export default InputFileUpload;

import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import { useImage } from "../ImageContextApi";
import Image from "next/image";

interface ImageContextType {
  setImageData: (data: string | ArrayBuffer | null) => void;
  setFileName: (name: string) => void;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const InputFileUpload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  const { setImageData, setFileName: setImageFileName } =
    useImage() as ImageContextType;

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string | null;
        setSelectedImage(imageData);
        setImageData(imageData);
        setFileName(file.name); // Save file name
        setImageFileName(file.name); // Update context with file name
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setImageData(null);
    setFileName(""); // Clear file name
    setImageFileName(""); // Clear context file name
  };

  return (
    <div
      className="img-svg-image-uploader-500"
      style={{
        height: "100vh",
        width: "50vw",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {selectedImage && (
        <div
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={selectedImage}
            alt="Selected"
            width={300} // Specify a width to avoid layout shifts
            height={300} // Specify a height
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        </div>
      )}
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<CancelIcon />}
        onClick={handleCancel}
        style={{ marginLeft: "10px" }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default InputFileUpload;
