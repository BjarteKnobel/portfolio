import styles from '../styles/Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Left column */}
      <div className={styles.leftColumn}>
        <div className={styles.headerBlock}>
          <p className={styles.contactText}>
            if you have any questions or inquiries, feel free to get in touch with me by email or phone.
          </p>
        </div>
      </div>

      {/* Right column */}
      <div className={styles.rightColumn}>
        <div className={styles.socialIcons}>
          <Link href="tel:+4795400929" className={styles.iconFrame}>
            <Image src="/assets/phone.svg" alt="Phone" width={24} height={24} />
          </Link>
          <Link href="https://www.linkedin.com/in/bjarte-nikolai-knobel-a434a914b" target="_blank" rel="noopener noreferrer" className={styles.iconFrame}>
            <Image src="/assets/linkdin.svg" alt="LinkedIn" width={24} height={24} />
          </Link>
          <Link href="mailto:bjarte05@gmail.com" className={styles.iconFrame}>
            <Image src="/assets/mail.svg" alt="Email" width={24} height={24} />
          </Link>
          <Link href="https://github.com/BjarteKnobel" target="_blank" rel="noopener noreferrer" className={styles.iconFrame}>
            <Image src="/assets/github.svg" alt="GitHub" width={24} height={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
}