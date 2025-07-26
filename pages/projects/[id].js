import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { getProjectById, getAllProjects } from '../../data/projects';
import styles from '../../styles/ProjectCarousel.module.css';
import PendulumLoader from '../../components/PendulumLoader';
import LoadingText from '../../components/LoadingText';

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const currentProject = getProjectById(id);
      const projects = getAllProjects();
      
      if (currentProject) {
        setProject(currentProject);
        setAllProjects(projects);
        setCurrentIndex(projects.findIndex(p => p.id === id));
        
        // Simulate loading time
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2000);
        
        return () => clearTimeout(timer);
      } else {
        // Project not found, redirect to projects overview
        router.push('/projects');
      }
    }
  }, [id, router]);

  const navigateToProject = (direction) => {
    if (allProjects.length === 0) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = currentIndex === allProjects.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? allProjects.length - 1 : currentIndex - 1;
    }
    
    const newProject = allProjects[newIndex];
    router.push(`/projects/${newProject.id}`);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        navigateToProject('prev');
      } else if (e.key === 'ArrowRight') {
        navigateToProject('next');
      } else if (e.key === 'Escape') {
        router.push('/projects');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, allProjects]);

  if (loading || !project) {
    return (
      <>
        <Head>
          <title>Loading Project...</title>
        </Head>
        <div className={styles.loadingScreen}>
          <div className={styles.loadingContent}>
            <PendulumLoader />
            <LoadingText />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{project.title} | Bjarte Knobel</title>
        <meta name="description" content={project.description.substring(0, 160)} />
      </Head>
      
      <div className={styles.carousel}>
        <header className={styles.navbar}>
          <div className={styles.logoGroup}>
            <Link href='/' legacyBehavior>
              <a className={styles.logo}>bjarte:</a>
            </Link>
            <span className={styles.projectTitle}>{project.title}</span>
          </div>
          
          {/* Enhanced Project Navigation */}
          <div className={styles.projectNavigation}>
            <Link href="/projects" legacyBehavior>
              <a className={styles.navButton} title="View all projects">⊞</a>
            </Link>
            <button 
              onClick={() => navigateToProject('prev')}
              className={styles.navButton}
              aria-label="Previous project"
              title="Previous project (←)"
            >
              ←
            </button>
            <span className={styles.projectCounter}>
              {currentIndex + 1} / {allProjects.length}
            </span>
            <button 
              onClick={() => navigateToProject('next')}
              className={styles.navButton}
              aria-label="Next project"
              title="Next project (→)"
            >
              →
            </button>
          </div>
        </header>

        <div className={styles.heroImage}>
          <img 
            src={project.image} 
            alt={project.title} 
            className={styles.fullScreenImage} 
          />
        </div>

        <div className={styles.contentSection}>
          {/* Project Details Table */}
          <div className={styles.detailsTableRow}>
            <div className={styles.detailsTableCol}>
              {project.details.slice(0, 3).map((detail, idx) => (
                <div key={detail.label} className={styles.detailsTableRowItem}>
                  <span className={styles.detailsTableLabel}>{detail.label}</span>
                  <span className={styles.detailsTableValue}>{detail.value}</span>
                  {idx < 2 && <div className={styles.detailsTableHLine} />}
                </div>
              ))}
            </div>
            <div className={styles.detailsTableCol}>
              {project.details.slice(3, 6).map((detail, idx) => (
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
              <img src={project.floorplan} alt="Floorplan" className={styles.floorplan} />
            </div>
            <div className={styles.floorplanCaption}>{project.title}</div>
          </div>
          
          {/* Project Description */}
          <div className={styles.descriptionFigma}>
            {project.description}
          </div>

          {/* Navigation Help */}
          <div className={styles.navigationHelp}>
            <p>Use ← → arrow keys to navigate between projects, ESC to return to overview</p>
          </div>
        </div>
      </div>
    </>
  );
} 