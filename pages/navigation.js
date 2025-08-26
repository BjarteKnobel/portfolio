import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Navigation.module.css';
import { getAllProjects } from '../data/projects';

export default function Navigation() {
  const containerRef = useRef(null);
  const projects = getAllProjects();
  const desiredOrder = [4, 2, 3, 1];
  const orderedProjects = desiredOrder
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.classList.add(styles.enter);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Navigation</title>
      </Head>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>navigation</h1>
          <nav className={styles.links}>
            <Link href='/'>home</Link>
            <Link href='/about'>about</Link>
            <Link href='/projects'>projects</Link>
          </nav>
          <div className={styles.grid}> 
            {orderedProjects.map((p) => (
              <Link key={p.id} href={`/projects?view=carousel&id=${p.id}`} className={styles.projectTile}>
                <div className={styles.projectThumb} style={{ backgroundImage: `url(${p.image})` }} />
                <div className={styles.projectMeta}>
                  <div className={styles.tileTitle}>{p.title}</div>
                  <div className={styles.tileSub}>{p.type} • {p.location}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}


