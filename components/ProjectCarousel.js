import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProjects } from '../data/projects';
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
          <span className={styles.projectTitle}>{currentProject.title}</span>
        </div>
        <Link href='/projects' className={styles.closeBtn} aria-label='Close project'>×</Link>
      </header>

      <div className={styles.heroImage}>
        <Image
          src={currentProject.image}
          alt={currentProject.title}
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Content Section (same as detail page) */}
      <div className={styles.contentSection}>
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
          <div className={styles.detailsTableCol}>
            {currentProject.details.slice(3, 6).map((detail, idx) => (
              <div key={detail.label} className={styles.detailsTableRowItem}>
                <span className={styles.detailsTableLabel}>{detail.label}</span>
                <span className={styles.detailsTableValue}>{detail.value}</span>
                {idx < 2 && <div className={styles.detailsTableHLine} />}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.floorplanSectionFigma}>
          <div className={styles.floorplanImageFigma}>
            <Image
              src={currentProject.floorPlan}
              alt="Floorplan"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className={styles.floorplanCaption}>{currentProject.title}</div>
        </div>

        <div className={styles.descriptionFigma}>{currentProject.description}</div>
      </div>
    </div>
  );
} 