import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useClickOutside from '../hooks/useClickOutside';
import TypingAnimation from '../components/TypingAnimation';
import Menu from '../components/Menu';
import styles from '../styles/Navigation.module.css';
import homeStyles from '../styles/Home.module.css';
// No body content currently; navbar only

export default function Navigation() {
  const containerRef = useRef(null);
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPinned, setMenuPinned] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const closeMenuTimerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.classList.add(styles.enter);
    }
  }, []);

  useClickOutside([menuRef, menuBtnRef], () => {
    if (menuPinned) setMenuPinned(false);
    if (menuOpen) setMenuOpen(false);
  });

  const openMenu = () => {
    if (menuPinned) return;
    if (closeMenuTimerRef.current) {
      clearTimeout(closeMenuTimerRef.current);
      closeMenuTimerRef.current = null;
    }
    setMenuOpen(true);
  };

  const scheduleCloseMenu = () => {
    if (menuPinned) return;
    if (closeMenuTimerRef.current) clearTimeout(closeMenuTimerRef.current);
    closeMenuTimerRef.current = setTimeout(() => setMenuOpen(false), 200);
  };

  const togglePinnedMenu = () => {
    setMenuPinned((prev) => {
      const next = !prev;
      if (next) {
        if (closeMenuTimerRef.current) {
          clearTimeout(closeMenuTimerRef.current);
          closeMenuTimerRef.current = null;
        }
        setMenuOpen(true);
      } else {
        setMenuOpen(false);
      }
      return next;
    });
  };

  return (
    <>
      <Head>
        <title>Navigation</title>
      </Head>
      <div ref={containerRef} className={styles.container}>
        <header className={homeStyles.header}>
          <nav className={homeStyles.navbar} aria-label="Main navigation">
            <div className={homeStyles.logoGroup}>
              <Link href="/" className={homeStyles.logoText}>
                bjarte:
              </Link>
              <TypingAnimation words={['project navigation']} single typeDelay={110} />
            </div>
            <div
              className={`${homeStyles.menuContainer} ${menuPinned ? homeStyles.menuPinned : ''}`}
              data-menu-pinned={menuPinned ? 'true' : 'false'}
              onMouseEnter={openMenu}
              onMouseLeave={scheduleCloseMenu}
            >
              <button
                aria-label="Open menu"
                className={homeStyles.menuButton}
                ref={menuBtnRef}
                onClick={togglePinnedMenu}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                style={{ "--dot-size": "8px" }}
              >
                <span className={homeStyles.dot} />
                <span className={homeStyles.dot} />
                <span className={homeStyles.dot} />
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
                      } else if (key === 'contact') {
                        if (typeof window !== 'undefined') {
                          window.location.href = 'mailto:bjarte05@gmail.com';
                        }
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </nav>
        </header>

      </div>
    </>
  );
}


