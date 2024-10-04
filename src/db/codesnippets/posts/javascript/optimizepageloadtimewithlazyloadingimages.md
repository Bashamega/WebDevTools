## Boost Website Speed: Implement Lazy Loading for Images with This Simple JavaScript Snippet

```javascript
// Function to lazy load images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });
}

// Run lazy loading when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", lazyLoadImages);
```
