# Toggle Theme

```
import React, { useState } from 'react';

export default function ToggleTheme() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div style={{
      backgroundColor: darkMode ? '#333' : '#fff',
      color: darkMode ? '#fff' : '#000',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <button onClick={toggleTheme}>
        Toggle to {darkMode ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}
```
