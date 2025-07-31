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
  const [selectedMenu, setSelectedMenu] = useState(null);
  const menuBtnRef = useRef();
  const menuRef = useRef();
  const router = useRouter();

  useClickOutside([menuRef, menuBtnRef], () => {
    if (menuOpen) setMenuOpen(false);
  });

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