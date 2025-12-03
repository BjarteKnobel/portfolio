import Layout from '../components/Layout';
import FadeInImage from '../components/FadeInImage';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, useMemo, useCallback, memo } from 'react';
import styles from '../styles/Home.module.css';

// Memoized cursor overlay component for performance
const CursorOverlay = memo(({ imgRef, src, alt }) => (
  <div className={styles.cursorOverlay}>
    <Image
      ref={imgRef}
      src={src}
      alt={alt}
      width={250}
      height={250}
      className={styles.cursorImage}
      priority
    />
  </div>
));

export default function Home() {
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const cursorImgRef = useRef(null);

  // Alternate cursor for info section
  const [altCursorVisible, setAltCursorVisible] = useState(false);
  const [altCursorX, setAltCursorX] = useState(0);
  const [altCursorY, setAltCursorY] = useState(0);
  const [altImgHeight, setAltImgHeight] = useState(0);
  const altCursorImgRef = useRef(null);
  const firstParaRef = useRef(null);
  const secondParaRef = useRef(null);
  const thirdParaRef = useRef(null);
  const fourthParaRef = useRef(null);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const img = cursorImgRef.current;
    if (!img) return;
    const updateSize = () => {
      // Maintain original aspect ratio; width fixed at 250px
      if (img.naturalWidth && img.naturalHeight) {
        const height = (img.naturalHeight / img.naturalWidth) * 250;
        setImgHeight(height);
      }
    };
    if (img.complete) {
      updateSize();
    } else {
      img.addEventListener('load', updateSize);
      return () => img.removeEventListener('load', updateSize);
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    requestAnimationFrame(() => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
    });
  }, []);

  useEffect(() => {
    const img = altCursorImgRef.current;
    if (!img) return;
    const updateSize = () => {
      if (img.naturalWidth && img.naturalHeight) {
        const height = (img.naturalHeight / img.naturalWidth) * 250;
        setAltImgHeight(height);
      }
    };
    if (img.complete) {
      updateSize();
    } else {
      img.addEventListener('load', updateSize);
      return () => img.removeEventListener('load', updateSize);
    }
  }, []);

  const handleAltMouseMove = useCallback((e) => {
    requestAnimationFrame(() => {
      setAltCursorX(e.clientX);
      setAltCursorY(e.clientY);
    });
  }, []);

  useEffect(() => {
    const elements = [firstParaRef.current, secondParaRef.current, thirdParaRef.current, fourthParaRef.current].filter(Boolean);
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add staggered animation delay
            const element = entry.target;
            const paragraphIndex = elements.indexOf(element);
            element.style.animationDelay = `${paragraphIndex * 0.15}s`;
            element.classList.add(styles.revealVisible);
            observer.unobserve(element); // Stop observing once visible
          }
        });
      },
      { root: null, rootMargin: '50px', threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <Layout title="Netside Home">
      {/* Image Section (static) */}
      <section className={styles.heroSection}>
        <div className={styles.heroMedia}>
          <FadeInImage
            src="/assets/landing_page_image.png"
            alt="Main visual"
            priority
            className={styles.heroImage}
            width={1432}
            height={945}
            onLoadingComplete={() => setHeroLoaded(true)}
          />
        </div>
      </section>

      {/* Rolling Experience Text - INACTIVE */}
      {/* <TextCarousel
        text={`architect at arealize (2021–present) – workplace development, digitization, design, sales, product innovation. Intern at OBOS (2020–2021) – administrative tasks, on-site construction, project development. marketing at Spark* (2020–2021) – entrepreneurial initiatives, event reports. intern at Betong Øst (2020) – administrative tasks, on-site construction, project development. deputy Chairman at Broderskabet (2019–2022) – administrative tasks, on-site construction, project development. delivery Rider at Foodora (2018). master's degree in Architecture, NTNU (2018–2023) – sustainable architecture, building transformation, large-scale structures, real estate development. csdg parametric camp (2023) – Grasshopper, C# plugin development. high school (2015–2018) – Mathematics R2, Biology 2, Physics 1, Science and Technology.`}
        speed={0.5}
        className="firstCarousel"
      /> */}

      {/* Body Text with custom cursor scope */}
      <section className={styles.bodyText}>
        <div
          className={styles.bodyTextCursorScope}
          onMouseEnter={() => setCursorVisible(true)}
          onMouseLeave={() => setCursorVisible(false)}
          onMouseMove={handleMouseMove}
        >
          <Link
            href="/about"
            className={cursorVisible ? styles.bodyTextHovered : undefined}
            style={{ textDecoration: 'none', cursor: 'none' }}
          >
            <p ref={firstParaRef} className={`${styles.revealBlur} ${styles.featureParagraph}`}>
              I am an{' '}
              <span className={styles.logoEmphasis}>
                architect
              </span>{' '}
              in tech pursuing a career in real estate development
              with a passion for architecture, innovation, and entrepreneurship.
            </p>
            
            
            <p ref={secondParaRef} className={`${styles.revealBlur} ${styles.featureParagraph}`}>
              I'm driven to solve productivity challenges in the AEC sector
              through innovation, aiming to create a future where architectural
              quality and cost efficiency go hand in hand.
            </p>
          </Link>

          {/* Custom cursor that follows the mouse within this section */}
          {cursorVisible && (
            <div
              className={styles.customCursor}
              style={{
                top: `${cursorY - imgHeight + 1050}px`,
                left: `${cursorX - 250}px`,
              }}
            >
              <CursorOverlay
                imgRef={cursorImgRef}
                src="/assets/cursor.svg"
                alt="Custom cursor"
              />
            </div>
          )}
        </div>
      </section>

      {/* Info section beneath second carousel */}
      <Link href="/projects" style={{ textDecoration: 'none', cursor: 'none' }}>
        <section
          className={`${styles.infoSection} ${styles.altCursorScope}`}
          onMouseEnter={() => setAltCursorVisible(true)}
          onMouseLeave={() => setAltCursorVisible(false)}
          onMouseMove={handleAltMouseMove}
        >
          <div className={styles.infoContent}>
            <div className={styles.textPane}>
              <p ref={thirdParaRef} className={`${styles.revealBlur} ${styles.featureParagraph}`}>
                I want to create pragmatic visions for the future, where <span className={styles.logoEmphasis}>sustainability</span>, <span className={styles.logoEmphasis}>quality of life</span>, and <span className={styles.logoEmphasis}>innovation</span> come together within real-world limits.
              </p>
              <p ref={fourthParaRef} className={`${styles.revealBlur} ${styles.featureParagraph}`}>
                My goal is to let clear ideas and functions guide the design, but always with a creative twist—bringing different needs together in surprising ways to create architecture that is <span className={styles.logoEmphasis}>beautiful</span>, <span className={styles.logoEmphasis}>buildable</span>, and <span className={styles.logoEmphasis}>engaging</span>.
              </p>
            </div>
          </div>

          {/* Alternate custom cursor within this section */}
          {altCursorVisible && (
            <div
              className={styles.altCustomCursor}
              style={{
                top: `${altCursorY - altImgHeight + 1750}px`,
                left: `${altCursorX - 250}px`,
              }}
            >
              <CursorOverlay
                imgRef={altCursorImgRef}
                src="/assets/cursor_project.svg"
                alt="Custom project cursor"
              />
            </div>
          )}
        </section>
      </Link>
    </Layout>
  );
} 