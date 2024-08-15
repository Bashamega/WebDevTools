# File Drag and Drop area in React

A file drag and drop component for only a single file with styling.

dragdrop.css

```
.filedrop {
  min-height: 120px;
  border: 3px solid #d3d3d3;
  text-align: center;
  font-size: 24px;
  padding: 32px;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

.filedrop.drag {
  border: 3px dashed #1e90ff;
}

.filedrop.ready {
  border: 3px solid #32cd32;
}
```

DragDrop.jsx

```
import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import ./dragdrop.css    //import the above styling

const FileDrop = ({ onDrop }) => {
  const [drag, setDrag] = useState(false);
  const [filename, setFilename] = useState('');
  const dropRef = useRef(null);
  let dragCounter = useRef(0);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true);
    }
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDrag(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onDrop(e.dataTransfer.files[0]);
      setFilename(e.dataTransfer.files[0].name);
      e.dataTransfer.clearData();
      dragCounter.current = 0;
    }
  }, [onDrop]);

  useEffect(() => {
    const div = dropRef.current;
    div.addEventListener('dragenter', handleDragIn);
    div.addEventListener('dragleave', handleDragOut);
    div.addEventListener('dragover', handleDrag);
    div.addEventListener('drop', handleDrop);

    return () => {
      div.removeEventListener('dragenter', handleDragIn);
      div.removeEventListener('dragleave', handleDragOut);
      div.removeEventListener('dragover', handleDrag);
      div.removeEventListener('drop', handleDrop);
    };
  }, [handleDrag, handleDragIn, handleDragOut, handleDrop]);

  return (
    <div
      ref={dropRef}
      className={
        drag ? 'filedrop drag' : filename ? 'filedrop ready' : 'filedrop'
      }
    >
      {filename && !drag ? <div>{filename}</div> : <div>Drop a file here!</div>}
    </div>
  );
};

// Usage Example
const App = () => {
  const handleFileDrop = (file) => {
    console.log('File dropped:', file);
  };

  return <FileDrop onDrop={handleFileDrop} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);

export default FileDrop;

```
