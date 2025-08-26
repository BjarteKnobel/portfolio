import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const shouldAnimate = (url) => {
      try {
        const href = url || (typeof window !== 'undefined' ? window.location.href : '');
        if (!href) return true;
        const parsed = new URL(href, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
        // Disable global easeUp animation on the Projects route to avoid slide-up
        return parsed.pathname !== '/projects';
      } catch {
        return true;
      }
    };

    const handle = (url) => {
      if (!shouldAnimate(url)) return; // Skip easeUp on /projects (nav + carousel)
      requestAnimationFrame(() => {
        const root = document.querySelector('#__next');
        if (!root) return;
        const kids = Array.from(root.children);
        kids.forEach((el, idx) => {
          el.classList.remove('easeUp');
          // force reflow for replay
          void el.offsetHeight;
          el.style.setProperty('--enter-delay', `${idx * 60}ms`);
          el.classList.add('easeUp');
        });
      });
    };
    handle();
    router.events.on('routeChangeComplete', handle);
    return () => router.events.off('routeChangeComplete', handle);
  }, [router.events]);

  return <Component {...pageProps} />;
}