import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProjects } from '../data/projects';
import Footer from './Footer';
import styles from '../styles/ProjectCarousel.module.css';

export default function ProjectCarousel() {
  const projects = getAllProjects();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  useEffect(() => {
    // Read id from query to set initial project
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const idParam = parseInt(params.get('id'), 10);
      if (!Number.isNaN(idParam)) {
        const idx = projects.findIndex(p => p.id === idParam);
        if (idx >= 0) setCurrentProjectIndex(idx);
      }
    }
  }, []);
  const currentProject = projects[currentProjectIndex];
  const isFirstProject = currentProject && currentProject.id === 1;

  const nextProject = () => {
    setCurrentProjectIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevProject = () => {
    setCurrentProjectIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  if (!currentProject) return null;

  return (
    <div className={styles.carousel}>
      <header className={styles.navbar}>
        <div className={styles.logoGroup}>
          <Link href='/' legacyBehavior>
            <a className={styles.logo}>bjarte:</a>
          </Link>
          <span className={styles.projectTitle}>{isFirstProject ? 'sverresborg apartments' : currentProject.title}</span>
        </div>
        <Link href='/projects' className={styles.closeBtn} aria-label='Close project'>×</Link>
      </header>

      {/* Intro section: image on the left, text on the right */}
      <section className={styles.introGrid}>
        <div className={styles.introImage}>
          <Image
            src={isFirstProject ? '/assets/render_sverresborg_ferieleiligheter.png' : currentProject.image}
            alt={currentProject.title}
            width={800}
            height={600}
            priority
            style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
          />
        </div>

        <div className={styles.introText}>
          <p className={styles.introParagraph}>{currentProject.fullDescription || currentProject.description}</p>

          <div className={styles.detailsTableRow}>
            <div className={styles.detailsTableCol}>
              {currentProject.details.slice(0, 3).map((detail, idx) => (
                <div key={detail.label} className={styles.detailsTableRowItem}>
                  <span className={styles.detailsTableLabel}>{detail.label}</span>
                  <span className={styles.detailsTableValue}>{detail.value}</span>
                  {idx < 2 && <div className={styles.detailsTableHLine} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floorplan image section (only for first project) */}
      {isFirstProject && (
        <section className={styles.planImageSection}>
          <div className={styles.planImageWrap}>
            <div className={styles.planImageFrame}>
              <Image
                src="/assets/floorplan-1.etg.png"
                alt="floor plan"
                width={1176}
                height={1073}
                className={styles.planImage}
                priority
              />
            </div>
            <div className={styles.planMetaRow}>
              <div className={styles.planCaption}>1. floor</div>
              <Image src="/assets/north-arrow.svg" alt="north arrow" width={35} height={35} className={styles.northArrow} />
            </div>
          </div>
        </section>
      )}

      {/* Photo section: only for first project (placed at bottom) */}
      {isFirstProject && (
        <section className={styles.photoSection}>
          <div className={styles.photoWrap}>
            <Image
              src="/assets/sverresborg_hotel.png"
              alt="main facade"
              width={1176}
              height={784}
              className={styles.photoImage}
            />
            <div className={styles.photoCaption}>main facade</div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
} 