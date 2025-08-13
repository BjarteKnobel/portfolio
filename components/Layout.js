import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useClickOutside from '../hooks/useClickOutside';
import TypingAnimation from './TypingAnimation';
import Menu from './Menu';
import Footer from './Footer';
import styles from '../styles/Home.module.css';

export default function Layout({ children, title = 'Netside' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenuTimerRef = useRef(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const menuBtnRef = useRef();
  const menuRef = useRef();
  const router = useRouter();

  useClickOutside([menuRef, menuBtnRef], () => {
    if (menuOpen) setMenuOpen(false);
  });

  const openMenu = () => {
    if (closeMenuTimerRef.current) {
      clearTimeout(closeMenuTimerRef.current);
      closeMenuTimerRef.current = null;
    }
    setMenuOpen(true);
  };

  const scheduleCloseMenu = () => {
    if (closeMenuTimerRef.current) clearTimeout(closeMenuTimerRef.current);
    closeMenuTimerRef.current = setTimeout(() => setMenuOpen(false), 200);
  };

  return (
    <>
      <Head>
        <title>{title} • Home</title>
        <meta name="description" content="Netside main design from Figma" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <nav className={styles.navbar} aria-label="Main navigation">
            <div className={styles.logoGroup}>
              <Link href="/" className={styles.logoText}>
                bjarte:
              </Link>
              <TypingAnimation />
            </div>
            <div
              className={styles.menuContainer}
              onMouseEnter={openMenu}
              onMouseLeave={scheduleCloseMenu}
            >
              <button
                aria-label="Open menu"
                className={styles.menuButton}
                ref={menuBtnRef}
                onClick={() => setMenuOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                style={{ "--dot-size": "10px", "--dot-gap": "10px" }}
              >
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </button>
              {menuOpen && (
                <div ref={menuRef} onMouseEnter={openMenu} onMouseLeave={scheduleCloseMenu}>
                  <Menu
                    selected={selectedMenu}
                    onSelect={(key) => {
                      setSelectedMenu(key);
                      setMenuOpen(false);
                      if (key === 'projects') {
                        router.push('/projects');
                      } else if (key === 'about') {
                        router.push('/about');
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
} 