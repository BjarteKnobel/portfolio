import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Projects.module.css';
import PendulumLoader from '../components/PendulumLoader';
import LoadingText from '../components/LoadingText';
import ProjectCarousel from '../components/ProjectCarousel';

export default function Projects() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000);

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
      <ProjectCarousel />
    </>
  );
} 