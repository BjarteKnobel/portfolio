import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useClickOutside from '../hooks/useClickOutside';
import Menu from './Menu';
import styles from '../styles/Navigation.module.css';
import { getAllProjects } from '../data/projects';

export default function NavigationPanel() {
  const containerRef = useRef(null);
  const projects = getAllProjects();
  const heroProject = projects[0];
  const [leftImgSrc, setLeftImgSrc] = useState('/assets/navigation_image.png');

  // Menu state (same behavior as global)
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const menuBtnRef = useRef();
  const menuRef = useRef();
  const closeMenuTimerRef = useRef(null);
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

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.classList.add(styles.enter);
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <header className={styles.navbar}>
        <div className={styles.logoGroup}>
          <Link href='/' className={styles.logo}>bjarte:</Link>
          <span className={styles.navTitle}>project navigation</span>
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
                onError={() => setLeftImgSrc(heroProject?.image || '/assets/floorplan1.jpg')}
                priority
              />
            </div>
          )}
        </div>

        <div className={styles.projectList}>
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/projects?view=carousel&id=${p.id}`}
              className={styles.projectRow}
            >
              <div className={styles.rowTop}>
                <span className={styles.projectName}>{p.title}</span>
                <span className={styles.projectType}>{p.type}</span>
                <div className={styles.squareBtn}>
                  <span className={styles.arrow}></span>
                  <span className={styles.pixelContainer}>
                    <span className={styles.pixel}></span>
                    <span className={styles.pixel}></span>
                    <span className={styles.pixel}></span>
                    <span className={styles.pixel}></span>
                    <span className={styles.pixel}></span>
                    <span className={styles.pixel}></span>
                    <span className={styles.pixel}></span>
                    <span className={styles.pixel}></span>
                  </span>
                </div>
              </div>
              <div className={styles.rowDivider} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


