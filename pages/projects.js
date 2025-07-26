import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getAllProjects } from '../data/projects';
import styles from '../styles/Projects.module.css';
import PendulumLoader from '../components/PendulumLoader';
import LoadingText from '../components/LoadingText';

export default function ProjectsOverview() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Simulate loading time and fetch projects
    const timer = setTimeout(() => {
      setProjects(getAllProjects());
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        <Head>
          <title>Projects • Loading</title>
          <meta name="description" content="Loading projects..." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <title>Bjarte Knobel | Projects</title>
        <meta name="description" content="Architecture and design projects by Bjarte Knobel" />
      </Head>
      
      <div className={styles.projectsOverview}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <Link href='/' legacyBehavior>
              <a className={styles.logo}>bjarte:</a>
            </Link>
            <h1 className={styles.pageTitle}>projects</h1>
          </div>
        </header>

        {/* Projects Grid */}
        <main className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <Link href={`/projects/${project.id}`} key={project.id} legacyBehavior>
              <a className={styles.projectCard}>
                <div className={styles.projectImageContainer}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className={styles.projectImage}
                  />
                  <div className={styles.projectOverlay}>
                    <div className={styles.projectNumber}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
                
                <div className={styles.projectInfo}>
                  <h2 className={styles.projectTitle}>{project.title}</h2>
                  <div className={styles.projectMeta}>
                    <span className={styles.projectType}>{project.details.find(d => d.label === 'type')?.value}</span>
                    <span className={styles.projectLocation}>{project.details.find(d => d.label === 'location')?.value}</span>
                    <span className={styles.projectDate}>{project.details.find(d => d.label === 'date')?.value}</span>
                  </div>
                  <p className={styles.projectDescription}>
                    {project.description.substring(0, 120)}...
                  </p>
                </div>
              </a>
            </Link>
          ))}
        </main>

        {/* Navigation Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <Link href="/" legacyBehavior>
              <a className={styles.navLink}>← home</a>
            </Link>
            <span className={styles.projectCount}>{projects.length} projects</span>
            <Link href="/about" legacyBehavior>
              <a className={styles.navLink}>about →</a>
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
} 