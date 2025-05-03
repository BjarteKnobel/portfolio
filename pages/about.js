import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import styles from '../styles/About.module.css';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

export default function About() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Bjarte Knobel | About</title>
        <meta name="description" content="About Bjarte Knobel - Architect and Developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.logoGroup}>
            <span className={styles.nameText}>bjarte:</span>
            <span className={styles.roleText}>about</span>
          </div>
          <div className={styles.menuContainer} ref={menuRef}>
            <button className={styles.menuButton} onClick={toggleMenu}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </button>
            {showMenu && (
              <Menu
                className={styles.menuDropdown}
                selected="about"
                onSelect={(key) => {
                  if (key === 'home') {
                    router.push('/');
                  }
                  setShowMenu(false);
                }}
              />
            )}
          </div>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.contentContainer}>
          <div className={styles.imageContainer}>
            <Image
              src="/assets/profile.jpg"
              alt="Bjarte Knobel"
              width={500}
              height={700}
              className={styles.profileImage}
              priority
            />
          </div>
          
          <div className={styles.infoContainer}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Work Experience</h2>
              
              <h3 className={styles.jobTitle}>Arealize AS</h3>
              <p className={styles.period}>2021 - Present</p>
              <p className={styles.role}>Architect</p>
              <p className={styles.description}>
                Arealize, a Proptech startup from NTNU's entrepreneurial school (2021), collaborates with clients like Entra and Malling. I lead workplace development, work with digitization and product innovation.
              </p>
              
              <h3 className={styles.jobTitle}>OBOS</h3>
              <p className={styles.period}>2020 - 2021</p>
              <p className={styles.role}>Architect Intern</p>
              <p className={styles.description}>
                At OBOS, I carried out administrative tasks, on-site construction work and project development.
              </p>
              
              <h3 className={styles.jobTitle}>Spark NTNU</h3>
              <p className={styles.period}>2020 - 2021</p>
              <p className={styles.role}>Marketing</p>
              <p className={styles.description}>
                My tasks at Spark included promoting entrepreneurial initiatives and producing reports for startups and events.
              </p>
            </div>
            
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Education</h2>
              
              <h3 className={styles.schoolName}>Norwegian University of Science and Technology</h3>
              <p className={styles.period}>2018 - 2023</p>
              <p className={styles.degree}>Master's Degree in Architecture</p>
              <p className={styles.description}>
                My primary areas of focus included sustainable architecture, building transformation, large-scale structures, and real estate development.
              </p>
              
              <h3 className={styles.schoolName}>CSDG - Parametric Camp - Conceptual structural design</h3>
              <p className={styles.period}>2023</p>
              <p className={styles.description}>
                An NTNU-based camp designed to teach students and professionals how to use Grasshopper and develop C# skills, enabling them to create customized plugins in GH or DYN.
              </p>
              
              <h3 className={styles.schoolName}>Science Studies</h3>
              <p className={styles.period}>2015 - 2018</p>
              <p className={styles.description}>
                Specialized in Mathematics R2, Biology 2, Physics 1, Science and Technology.
              </p>
            </div>
            
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Skills</h2>
              <div className={styles.skillsList}>
                <span className={styles.skill}>Archicad</span>
                <span className={styles.skill}>Twinmotion</span>
                <span className={styles.skill}>Grasshopper</span>
                <span className={styles.skill}>Typescript</span>
                <span className={styles.skill}>C#</span>
                <span className={styles.skill}>GIS</span>
                <span className={styles.skill}>Figma</span>
                <span className={styles.skill}>Revit</span>
                <span className={styles.skill}>Photoshop</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 