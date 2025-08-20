import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Projects.module.css';
import PendulumLoader from '../components/PendulumLoader';
import LoadingText from '../components/LoadingText';
import ProjectCarousel from '../components/ProjectCarousel';
import NavigationPanel from '../components/NavigationPanel';

export default function Projects() {
  // Determine initial mode synchronously to avoid flashing the loader
  const initialIsCarousel = typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('view') === 'carousel';
  const [loading, setLoading] = useState(false); // Always start with no loading
  const [showNav, setShowNav] = useState(true); // Always show navigation panel
  const router = useRouter();

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const view = search.get('view');
    if (view === 'carousel') {
      setLoading(false);
      setShowNav(false);
      return;
    }
    // Always show navigation panel, no loading screen
    setLoading(false);
    setShowNav(true);
  }, [router.query.view]);

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
      {showNav ? <NavigationPanel /> : <ProjectCarousel />}
    </>
  );
} 