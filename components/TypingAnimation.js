import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const words = ["architect", "parametric designer", "wibe coder"];

export default function TypingAnimation() {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (stopped) return;
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setText(currentWord.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setText(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      if (!isDeleting && charIndex >= currentWord.length) {
        // If last word, start deleting, but don't stop yet
        setIsDeleting(true);
      } else if (isDeleting && charIndex <= 0) {
        if (wordIndex === words.length - 1) {
          setStopped(true); // Stop after deleting last word
        } else {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1));
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, stopped]);

  // Instead of SVG, use a regular span with the same styling as the "bjarte:" text
  return (
    <span className={styles.animatedText}>
      {text}
    </span>
  );
} 