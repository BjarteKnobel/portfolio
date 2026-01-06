import '../styles/globals.css';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const lastPathnameRef = useRef(null);

  useEffect(() => {
    const handle = (url) => {
      const nextUrl = typeof url === 'string' ? url : router.asPath;
      const [pathname, queryString = ''] = nextUrl.split('?');
      const params = new URLSearchParams(queryString);
      const view = params.get('view');

      // Only run easeUp when the pathname changes (skip query-only changes)
      const prevPathname = lastPathnameRef.current;
      lastPathnameRef.current = pathname;

      // Also skip easeUp entirely when opening the project carousel view
      if (pathname === '/projects' && view === 'carousel') return;
      if (prevPathname !== null && prevPathname === pathname) return;

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
    handle(router.asPath);
    router.events.on('routeChangeComplete', handle);
    return () => router.events.off('routeChangeComplete', handle);
  }, [router.events, router.asPath]);

  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}