import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/ImageCarousel.module.css';

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [gifNonce, setGifNonce] = useState(0);

  const images = [
    { src: '/assets/landing_page_image.png', alt: 'Landing page image', type: 'image' },
    { src: '/assets/main.gif', alt: 'Landing page gif', type: 'gif' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setImageError(false); // reset error when switching
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // When GIF becomes active, bump nonce so the browser restarts it from frame 1
  useEffect(() => {
    if (images[currentIndex].type === 'gif') {
      setGifNonce((n) => n + 1);
    }
  }, [currentIndex]);

  const current = images[currentIndex];

  return (
    <div className={styles.carousel}>
      <div className={styles.imageContainer}>
        {!imageError ? (
          current.type === 'gif' ? (
            <img
              key={`gif-${gifNonce}`}
              src={`${current.src}?r=${gifNonce}`}
              alt={current.alt}
              className={styles.carouselImage}
              onError={() => setImageError(true)}
              decoding="async"
            />
          ) : (
            <Image
              key={`img-${currentIndex}`}
              src={current.src}
              alt={current.alt}
              fill
              loading="lazy"
              priority={false}
              className={styles.carouselImage}
              style={{ objectFit: 'cover' }}
              onError={() => setImageError(true)}
            />
          )
        ) : (
          <div className={styles.fallback}>
            {current.type === 'gif' ? 'GIF not found' : 'Image not found'}
          </div>
        )}
      </div>
    </div>
  );
}
