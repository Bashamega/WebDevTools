# Character count

```
import React, { useState } from 'react';

export default function CharacterCount() {
  const [text, setText] = useState('');

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="5"
        cols="30"
      ></textarea>
      <p>Character Count: {text.length}</p>
    </div>
  );
}
```
