import styles from '../styles/Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Left column */}
      <div className={styles.leftColumn}>
        <div className={styles.headerBlock}>
          <h2 className={styles.contactTitle}>contact</h2>
          <p className={styles.contactText}>
            if you have any questions or inquiries, feel free to get in touch with me by email or phone.
          </p>
        </div>

        <div className={styles.socialIcons}>
          <Link href="tel:+1234567890" className={styles.iconFrame}>
            <Image src="/assets/phone.svg" alt="Phone" width={24} height={24} />
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.iconFrame}>
            <Image src="/assets/linkdin.svg" alt="LinkedIn" width={24} height={24} />
          </Link>
          <Link href="mailto:your@email.com" className={styles.iconFrame}>
            <Image src="/assets/mail.svg" alt="Email" width={24} height={24} />
          </Link>
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.iconFrame}>
            <Image src="/assets/github.svg" alt="GitHub" width={24} height={24} />
          </Link>
        </div>
      </div>

      {/* Right column */}
      <div className={styles.rightColumn}>
        <div className={styles.nameBlock}>
          <span className={styles.nameText}>bjarte nikolai knobel</span>
        </div>
      </div>
    </footer>
  );
}