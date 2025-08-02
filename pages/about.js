import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import styles from '../styles/About.module.css';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import useClickOutside from '../hooks/useClickOutside';

export default function About() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useClickOutside([menuRef], () => {
    if (showMenu) setShowMenu(false);
  });





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
            <Link href="/" className={styles.nameText}>
              bjarte:
            </Link>
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
                  } else if (key === 'projects') {
                    router.push('/projects');
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
          {/* Left Column */}
          <div className={styles.leftColumn}>
            <div className={styles.imageContainer}>
              <Image
                src="/assets/bjarte_image.png"
                alt="bjarte knobel"
                width={306}
                height={461}
                className={styles.profileImage}
                priority
              />
            </div>
            
            <div className={styles.profileInfo}>
              <div className={styles.nameSection}>
                <h1 className={styles.fullName}>bjarte nikolai knobel</h1>
                <div className={styles.locationContainer}>
                  <Image
                    src="/assets/world_icon.svg"
                    alt="location"
                    width={16}
                    height={16}
                  />
                  <span className={styles.location}>oslo, norway</span>
                </div>
                <p className={styles.tagline}>architect in tech pursuing a career in real estate development.</p>
              </div>
              
              <div className={styles.skillsSection}>
                <div className={styles.skillsGrid}>
                  <span className={styles.skill}>archicad</span>
                  <span className={styles.skill}>twinmotion</span>
                  <span className={styles.skill}>grasshopper</span>
                  <span className={styles.skill}>rhino</span>
                  <span className={styles.skill}>adobe</span>
                  <span className={styles.skill}>revit</span>
                  <span className={`${styles.skill} ${styles.skillWhite}`}>c#</span>
                  <span className={`${styles.skill} ${styles.skillWhite}`}>typescript</span>
                  <span className={`${styles.skill} ${styles.skillGreen}`}>drivers license b</span>
                  <span className={`${styles.skill} ${styles.skillPurple}`}>spanish</span>
                  <span className={`${styles.skill} ${styles.skillPurple}`}>norwegian</span>
                  <span className={`${styles.skill} ${styles.skillPurple}`}>german</span>
                  <span className={`${styles.skill} ${styles.skillPurple}`}>english</span>
                  <span className={`${styles.skill} ${styles.skillWhite}`}>more....</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Work Experience Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.iconPurple}>
                  <Image
                    src="/assets/work_experience.svg"
                    alt="work experience"
                    width={20}
                    height={20}
                  />
                </div>
                <h2 className={styles.sectionTitle}>work experience</h2>
              </div>
              
              <div className={styles.experienceItem}>
                <div className={styles.experienceHeader}>
                  <h3 className={styles.companyName}>arealize as</h3>
                  <span className={styles.period}>2021 - present</span>
                </div>
                <p className={styles.role}>architect</p>
                <p className={styles.description}>
                  <a href="https://www.arealize.ai/" target="_blank" rel="noopener noreferrer" className={styles.companyLink}>arealize</a>, a proptech startup from ntnu's entrepreneurial school (2021), collaborates with clients like entra and malling. i lead workplace development, work with digitization, design, sales and product innovation.
                </p>
              </div>

              <div className={styles.experienceItem}>
                <div className={styles.experienceHeader}>
                  <h3 className={styles.companyName}>obos as</h3>
                  <span className={styles.period}>2020 - 2021</span>
                </div>
                <p className={styles.role}>intern</p>
                <p className={styles.description}>
                  at <a href="https://www.obos.no/" target="_blank" rel="noopener noreferrer" className={styles.companyLink}>obos</a>, i carried out administrative tasks, on-site construction work and project development.
                </p>
              </div>

              <div className={styles.experienceItem}>
                <div className={styles.experienceHeader}>
                  <h3 className={styles.companyName}>spark*</h3>
                  <span className={styles.period}>2020 - 2021</span>
                </div>
                <p className={styles.role}>marketing</p>
                <p className={styles.description}>
                  my tasks at <a href="https://sparkntnu.no/" target="_blank" rel="noopener noreferrer" className={styles.companyLink}>spark</a> included promoting entrepreneurial initiatives and producing reports for startups and events.
                </p>
              </div>

              <div className={styles.experienceItem}>
                <div className={styles.experienceHeader}>
                  <h3 className={styles.companyName}>betong øst</h3>
                  <span className={styles.period}>2020</span>
                </div>
                <p className={styles.role}>intern</p>
                <p className={styles.description}>
                  at <a href="https://betongost.no/" target="_blank" rel="noopener noreferrer" className={styles.companyLink}>betong øst</a>, i carried out administrative tasks, on-site construction work and project development.
                </p>
              </div>

              <div className={styles.experienceItem}>
                <div className={styles.experienceHeader}>
                  <h3 className={styles.companyName}>broderskabet</h3>
                  <span className={styles.period}>2020</span>
                </div>
                <p className={styles.role}>deputy chairman</p>
                <p className={styles.description}>
                  at <a href="https://www.broderskabet.no/" target="_blank" rel="noopener noreferrer" className={styles.companyLink}>broderskabet</a>, i carried out administrative tasks, on-site construction work and project development.
                </p>
              </div>

              <div className={styles.experienceItem}>
                <div className={styles.experienceHeader}>
                  <h3 className={styles.companyName}>foodora</h3>
                  <span className={styles.period}>2020</span>
                </div>
                <p className={styles.role}>delivery rider</p>
              </div>
            </div>

            {/* Education Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.iconGreen}>
                  <Image
                    src="/assets/education.svg"
                    alt="education"
                    width={24}
                    height={24}
                  />
                </div>
                <h2 className={styles.sectionTitle}>education</h2>
              </div>
              
              <div className={styles.experienceItem}>
                <div className={styles.experienceHeader}>
                  <h3 className={styles.companyName}>master's degree in architecture</h3>
                  <span className={styles.period}>2018 - 2023</span>
                </div>
                <p className={styles.role}>norwegian university of science and technology (ntnu)</p>
                <p className={styles.description}>
                  my primary areas of focus included sustainable architecture, building transformation, large-scale structures, and real estate development.
                </p>
              </div>

              <div className={styles.experienceItem}>
                <div className={styles.experienceHeader}>
                  <h3 className={styles.companyName}>csdg - parametric camp</h3>
                  <span className={styles.period}>2023</span>
                </div>
                <p className={styles.role}>conseptual structural design</p>
                <p className={styles.description}>
                  an ntnu-based camp designed to teach students and professionals how to use grasshopper and develop c# skills, enabling them to create customized plugins in gh or dyn.
                </p>
              </div>

              <div className={styles.experienceItem}>
                <div className={styles.experienceHeader}>
                  <h3 className={styles.companyName}>high school</h3>
                  <span className={styles.period}>2015-2018</span>
                </div>
                <p className={styles.role}>science studies</p>
                <p className={styles.description}>
                  specialized in mathematics r2, biology 2, physics 1, science and technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 