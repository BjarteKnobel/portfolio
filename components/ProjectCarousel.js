import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import FadeInImage from './FadeInImage';
import { getAllProjects } from '../data/projects';
import Footer from './Footer';
import styles from '../styles/ProjectCarousel.module.css';
import homeStyles from '../styles/Home.module.css';

export default function ProjectCarousel() {
  const router = useRouter();
  const projects = getAllProjects();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  useEffect(() => {
    // Read id from query to set initial project
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const idParam = parseInt(params.get('id'), 10);
      const view = params.get('view');
      
      if (!Number.isNaN(idParam)) {
        const idx = projects.findIndex(p => p.id === idParam);
        if (idx >= 0) setCurrentProjectIndex(idx);
      }
      
      // Trigger slide-in animation when carousel view is shown
      if (view === 'carousel') {
        setIsClosing(false);
        const raf = requestAnimationFrame(() => setIsAnimatingIn(true));
        return () => cancelAnimationFrame(raf);
      }
    }
  }, [router.query]);

  const currentProject = projects[currentProjectIndex];

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before navigating
    setTimeout(() => {
      router.push('/projects', undefined, { shallow: true });
    }, 600); // Match animation duration
  };

  if (!currentProject) return null;

  // All projects use the split layout
  return (
    <div className={`${styles.carousel} ${isAnimatingIn ? styles.animateIn : ''} ${isClosing ? styles.animateOut : ''}`}>
      <header className={homeStyles.header}>
        <nav className={homeStyles.navbar} aria-label="Project navigation">
          <div className={homeStyles.logoGroup}>
            <Link href='/' className={homeStyles.logoText}>bjarte:</Link>
            <span className={homeStyles.animatedText}>{currentProject.title}</span>
          </div>
          <button onClick={handleClose} className={styles.closeBtn} aria-label='Close project'>X</button>
        </nav>
      </header>

      <div className={styles.splitLayout}>
        {/* Left: Sticky info panel */}
        <div className={styles.infoPanel}>
          <div className={styles.splitDetailsList}>
            {currentProject.details.map((detail) => (
              <div key={detail.label} className={styles.splitDetailItem}>
                <span className={styles.splitDetailLabel}>{detail.label}</span>
                <span className={styles.splitDetailValue}>{detail.value}</span>
              </div>
            ))}
          </div>

          <p className={styles.splitDescription}>
            {currentProject.fullDescription || currentProject.description}
          </p>

          {currentProject.imageCaptions && currentProject.imageCaptions.length > 0 && (
            <div className={styles.splitCaptionsSection}>
              <p className={styles.splitCaptionsTitle}>Images from top to bottom:</p>
              <ul className={styles.splitCaptionsList}>
                {currentProject.imageCaptions.map((caption, idx) => (
                  <li key={idx} className={styles.splitCaptionItem}>
                    <sup>{idx + 1}</sup>{caption}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right: Scrollable gallery */}
        <div className={styles.galleryPanel}>
          {currentProject.gallery.map((imageSrc, idx) => {
            // First image is hero (full-width) for all projects except toilet torshov (id: 5)
            const isHeroImage = idx === 0 && currentProject.id !== 5;
            return (
              <FadeInImage
                key={idx}
                src={imageSrc}
                alt={currentProject.imageCaptions?.[idx] || `${currentProject.title} image ${idx + 1}`}
                width={800}
                height={600}
                className={isHeroImage ? styles.galleryHeroImage : styles.galleryImage}
                style={{ objectFit: 'contain' }}
              />
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
