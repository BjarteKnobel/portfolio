import Layout from '../components/Layout';
import Image from 'next/image';
import TextCarousel from '../components/TextCarousel';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css';

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

  const handleMouseMove = (e) => {
    setCursorX(e.clientX);
    setCursorY(e.clientY);
  };

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

  const handleAltMouseMove = (e) => {
    setAltCursorX(e.clientX);
    setAltCursorY(e.clientY);
  };

  return (
    <Layout title="Netside Home">
      {/* Image Section (static) */}
      <section className={styles.imageSection}>
        <div className={styles.imageGroup}>
          <Image
            src="/assets/landing_page_image.png"
            alt="Main visual"
            fill
            priority
            className={styles.mainImage}
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* Rolling Experience Text */}
      <TextCarousel
        text={`architect at arealize (2021–present) – workplace development, digitization, design, sales, product innovation. Intern at OBOS (2020–2021) – administrative tasks, on-site construction, project development. marketing at Spark* (2020–2021) – entrepreneurial initiatives, event reports. intern at Betong Øst (2020) – administrative tasks, on-site construction, project development. deputy Chairman at Broderskabet (2019–2022) – administrative tasks, on-site construction, project development. delivery Rider at Foodora (2018). master’s degree in Architecture, NTNU (2018–2023) – sustainable architecture, building transformation, large-scale structures, real estate development. csdg parametric camp (2023) – Grasshopper, C# plugin development. high school (2015–2018) – Mathematics R2, Biology 2, Physics 1, Science and Technology.`}
        speed={0.5}
        className="firstCarousel"
      />

      {/* Body Text with custom cursor scope */}
      <Link href="/about" style={{ textDecoration: 'none', cursor: 'none' }}>
        <section
          className={`${styles.bodyText} ${styles.bodyTextCursorScope}`}
          onMouseEnter={() => setCursorVisible(true)}
          onMouseLeave={() => setCursorVisible(false)}
          onMouseMove={handleMouseMove}
        >
          <p>
            I am an{' '}
            <span className={styles.emphasisText}>
              architect
            </span>{' '}
            in tech pursuing a career in real estate development
            with a passion for innovation, and entrepreneurship.
          </p>
          <p>
            I'm <span className={styles.emphasisText}>passionate</span> about solving productivity challenges in the AEC sector
            through innovation, aiming to create a future where architectural
            quality and cost efficiency go hand in hand.
          </p>

          {/* Custom cursor that follows the mouse within this section */}
          {cursorVisible && (
            <div
              className={styles.customCursor}
              style={{
                top: `${cursorY - imgHeight + 1050}px`,
                left: `${cursorX - 250}px`,
              }}
            >
              {/* Use native img to avoid any stylistic modifications beyond width */}
              <img
                ref={cursorImgRef}
                src="/assets/cursor.svg"
                alt="Custom cursor"
                width={250}
                className={styles.cursorImage}
              />
              <span className={styles.cursorLabel}>click to read more</span>
            </div>
          )}
        </section>
      </Link>

      {/* About Carousel */}
      <TextCarousel 
        text="innovation in construction methods and production processes. passive design and climatic adaptation. transformation and reuse of existing structures. workplace consultancy and design. large scale structures" 
        speed={0.5} 
      />

      {/* Info section beneath second carousel */}
      <section
        className={`${styles.infoSection} ${styles.altCursorScope}`}
        onMouseEnter={() => setAltCursorVisible(true)}
        onMouseLeave={() => setAltCursorVisible(false)}
        onMouseMove={handleAltMouseMove}
      >
        <div className={styles.infoContent} style={{ flexDirection: 'row' }}>
          <div className={styles.textPane}>
            <p>
              this is a placeholder for descriptive content. we will add detailed text here to the right, occupying two thirds of the width, while an svg animation sits on the left.
            </p>
          </div>
          <div className={styles.visualPane}>
            {/* SVG animation placeholder */}
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 14, color: '#666' }}>
              svg animation
            </span>
          </div>
        </div>

        {/* Alternate custom cursor within this section */}
        {altCursorVisible && (
          <div
            className={styles.altCustomCursor}
            style={{
              top: `${altCursorY - altImgHeight}px`,
              left: `${altCursorX - 250}px`,
            }}
          >
            <img
              ref={altCursorImgRef}
              src="/assets/cursor.svg"
              alt=""
              width={250}
              className={`${styles.cursorImage} ${styles.altCursorImage}`}
            />
            <span className={styles.cursorLabel}>interact</span>
          </div>
        )}
      </section>
    </Layout>
  );
} 