import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/FloatingProjects.module.css';

const FloatingProjects = React.memo(({ projects }) => {
  const [positions, setPositions] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);
  
  // Predefined random-looking positions that work well
  const getStaticPositions = () => {
    return [
      { top: '15%', left: '10%', rotation: -5, delay: 0.2 }, // additiv
      { top: '25%', left: '55%', rotation: 3, delay: 0.4 },  // skippergata
      { top: '55%', left: '20%', rotation: -2, delay: 0.6 }, // moholt
      { top: '60%', left: '65%', rotation: 4, delay: 0.8 },  // sverresborg
    ];
  };

  useEffect(() => {
    setPositions(getStaticPositions());
  }, []);

  if (positions.length === 0) return null;

  return (
    <div ref={containerRef} className={styles.container}>
      {projects.map((project, index) => {
        const position = positions[index];
        if (!position) return null;
        
        return (
          <Link
            key={project.id}
            href={`/projects?view=carousel&id=${project.id}`}
            className={`${styles.floatingCard} ${hoveredIndex === index ? styles.hovered : ''}`}
            style={{
              top: position.top,
              left: position.left,
              '--rotation': position.rotation + 'deg',
              '--delay': position.delay + 's',
              zIndex: hoveredIndex === index ? 100 : 10 - index
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className={styles.imageContainer}>
              <Image
                src={project.image}
                alt={project.title}
                width={project.imageWidth || 400}
                height={project.imageHeight || 300}
                className={styles.image}
                quality={90}
                priority={index < 2}
              />
              
              <div className={styles.overlay}>
                <div className={styles.overlayContent}>
                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.type}>{project.type}</p>
                  <span className={styles.viewMore}>View Project →</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
});

FloatingProjects.displayName = 'FloatingProjects';

export default FloatingProjects;