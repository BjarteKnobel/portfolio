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
  const initialFromMenu = typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('from') === 'menu';
  const [loading, setLoading] = useState(!initialIsCarousel && initialFromMenu);
  const [showNav, setShowNav] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const view = search.get('view');
    const from = search.get('from');
    if (view === 'carousel') {
      setLoading(false);
      setShowNav(false);
      return;
    }
    if (from === 'menu') {
      const timer = setTimeout(() => {
        setLoading(false);
        setShowNav(true);
      }, 6000);
      return () => clearTimeout(timer);
    }
    // default: no loader, show navigation panel
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