import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/assets/webpage_icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bjarteknobel.com/" />
        <meta property="og:title" content="Bjarte Knobel - Architect & Developer" />
        <meta property="og:description" content="Architect in tech pursuing a career in real estate development with a passion for innovation and entrepreneurship." />
        <meta property="og:image" content="https://bjarteknobel.com/assets/landing_page_image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://bjarte.com/" />
        <meta property="twitter:title" content="Bjarte Knobel - Architect & Developer" />
        <meta property="twitter:description" content="Architect in tech pursuing a career in real estate development with a passion for innovation and entrepreneurship." />
        <meta property="twitter:image" content="https://bjarteknobel.com/assets/landing_page_image.png" />
        
        {/* Additional meta tags for better SEO */}
        <meta name="description" content="Architect in tech pursuing a career in real estate development with a passion for innovation and entrepreneurship." />
        <meta name="keywords" content="architect, real estate development, innovation, entrepreneurship, AEC sector, sustainability, livability" />
        <meta name="author" content="Bjarte Knobel" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 