import { useEffect } from 'react';

export default function useClickOutside(refs, callback) {
  useEffect(() => {
    function handleClick(event) {
      if (refs.every(ref => ref.current && !ref.current.contains(event.target))) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [refs, callback]);
} 