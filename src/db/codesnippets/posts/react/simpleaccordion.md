# Simple accordion

```
import React, { useState } from 'react';

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const data = [
    { title: 'Section 1', content: 'Content of Section 1' },
    { title: 'Section 2', content: 'Content of Section 2' },
    { title: 'Section 3', content: 'Content of Section 3' },
  ];

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <h3 onClick={() => toggleIndex(index)}>{item.title}</h3>
          {activeIndex === index && <p>{item.content}</p>}
        </div>
      ))}
    </div>
  );
}
```
