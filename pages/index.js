import Layout from '../components/Layout';
import Image from 'next/image';
import TextCarousel from '../components/TextCarousel';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [imgError, setImgError] = useState(false);

  return (
    <Layout title="Netside Home">
      {/* Image Section */}
      <section className={styles.imageSection}>
        <div className={styles.imageGroup}>
          {!imgError ? (
            <Image
              src="/assets/body-image-1.png"
              alt="Main visual"
              layout="fill"
              objectFit="cover"
              priority
              className={styles.mainImage}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={styles.fallback}>Image not found.</div>
          )}
        </div>
      </section>

      {/* Projects Carousel */}
      <TextCarousel text="projects →" speed={0.5} className="firstCarousel" />

      {/* Body Text */}
      <section className={styles.bodyText}>
        <p>
          I am an <span className={styles.emphasisText}>architect</span> in tech pursuing a career in real estate development
          with a passion for innovation, and entrepreunship.
        </p>
        <p>
          I'm <span className={styles.emphasisText}>passionate</span> about solving productivity challenges in the AEC sector
          through innovation, aiming to create a future where architectural
          quality and cost efficiency go hand in hand.
        </p>
      </section>

      {/* About Carousel */}
      <TextCarousel text="about →" speed={0.5} />
    </Layout>
  );
} 