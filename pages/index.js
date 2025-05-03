import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import TypingAnimation from '../components/TypingAnimation';
import Menu from '../components/Menu';
import TextCarousel from '../components/TextCarousel';
import Footer from '../components/Footer';

export default function Home() {
  const [imgError, setImgError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const menuBtnRef = useRef();
  const menuRef = useRef();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuOpen && 
          menuRef.current && 
          !menuRef.current.contains(event.target) &&
          menuBtnRef.current && 
          !menuBtnRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <Head>
        <title>Netside • Home</title>
        <meta name="description" content="Netside main design from Figma" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          {/* Nav Bar */}
          <nav className={styles.navbar} aria-label="Main navigation">
            {/* Logo */}
            <div className={styles.logoGroup}>
              <Link href="/" className={styles.logoText}>
                bjarte:
              </Link>
              <TypingAnimation />
            </div>
            {/* Menu (3 dots) as a button */}
            <div style={{ position: 'relative' }}>
              <button
                aria-label="Open menu"
                className={styles.menuButton}
                ref={menuBtnRef}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </button>
              {menuOpen && (
                <div ref={menuRef}>
                  <Menu
                    selected={selectedMenu}
                    onSelect={(key) => {
                      setSelectedMenu(key);
                      setMenuOpen(false);
                      if(key === 'projects') {
                        router.push('/projects');
                      } else if(key === 'about') {
                        router.push('/about');
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main>
          {/* Image Section */}
          <section className={styles.imageSection}>
            <div className={styles.imageGroup}>
              {!imgError ? (
                <Image
                  src="/assets/body-image-1.png"
                  alt="Main visual"
                  layout="fill"
                  objectFit="cover"
                  priority
                  className={styles.mainImage}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className={styles.fallback}>Image not found.</div>
              )}
            </div>
          </section>

          {/* Projects Carousel */}
          <TextCarousel text="projects →" speed={0.5} className="firstCarousel" />

          {/* Body Text */}
          <section className={styles.bodyText}>
            <p>
              I am an <span className={styles.emphasisText}>architect</span> in tech pursuing a career in real estate development
              with a passion for innovation, and entrepreunship.
            </p>
            <p>
              I'm <span className={styles.emphasisText}>passionate</span> about solving productivity challenges in the AEC sector
              through innovation, aiming to create a future where architectural
              quality and cost efficiency go hand in hand.
            </p>
          </section>

          {/* About Carousel */}
          <TextCarousel text="about →" speed={0.5} />
        </main>

        <Footer />
      </div>
    </>
  );
} 