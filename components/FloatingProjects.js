import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation, useDragControls } from 'framer-motion';
import styles from '../styles/FloatingProjects.module.css';

// Card component handles individual project logic
const DraggableCard = ({ project, index, constraintsRef, onExpand }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();
  
  // Random initial position (avoiding edges)
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0, r: 0 });

  useEffect(() => {
    // Calculate random position within typical screen bounds
    // We use window dimensions if available, or fallback values
    const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    setInitialPos({
      x: Math.random() * (width * 0.6) - (width * 0.3),
      y: Math.random() * (height * 0.4) - (height * 0.2),
      r: Math.random() * 20 - 10
    });

    // Start gentle floating animation
    controls.start({
      y: [0, -10, 0],
      rotate: [initialPos.r, initialPos.r + 2, initialPos.r - 2, initialPos.r],
      transition: {
        duration: 5 + Math.random() * 3,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror"
      }
    });
  }, []);

  const handleDragStart = () => {
    setIsDragging(true);
    controls.stop(); // Stop floating while dragging
  };

  const handleDragEnd = () => {
    setTimeout(() => setIsDragging(false), 100);
    // Resume floating
    controls.start({
      y: [0, -10, 0],
      rotate: [initialPos.r, initialPos.r + 2, initialPos.r - 2, initialPos.r],
      transition: {
        duration: 5 + Math.random() * 3,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror"
      }
    });
  };

  const handleClick = () => {
    if (!isDragging) {
      setIsExpanded(!isExpanded);
      onExpand && onExpand(index, !isExpanded);
    }
  };

  // Animation variants
  const variants = {
    initial: { 
      scale: 1,
      zIndex: 1,
      height: 60, // Base height
    },
    expanded: { 
      scale: 3.5, // Increases size significantly (~200%+)
      zIndex: 100,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    hover: {
      scale: isExpanded ? 3.5 : 1.1,
      zIndex: 50,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className={styles.draggableCard}
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.1}
      dragMomentum={true}
      initial={initialPos}
      animate={isExpanded ? "expanded" : controls}
      whileHover="hover"
      variants={variants}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      style={{ x: initialPos.x, y: initialPos.y, rotate: initialPos.r }}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={project.image}
          alt={project.title}
          width={project.imageWidth || 400}
          height={project.imageHeight || 300}
          className={styles.image}
          draggable={false} // Prevent default browser drag
        />
        
        {isExpanded && (
          <motion.div 
            className={styles.infoOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3>{project.title}</h3>
            <p>{project.type}</p>
            <Link href={`/projects?view=carousel&id=${project.id}`} className={styles.link}>
              View Project →
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const FloatingProjects = React.memo(({ projects }) => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className={styles.container}>
      {projects.map((project, index) => (
        <DraggableCard 
          key={project.id} 
          project={project} 
          index={index} 
          constraintsRef={containerRef}
        />
      ))}
    </div>
  );
});

FloatingProjects.displayName = 'FloatingProjects';

export default FloatingProjects;