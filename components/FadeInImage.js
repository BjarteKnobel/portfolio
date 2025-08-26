import Image from 'next/image';
import { useState } from 'react';

export default function FadeInImage({ className = '', onLoadingComplete, ...props }) {
  const [loaded, setLoaded] = useState(false);

  const handleComplete = (...args) => {
    setLoaded(true);
    if (typeof onLoadingComplete === 'function') onLoadingComplete(...args);
  };

  return (
    <Image
      {...props}
      className={`${className} ${loaded ? 'img-blur-loaded' : 'img-blur-loading'}`}
      onLoadingComplete={handleComplete}
    />
  );
}


