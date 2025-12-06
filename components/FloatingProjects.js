import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../styles/FloatingProjects.module.css';

const FloatingProjects = React.memo(({ projects }) => {
  const [projectStates, setProjectStates] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [zIndices, setZIndices] = useState({});
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const router = useRouter();
  const highestZIndex = useRef(10);

  // Track window size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate aspect ratios and random positions
  useEffect(() => {
    // Prefer container size; fallback to window size; finally a safe default
    const container = containerRef.current;
    const containerRect = container?.getBoundingClientRect();
    const width = containerRect?.width || windowSize.width || 1024;
    const height = containerRect?.height || windowSize.height || 768;

    const isMobile = width <= 768;
    
    const states = projects.map((project, index) => {
      // Calculate aspect ratio from image dimensions
      const aspectRatio = (project.imageWidth || 400) / (project.imageHeight || 300);
      const baseHeight = 60;
      const baseWidth = baseHeight * aspectRatio;
      
      // Random position within bounds with padding
      const padding = isMobile ? 60 : 40;
      const maxX = width - baseWidth - padding;
      const maxY = height - baseHeight - padding;
      
      const x = (isMobile ? padding / 2 : 0) + Math.random() * Math.max(0, maxX - (isMobile ? padding / 2 : 0));
      const y = (isMobile ? padding / 2 : 0) + Math.random() * Math.max(0, maxY - (isMobile ? padding / 2 : 0));
      
      return {
        id: project.id,
        x,
        y,
        baseWidth,
        baseHeight,
        aspectRatio,
        floatOffsetX: (Math.random() - 0.5) * 20,
        floatOffsetY: (Math.random() - 0.5) * 20,
        floatDuration: 4 + Math.random() * 2,
        floatDelay: Math.random() * 2,
      };
    });
    
    setProjectStates(states);
    
    // Initialize z-indices
    const initialZIndices = {};
    projects.forEach((project, index) => {
      initialZIndices[project.id] = index + 10;
    });
    setZIndices(initialZIndices);
  }, [projects, windowSize]);

  const bringToFront = (id) => {
    highestZIndex.current += 1;
    setZIndices(prev => ({
      ...prev,
      [id]: highestZIndex.current
    }));
  };

  const handleDragStart = (id) => {
    bringToFront(id);
  };

  const handleClick = (project) => {
    if (selectedId === project.id) {
      // Navigate on second click
      router.push(`/projects?view=carousel&id=${project.id}`);
    } else {
      // Expand on first click
      setSelectedId(project.id);
      bringToFront(project.id);
    }
  };

  if (projectStates.length === 0) return null;

  return (
    <div ref={containerRef} className={styles.container}>
      {projects.map((project, index) => {
        const state = projectStates[index];
        if (!state) return null;
        
        const isSelected = selectedId === project.id;
        const isMobile = windowSize.width <= 768;
        const expandScale = isMobile ? 2 : 3;
        
        // Calculate drag constraints
        const dragConstraints = containerRef.current ? {
          left: 0,
          right: containerRef.current.clientWidth - state.baseWidth * (isSelected ? expandScale : 1),
          top: 0,
          bottom: containerRef.current.clientHeight - state.baseHeight * (isSelected ? expandScale : 1)
        } : undefined;
        
        return (
          <motion.div
            key={project.id}
            className={`${styles.floatingImage} ${isSelected ? styles.expanded : ''}`}
            drag
            dragConstraints={dragConstraints}
            dragElastic={0.1}
            dragMomentum={false}
            onDragStart={() => handleDragStart(project.id)}
            onClick={() => handleClick(project)}
            initial={{
              x: state.x,
              y: state.y,
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              x: state.x,
              y: state.y,
              opacity: 1,
              scale: isSelected ? expandScale : 1,
              zIndex: zIndices[project.id] || 10,
            }}
            transition={{
              opacity: { duration: 0.5, delay: index * 0.1 },
              scale: { 
                duration: 0.4, 
                type: "spring",
                stiffness: 300,
                damping: 30
              },
              x: { type: "spring", stiffness: 200, damping: 20 },
              y: { type: "spring", stiffness: 200, damping: 20 },
            }}
            style={{
              width: state.baseWidth,
              height: state.baseHeight,
            }}
            whileHover={{ scale: isSelected ? expandScale : 1.1 }}
            whileDrag={{ scale: isSelected ? expandScale : 1.05 }}
          >
            <motion.div
              className={styles.floatingAnimation}
              animate={{
                x: isMobile ? [0, state.floatOffsetX * 0.5, 0] : [0, state.floatOffsetX, 0],
                y: isMobile ? [0, state.floatOffsetY * 0.5, 0] : [0, state.floatOffsetY, 0],
              }}
              transition={{
                duration: state.floatDuration,
                delay: state.floatDelay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={state.baseWidth}
                  height={state.baseHeight}
                  className={styles.image}
                  quality={90}
                  priority={index < 2}
                  draggable={false}
                />
                
                <AnimatePresence>
                  {isSelected && (
                    <motion.div 
                      className={styles.info}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3>{project.title}</h3>
                      <p>{project.type}</p>
                      <span className={styles.clickAgain}>Click again to view →</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
});

FloatingProjects.displayName = 'FloatingProjects';

export default FloatingProjects;