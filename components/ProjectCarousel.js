import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getAllProjects } from '../data/projects';
import styles from '../styles/ProjectCarousel.module.css';

export default function ProjectCarousel() {
  const router = useRouter();
  const projects = getAllProjects();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
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

  const goToProjectPage = () => {
    router.push(`/projects/${currentProject.id}`);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        prevProject();
      } else if (e.key === 'ArrowRight') {
        nextProject();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goToProjectPage();
      } else if (e.key === 'Escape') {
        router.push('/projects');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentProjectIndex, currentProject]);

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
        
        {/* Enhanced Project Navigation */}
        <div className={styles.projectNavigation}>
          <Link href="/projects" legacyBehavior>
            <a className={styles.navButton} title="View all projects">⊞</a>
          </Link>
          <button 
            onClick={prevProject}
            className={styles.navButton}
            aria-label="Previous project"
            title="Previous project (←)"
          >
            ←
          </button>
          <span className={styles.projectCounter}>
            {currentProjectIndex + 1} / {projects.length}
          </span>
          <button 
            onClick={nextProject}
            className={styles.navButton}
            aria-label="Next project"
            title="Next project (→)"
          >
            →
          </button>
          <button 
            onClick={goToProjectPage}
            className={styles.navButton}
            title="View project details (Enter)"
          >
            ↗
          </button>
        </div>
      </header>

      <div className={styles.heroImage} onClick={goToProjectPage}>
        <img 
          src={currentProject.image} 
          alt={currentProject.title} 
          className={styles.fullScreenImage} 
        />
        <div className={styles.clickOverlay}>
          <div className={styles.overlayText}>
            <span>click to explore</span>
            <span className={styles.projectMeta}>
              {currentProject.details.find(d => d.label === 'type')?.value} • {currentProject.details.find(d => d.label === 'date')?.value}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section (below hero image) */}
      <div className={styles.contentSection}>
        {/* Project Details Table Row */}
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
        
        {/* Quick Project Description */}
        <div className={styles.quickDescription}>
          {currentProject.description.substring(0, 200)}...
          <Link href={`/projects/${currentProject.id}`} legacyBehavior>
            <a className={styles.readMoreLink}>read more</a>
          </Link>
        </div>

        {/* Navigation Help */}
        <div className={styles.navigationHelp}>
          <p>Use ← → arrow keys to navigate • Enter to view details • ESC for overview</p>
        </div>
      </div>
    </div>
  );
}

// Floating section at bottom right
export function BottomRightSection() {
  return (
    <div className={styles.bottomRightSection}>
      <img
        src="/assets/hus.jpg"
        alt="Hus"
        className={styles.bottomRightImage}
      />
    </div>
  );
} 