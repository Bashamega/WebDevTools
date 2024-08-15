# LazyLoad an image in React

This is a snippet-ready version of the LazyLoadImage component in React

```
import React from 'react';
import ReactDOM from 'react-dom';

const LazyLoadImage = ({
  alt,
  src,
  className,
  loadInitially = false,
  observerOptions = { root: null, rootMargin: '200px 0px' },
  ...props
}) => {
  const observerRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const [isLoaded, setIsLoaded] = React.useState(loadInitially);

  const observerCallback = React.useCallback(entries => {
    if (entries[0].isIntersecting) {
      observerRef.current.disconnect();
      setIsLoaded(true);
    }
  }, []);

  React.useEffect(() => {
    if (loadInitially) return;

    if ('loading' in HTMLImageElement.prototype) {
      setIsLoaded(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    observerRef.current.observe(imgRef.current);

    return () => observerRef.current.disconnect();
  }, [loadInitially, observerCallback, observerOptions]);

  return (
    <img
      alt={alt}
      src={isLoaded ? src : ''}
      ref={imgRef}
      className={className}
      loading={loadInitially ? undefined : 'lazy'}
      {...props}
    />
  );
};
```

Usage Example

```
ReactDOM.createRoot(document.getElementById('root')).render(
  <LazyLoadImage
    src="https://picsum.photos/id/1080/600/600"
    alt="Strawberries"
  />
);
```
