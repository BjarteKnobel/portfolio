import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const defaultWords = ["architect", "parametric designer", "wibe coder"];

export default function TypingAnimation({ words = defaultWords, single = false, typeDelay = 100, deleteDelay = 50 }) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (stopped) return;
    const currentWord = words[wordIndex] || '';

    const timeout = setTimeout(() => {
      if (single || words.length === 1) {
        // Type the single word once and stop
        if (charIndex < currentWord.length) {
          setText(currentWord.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setStopped(true);
        }
        return;
      }

      // Multi-word looping type/delete behavior
      if (isDeleting) {
        setText(currentWord.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setText(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      if (!isDeleting && charIndex >= currentWord.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex <= 0) {
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
      }
    }, (single || words.length === 1) ? typeDelay : (isDeleting ? deleteDelay : typeDelay));

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, stopped, single, words, typeDelay, deleteDelay]);

  return (
    <span className={styles.animatedText}>
      {text}
    </span>
  );
}