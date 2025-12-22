import React, { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { projects } from '../data/projects';
import styles from '../styles/FloatingProjects.module.css';

// Specific projects to render: additiv, skippergata 11, moholt studenthousing, sverresborg apartments, WC J.K.gt.4
const SELECTED_PROJECT_IDS = [4, 2, 3, 1, 5];

export default function FloatingProjects() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const router = useRouter();
  const prefetchedRef = useRef(new Set());

  const displayedProjects = useMemo(() => {
    return SELECTED_PROJECT_IDS.map((id) => projects.find((p) => p.id === id)).filter(Boolean);
  }, []);

  const seeded01 = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const getPosition = (index, projectId) => {
    // Widths reduced by ~60% for smaller footprints
    // Added floatDuration for varied movement
    // Reduced base widths by ~30% for lighter presence while keeping visibility
    const positions = [
      { top: '30%', left: '15%', width: 98, floatDuration: '6s', parallaxFactor: 0.05 },
      { top: '25%', left: '60%', width: 84, floatDuration: '7s', parallaxFactor: 0.08 },
      { top: '65%', left: '25%', width: 105, floatDuration: '5.5s', parallaxFactor: 0.04 },
      { top: '70%', left: '70%', width: 91, floatDuration: '6.5s', parallaxFactor: 0.06 },
      // WC J.K.gt.4 (smaller + more random placement)
      {
        top: `${Math.round(18 + seeded01(projectId * 11) * 64)}%`,
        left: `${Math.round(8 + seeded01(projectId * 17) * 84)}%`,
        width: 31, // ~1/3 of previous 92px
        floatDuration: '6.8s',
        parallaxFactor: 0.05,
      },
    ];
    const base = positions[index] || { top: '50%', left: '50%', width: 84, floatDuration: '6s', parallaxFactor: 0.05 };

    // Add a small deterministic “random” jitter so the layout feels less grid-like,
    // while staying stable (no mouse influence).
    const t = Number(String(base.top).replace('%', ''));
    const l = Number(String(base.left).replace('%', ''));
    if (Number.isFinite(t) && Number.isFinite(l)) {
      const jt = (seeded01(projectId * 101 + 7) - 0.5) * 10; // ±5%
      const jl = (seeded01(projectId * 103 + 9) - 0.5) * 10; // ±5%
      return {
        ...base,
        top: `${Math.max(5, Math.min(85, Math.round(t + jt)))}%`,
        left: `${Math.max(5, Math.min(90, Math.round(l + jl)))}%`,
      };
    }

    return base;
  };

  useEffect(() => {
    const handleGlobalClick = () => {
      setActiveProjectId(null);
    };

    window.addEventListener('click', handleGlobalClick);
    
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  // Determine which project information to display: Active takes precedence over Hover
  const targetProject = activeProjectId 
    ? displayedProjects.find(p => p.id === activeProjectId) 
    : hoveredProject;

  return (
    <div className={styles.container}>
      {displayedProjects.map((project, index) => {
        const pos = getPosition(index, project.id);
        const isActive = activeProjectId === project.id;

        return (
          <div
            key={project.id}
            className={`${styles.floatingWrapper} ${isActive ? styles.active : ''}`}
            style={{
              top: pos.top,
              left: pos.left,
              width: pos.width,
            }}
            onMouseEnter={() => {
              setHoveredProject(project);
              // Prefetch the projects page in carousel mode + preload carousel chunk once per project
              if (!prefetchedRef.current.has(project.id)) {
                prefetchedRef.current.add(project.id);
                router.prefetch({
                  pathname: '/projects',
                  query: { id: project.id, view: 'carousel' },
                });
                // Preload the carousel chunk so click feels instant
                import('./ProjectCarousel');
              }
            }}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={(e) => {
              e.stopPropagation();
              setActiveProjectId((prev) => (prev === project.id ? null : project.id));
              router.push({
                pathname: '/projects',
                query: { id: project.id, view: 'carousel' },
              });
            }}
          >
            <div 
              className={styles.floatAnimator}
              style={{ animationDuration: pos.floatDuration }}
            >
              <div className={styles.floatingImage}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  sizes="(max-width: 900px) 140px, 180px"
                  style={{ width: '100%', height: 'auto' }}
                  priority={index === 0}
                />
              </div>
            </div>
          </div>
        );
      })}

      <Link
        href={targetProject ? `/projects?id=${targetProject.id}&view=carousel` : '#'}
        className={`${styles.projectLink} ${targetProject ? styles.visible : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {targetProject ? (
          <>
            {targetProject.title} <span className={styles.arrow}>→</span>
          </>
        ) : (
          <span>&nbsp;</span>
        )}
      </Link>
    </div>
  );
}
