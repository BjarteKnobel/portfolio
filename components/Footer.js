import styles from '../styles/Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.contact}>
        <h2 className={styles.contactTitle}>Contact</h2>
        <p className={styles.contactText}>
          if you have any questions for any project, help etc. when it comes to architecture
        </p>
        <div className={styles.emailContainer}>
          <input 
            type="email" 
            placeholder="your@email.com" 
            className={styles.emailInput}
            aria-label="Email address"
          />
          <span className={styles.arrow}>→</span>
        </div>
      </div>
      <div className={styles.socialIcons}>
        <Link href="tel:+1234567890" className={styles.iconFrame}>
          <Image src="/assets/phone.svg" alt="Phone" width={16} height={16} />
        </Link>
        <Link href="mailto:your@email.com" className={styles.iconFrame}>
          <Image src="/assets/email.svg" alt="Email" width={16} height={16} />
        </Link>
        <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.iconFrame}>
          <Image src="/assets/linkedin.svg" alt="LinkedIn" width={16} height={16} />
        </Link>
        <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.iconFrame}>
          <Image src="/assets/github.svg" alt="GitHub" width={16} height={16} />
        </Link>
      </div>
    </footer>
  );
} 