import { useState } from 'react';
import Link from 'next/link';
import { getAllProjects } from '../data/projects';
import styles from '../styles/ProjectCarousel.module.css';

export default function ProjectCarousel() {
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
        
        {/* Simple Navigation */}
        <div className={styles.projectNavigation}>
          <button 
            onClick={prevProject}
            className={styles.navButton}
            aria-label="Previous project"
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
          >
            →
          </button>
        </div>
      </header>

      <div className={styles.heroImage}>
        <img 
          src={currentProject.image} 
          alt={currentProject.title} 
          className={styles.fullScreenImage} 
        />
      </div>

      {/* Content Section */}
      <div className={styles.contentSection}>
        {/* Project Details Table */}
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
        
        {/* Floorplan Section */}
        <div className={styles.floorplanSectionFigma}>
          <div className={styles.floorplanImageFigma}>
            <img src={currentProject.floorplan} alt="Floorplan" className={styles.floorplan} />
          </div>
          <div className={styles.floorplanCaption}>{currentProject.title}</div>
        </div>
        
        {/* Project Description */}
        <div className={styles.descriptionFigma}>
          {currentProject.description}
        </div>
      </div>
    </div>
  );
} 