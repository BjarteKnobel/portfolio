import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/TextCarousel.module.css';

export default function TextCarousel({ text, speed = 1, className, href, clickable = false }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Clone the content for seamless looping
    const clone = content.cloneNode(true);
    container.appendChild(clone);

    let position = 0;
    let animationFrameId;

    const animate = () => {
      position -= speed;
      
      // Reset position when first set of items has scrolled past
      if (-position >= content.offsetWidth) {
        position = 0;
      }
      
      container.style.transform = `translateX(${position}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [speed]);

  const handleClick = () => {
    if (clickable && href) {
      router.push(href);
    }
  };

  const items = Array(9).fill(text); // Create 9 instances as per Figma design

  return (
    <div 
      className={styles.carouselWrapper}
      onClick={handleClick}
      style={clickable ? { cursor: 'pointer' } : {}}
    >
      <div className={`${styles.carouselContainer} ${className || ''} ${clickable ? styles.clickable : ''}`} ref={containerRef}>
        <div className={styles.carouselContent} ref={contentRef}>
          {items.map((item, index) => (
            <span key={index} className={styles.carouselItem}>
              {item}
            </span>
          ))}
        </div>
      </div>
      {clickable && (
        <div className={styles.clickHint}>
          <span>click to explore</span>
        </div>
      )}
    </div>
  );
} 