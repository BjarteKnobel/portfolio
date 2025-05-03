import { useEffect, useState } from 'react';
import styles from '../styles/LoadingText.module.css';

export default function LoadingText() {
  const [showLastDot, setShowLastDot] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowLastDot(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loadingText}>
      <span>great projects coming up</span>
      <span className={styles.dots}>
        ..
        <span className={styles.lastDot}>
          {showLastDot ? '.' : '\u00A0'}
        </span>
      </span>
    </div>
  );
} 