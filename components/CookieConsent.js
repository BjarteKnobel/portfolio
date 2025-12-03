import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import styles from '../styles/CookieConsent.module.css';

const STORAGE_KEY = 'cookie-consent-preference';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const persistChoice = useCallback((value) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <aside className={styles.wrapper} role="dialog" aria-live="polite" aria-label="Cookie preferences">
      <button
        className={styles.closeButton}
        aria-label="Close cookie preferences"
        onClick={() => persistChoice('dismissed')}
      >
        ×
      </button>
      <div className={styles.iconBox}>
        <Image src="/assets/cookie_icon.svg" alt="" width={44} height={44} priority />
      </div>
      <div className={styles.textBlock}>
        <h3 className={styles.title}>Cookie preferences</h3>
        <p className={styles.description}>
          We use cookies to improve functionality and analyze traffic. By continuing, you accept our use of cookies.
        </p>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.decline} onClick={() => persistChoice('declined')}>
          decline
        </button>
        <button type="button" className={styles.accept} onClick={() => persistChoice('accepted')}>
          accept
        </button>
      </div>
    </aside>
  );
}

