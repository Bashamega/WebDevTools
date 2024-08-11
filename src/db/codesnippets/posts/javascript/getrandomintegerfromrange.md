# Get random integer from range

```js
function randomFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(randomFromRange(1, 10));
```
