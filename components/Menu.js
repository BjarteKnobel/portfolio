import styles from '../styles/Home.module.css';
import Image from 'next/image';

const menuItems = [
  {
    label: 'projects',
    icon: '/assets/icon-projects.svg',
    key: 'projects',
  },
  {
    label: 'about',
    icon: '/assets/icon-about.svg',
    key: 'about',
  },
  {
    label: 'contact',
    icon: '/assets/icon-contact.svg',
    key: 'contact',
  },
];

export default function Menu({ selected, onSelect }) {
  return (
    <div className={styles.menuDropdown}>
      {menuItems.map((item) => (
        <button
          key={item.key}
          className={`${styles.menuItem} ${selected === item.key ? styles.menuItemActive : ''}`}
          onClick={() => onSelect(item.key)}
        >
          <Image src={item.icon} alt="" width={16} height={16} className={styles.menuIcon} />
          <span className={styles.menuLabel}>{item.label}</span>
        </button>
      ))}
    </div>
  );
} 