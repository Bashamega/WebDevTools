import { useEffect, useState } from 'react';
import { useImage } from '../ImageContextApi';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

export default function CodeEditor() {
  const { imageData } = useImage();
  const [svgData, setSvgData] = useState(null);

  useEffect(() => {
    const loadImageTracer = () => {
      console.log("image data", imageData);
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/imagetracerjs@1.2.6/imagetracer_v1.2.6.min.js";
        script.onload = () => resolve(window.ImageTracer);
        document.body.appendChild(script);
      });
    };

    if (imageData) {
      loadImageTracer().then((ImageTracer) => {
        convertToSVG(imageData, ImageTracer);
      });
    }
  }, [imageData]);

  const convertToSVG = (imageData, ImageTracer) => {
    const img = new window.Image();
    img.src = imageData;
    img.onload = () => {
      console.log(img, 'this is img');
      ImageTracer.imageToSVG(
        img.src,
        (svgstr) => {
          console.log(svgstr, 'svgstr');
          setSvgData(svgstr);
        },
        'posterized2'
      );
    };
  };

  const downloadSVG = () => {
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'image.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ height: "100vh", textAlign: 'center', padding: '20px' }}>
      {
        svgData ? (
          <div
            style={{
              marginTop: '20px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column' // Add this line to stack the SVG and button vertically
            }}
          >
            <object
              data={`data:image/svg+xml;base64,${btoa(svgData)}`}
              type="image/svg+xml"
              style={{ maxWidth: '100%', maxHeight: '300px' }}
            >
              Your browser does not support SVG
            </object>
            <Button component="label"
        variant="contained" startIcon={<DownloadIcon/>} onClick={downloadSVG} style={{ marginTop: '20px' }}>Download SVG</Button> 
          </div>
        ) : (
          <p>No SVG data available. Upload an image to convert it to SVG.</p>
        )
      }
    </div>
  );
}
