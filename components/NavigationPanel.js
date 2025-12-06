import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useClickOutside from '../hooks/useClickOutside';
import Menu from './Menu';
import TypingAnimation from './TypingAnimation';
import Footer from './Footer';
import styles from '../styles/Navigation.module.css';
import homeStyles from '../styles/Home.module.css';
import { getAllProjects } from '../data/projects';

export default function NavigationPanel() {
  const containerRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const projects = getAllProjects();
  // Order: additiv (4), skippergata 11 (2), moholt studenthousing (3), sverresborg apartments (1)
  const desiredOrder = [4, 2, 3, 1];
  const orderedProjects = desiredOrder
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean);
  const heroProject = orderedProjects[0] || projects[0];
  const [leftImgSrc, setLeftImgSrc] = useState('/assets/rotate.gif');

  // Menu state (same behavior as global)
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPinned, setMenuPinned] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const menuBtnRef = useRef();
  const menuRef = useRef();
  const closeMenuTimerRef = useRef(null);
  const router = useRouter();

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

  useEffect(() => {
    const el = containerRef.current;
    if (el && !hasAnimatedRef.current) {
      // Only add enter class on first mount
      el.classList.add(styles.enter);
      hasAnimatedRef.current = true;
    }
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <header className={homeStyles.header}>
        <nav className={homeStyles.navbar} aria-label="Main navigation">
          <div className={homeStyles.logoGroup}>
            <Link href='/' className={homeStyles.logoText}>bjarte:</Link>
            <TypingAnimation words={["project navigation"]} single={true} />
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

      <div className={styles.content}> 
        <div className={styles.leftImage}>
          {heroProject && (
            <div className={styles.heroImageWrap}>
              <Image
                src={leftImgSrc}
                alt='navigation image'
                width={591}
                height={769}
                style={{ objectFit: 'cover', width: '591px', height: '769px' }}
                onError={() => setLeftImgSrc(heroProject?.image || '/assets/rotate.gif')}
                priority={false}
                loading="lazy"
              />
            </div>
          )}
        </div>

        <div className={styles.projectList}>
          {orderedProjects.map((p) => (
            <Link
              key={p.id}
              href={`/projects?view=carousel&id=${p.id}`}
              shallow
              className={styles.projectRow}
            >
              <div className={styles.rowTop}>
                <span className={styles.projectName}>{p.title}</span>
              </div>
              {/* row divider removed per design */}
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}


