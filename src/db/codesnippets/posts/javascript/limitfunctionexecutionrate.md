## Throttle Function in JavaScript

```javascript
// Throttle function: limits the execution of the function to once every specified time interval
function throttle(func, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      func.apply(this, args);
    }
  };
}

// Example usage: Throttling a scroll event handler
const handleScroll = throttle(() => {
  console.log("Scroll event triggered");
}, 200);

window.addEventListener("scroll", handleScroll);
```
