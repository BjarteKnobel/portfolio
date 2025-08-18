import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handle = () => {
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