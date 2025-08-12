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
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateBars(true), 50);
    return () => clearTimeout(timer);
  }, []);

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
                  <span className={styles.worldIcon}>
                    <Image
                      src="/assets/world_icon.svg"
                      alt="location"
                      width={12}
                      height={12}
                    />
                  </span>
                  <span className={styles.location}>oslo, norway</span>
                </div>
                <p className={styles.tagline}>architect in tech pursuing a career in real estate development.</p>
              </div>
              
              {/* Toolboxs section with animated load bars */}
              <div className={styles.toolboxSection}>
                <div className={styles.toolboxHeaderRow}>
                  <span className={styles.toolboxHeader}>toolboxs:</span>
                </div>
                <div className={styles.skillList}>
                  {(() => {
                    const iconFor = (name) => {
                      const key = name.toLowerCase();
                      if (['javascript', 'typescript', 'c#'].includes(key)) return '/assets/code.svg';
                      if (['adobe', 'drawing'].includes(key)) return '/assets/pen.svg';
                      if (
                        [
                          'archicad',
                          'twinmotion',
                          'grasshopper',
                          'rhino',
                          'revit',
                          'autocad',
                          'figma'
                        ].includes(key)
                      ) return '/assets/computer.svg';
                      if (['english', 'spanish', 'norwegian', 'german'].includes(key)) return '/assets/language.svg';
                      if (key.includes('license') || key.includes('drivers')) return '/assets/car.svg';
                      return '/assets/computer.svg';
                    };
                    // Group order: computer tools -> code -> languages -> rest
                    return [
                      // Computer tools
                      { name: 'archicad', level: 0.85 },
                      { name: 'twinmotion', level: 0.8 },
                      { name: 'grasshopper', level: 0.75 },
                      { name: 'rhino', level: 0.78 },
                      { name: 'revit', level: 0.6 },
                      { name: 'autocad', level: 0.55 },
                      { name: 'figma', level: 0.7 },
                      // Code
                      { name: 'javascript', level: 0.7 },
                      { name: 'typescript', level: 0.6 },
                      { name: 'c#', level: 0.4 },
                      // Languages
                      { name: 'english', level: 0.95 },
                      { name: 'norwegian', level: 1.0 },
                      { name: 'german', level: 0.5 },
                      { name: 'spanish', level: 0.6 },
                      // Rest
                      { name: 'adobe', level: 0.65 },
                    ].map((skill, idx) => {
                    const percent = Math.round((animateBars ? skill.level : 0) * 100);
                    return (
                      <div key={skill.name} className={styles.skillRow}>
                        <div className={styles.progressBar} style={{ width: `${percent}%`, transitionDelay: `${idx * 120}ms` }} aria-hidden="true" />
                        <div className={styles.skillTextWrap}>
                          <span className={styles.skillText}>{skill.name}</span>
                          <span
                            className={styles.skillTextFill}
                            style={{ width: `${percent}%`, transitionDelay: `${idx * 120}ms` }}
                            aria-hidden="true"
                          >
                            <span>{skill.name}</span>
                          </span>
                        </div>
                        <span className={styles.skillIcon} aria-hidden="true">
                          <Image src={iconFor(skill.name)} alt="" width={12} height={12} />
                        </span>
                      </div>
                    );
                  });
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Work Experience Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>
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
                <div className={styles.sectionIcon}>
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