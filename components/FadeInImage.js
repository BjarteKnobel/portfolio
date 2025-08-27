import Image from 'next/image';
import { memo, useState } from 'react';

function FadeInImageImpl({ className = '', onLoadingComplete, priority, ...props }) {
  const [loaded, setLoaded] = useState(false);

  const handleComplete = (...args) => {
    setLoaded(true);
    if (typeof onLoadingComplete === 'function') onLoadingComplete(...args);
  };

  return (
    <Image
      decoding="async"
      priority={priority}
      {...props}
      className={`${className} ${loaded ? 'img-blur-loaded' : 'img-blur-loading'}`}
      onLoadingComplete={handleComplete}
    />
  );
}

const FadeInImage = memo(FadeInImageImpl);
export default FadeInImage;


