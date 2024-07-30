import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import { useImage } from '../ImageContextApi';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
const {setImageData} = useImage()
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setImageData(reader.result)
      };
      reader.readAsDataURL(file);
    }
  };
const handleCancel = () =>{
    setSelectedImage(null)
    setImageData(null)
}
  return (
    <div className='img-svg-image-uploader-500' style={{ height: "100vh", width: "50vw", textAlign: 'center', padding: '20px' }}>
     
     {selectedImage && (
        <div style={{ marginTop: '20px' ,marginBottom:"20px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px' }} />
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
            style={{ marginLeft: '10px' }}
          >
            Cancel
          </Button>
    </div>
  );
}
