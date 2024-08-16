# Simple tabs

```
import React, { useState } from 'react';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
  const content = [
    'This is the content of Tab 1.',
    'This is the content of Tab 2.',
    'This is the content of Tab 3.',
  ];

  return (
    <div>
      <div style={{ display: 'flex', cursor: 'pointer' }}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            style={{
              padding: '10px',
              borderBottom: activeTab === index ? '2px solid black' : 'none',
            }}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div style={{ padding: '10px' }}>{content[activeTab]}</div>
    </div>
  );
}
```
