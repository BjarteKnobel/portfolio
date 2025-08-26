import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import FadeInImage from './FadeInImage';
import { getAllProjects } from '../data/projects';
import Footer from './Footer';
import styles from '../styles/ProjectCarousel.module.css';

export default function ProjectCarousel() {
  const router = useRouter();
  const projects = getAllProjects();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  useEffect(() => {
    // Read id from query to set initial project
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const idParam = parseInt(params.get('id'), 10);
      const view = params.get('view');
      
      if (!Number.isNaN(idParam)) {
        const idx = projects.findIndex(p => p.id === idParam);
        if (idx >= 0) setCurrentProjectIndex(idx);
      }
      
      // Trigger slide-in animation when carousel view is shown
      if (view === 'carousel') {
        setIsClosing(false);
        const raf = requestAnimationFrame(() => setIsAnimatingIn(true));
        return () => cancelAnimationFrame(raf);
      }
    }
  }, [router.query]);
  const currentProject = projects[currentProjectIndex];
  const isFirstProject = currentProject && currentProject.id === 1;

  const nextProject = () => {
    setCurrentProjectIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevProject = () => {
    setCurrentProjectIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before navigating
    setTimeout(() => {
      router.push('/projects', undefined, { shallow: true });
    }, 600); // Match animation duration
  };

  if (!currentProject) return null;

  return (
    <div className={`${styles.carousel} ${isAnimatingIn ? styles.animateIn : ''} ${isClosing ? styles.animateOut : ''}`}>
      <header className={styles.navbar}>
        <div className={styles.logoGroup}>
          <Link href='/' legacyBehavior>
            <a className={styles.logo}>bjarte:</a>
          </Link>
          <span className={styles.projectTitle}>{isFirstProject ? 'sverresborg apartments' : currentProject.title}</span>
        </div>
        <button onClick={handleClose} className={styles.closeBtn} aria-label='Close project'>×</button>
      </header>

      {/* Intro section: image on the left, text on the right */}
      <section className={styles.introGrid}>
        <div className={styles.introImage}>
        <FadeInImage
            src={isFirstProject ? '/assets/render_sverresborg_ferieleiligheter.png' : currentProject.image}
          alt={currentProject.title}
            width={800}
            height={600}
          priority
            style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
        />
      </div>

        <div className={styles.introText}>
          <p className={styles.introParagraph}>{currentProject.fullDescription || currentProject.description}</p>

        <div className={styles.detailsTableRow}>
          <div className={styles.detailsTableCol}>
            {currentProject.details.slice(0, 3).map((detail, idx) => (
              <div key={detail.label} className={styles.detailsTableRowItem}>
                <span className={styles.detailsTableLabel}>{detail.label}</span>
                <span className={styles.detailsTableValue}>{detail.value}</span>
                {idx < 2 && <div className={styles.detailsTableHLine} />}
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Two-column content section for project 2 (skippergata 11) */}
      {currentProject && currentProject.id === 2 && (
        <section className={styles.twoColSection}>
          <div className={styles.twoColWrap}>
            <div className={styles.twoLeft}>
              <div className={styles.twoIntroRow}>
                <div className={styles.twoIntroIcon}>
                  <FadeInImage src="/assets/cities_of_making.svg" alt="Cities of Making" width={82} height={121} />
                </div>
                <p className={styles.twoIntroText}>
                  {/* Placeholder copy – will be replaced with provided text */}
                  The concept is informed by research from the Cities of Making movement and the book The Design of Urban Manufacturing, together with a rigorous analysis of the site and its urban context. This body of work has been pivotal to the development of the concept and has shaped the final proposal. A selection of the resulting design strategies is outlined below.
                </p>
              </div>

              <div className={styles.designBlock}>
                <div className={styles.designLabel}>selected design strategies</div>
                <div className={styles.designGrid}>
                  <div className={styles.designItem}>
                    <FadeInImage src="/assets/shared_space_icon.png" alt="shared spaces" width={135} height={86} />
                    <p className={styles.designText}>
                      By leveraging shared spaces and enabling technologies, the project expands access to costly equipment, improves operational efficiency, and catalyzes knowledge exchange across producers.
                    </p>
                  </div>
                  <div className={styles.designItem}>
                    <FadeInImage src="/assets/multi_storey_icon.png" alt="multi-storey" width={135} height={86} />
                    <p className={styles.designText}>
                      Freight lifts and robust, heavy-duty floor structures in multi-storey buildings enable intensified, flexible industrial programs with the capacity to adapt to shifting spatial demands.
                    </p>
                  </div>
                  <div className={styles.designItem}>
                    <FadeInImage src="/assets/complementary_industry_icon.png" alt="complementary industries" width={135} height={86} />
                    <p className={styles.designText}>
                      Integrating complementary production processes with adjacent services establishes efficient workflows while unlocking resource and knowledge synergies through cross-disciplinary innovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.twoRight}>
              <div className={styles.rightImageBox}>
                <FadeInImage
                  src={'/assets/parkgata_11_cross_section.png'}
                  alt="cross section"
                  width={566}
                  height={324}
                />
              </div>
              <div className={styles.rightCaption}>cross section</div>
            </div>
          </div>
        </section>
      )}

      {/* Floorplan image section (only for first project) */}
      {isFirstProject && (
        <section className={styles.planImageSection}>
          <div className={styles.planImageWrap}>
            <div className={styles.planImageFrame}>
              <Image
                src="/assets/floorplan-1.etg.png"
                alt="floor plan"
                width={1176}
                height={1073}
                className={styles.planImage}
                priority
              />
            </div>
            <div className={styles.planMetaRow}>
              <div className={styles.planCaption}>1. floor</div>
              <Image src="/assets/north-arrow.svg" alt="north arrow" width={35} height={35} className={styles.northArrow} />
            </div>
          </div>
        </section>
      )}

      {/* West facade section: only for project 2 */}
      {currentProject && currentProject.id === 2 && (
        <section className={styles.facadeSection}>
          <div className={styles.facadeWrap}>
            <FadeInImage
              src="/assets/west_facade.png"
              alt="west facade"
              width={1176}
              height={600}
              className={styles.facadeImage}
            />
            <div className={styles.facadeCaption}>1. west facade</div>
          </div>
        </section>
      )}

      {/* Design strategies section: only for moholt studenthousing (project 3) */}
      {currentProject && currentProject.id === 3 && (
        <section className={styles.strategiesSection}>
          <div className={styles.strategiesWrap}>
            <h2 className={styles.strategiesHeader}>passive strategies</h2>
            <div className={styles.strategiesGrid}>
              <div className={styles.strategyItem}>
                <Image
                  src="/assets/compactness.png"
                  alt="Compactness strategy"
                  width={334}
                  height={234}
                  className={styles.strategyImage}
                />
                <h3 className={styles.strategyTitle}>Compactness</h3>
                <p className={styles.strategyText}>
                  In buildings, compact forms have less exterior surface area per m³ of heated volume. Since heat loss scales with envelope area and ΔT (Q ≈ U·A·ΔT + infiltration), a lower surface-to-volume ratio cuts conduction, air leakage, and thermal bridging-making airtightness easier and heating demand smaller.
                </p>
              </div>
              <div className={styles.strategyItem}>
                <Image
                  src="/assets/thermal_storage.png"
                  alt="Thermal storage strategy"
                  width={334}
                  height={234}
                  className={styles.strategyImage}
                />
                <h3 className={styles.strategyTitle}>Thermal storage</h3>
                <p className={styles.strategyText}>
                  Thermal storage (thermal mass) is a building's ability to absorb, store, and later release heat, smoothing indoor temperature swings. High-heat-capacity materials such as concrete soak up gains (sun, occupants, equipment) and release them as temperatures drop, reducing peaks and shifting heating/cooling loads. The main interior wall in the atrium acts as thermal mass.
                </p>
              </div>
              <div className={styles.strategyItem}>
                <Image
                  src="/assets/Thermal_buffer.png"
                  alt="Thermal buffer strategy"
                  width={334}
                  height={234}
                  className={styles.strategyImage}
                />
                <h3 className={styles.strategyTitle}>Thermal buffer</h3>
                <p className={styles.strategyText}>
                  A thermal buffer is an unconditioned or semi-conditioned zone placed between outdoors and occupied spaces to moderate temperature swings and infiltration. Examples include vestibules, sunspaces, double-skin façades, garages, corridors, and attics; they "pre-temper" air and absorb exterior fluctuations, cutting peak loads and reducing heat loss/gain to the core. The pitched roof acts as such a buffer in addition to the bicycle parking and the activity space where heating is not needed to the same degree as other areas.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Isometric building diagrams section: only for moholt studenthousing (project 3) */}
      {currentProject && currentProject.id === 3 && (
        <section className={styles.isometricSection}>
          <div className={styles.isometricWrap}>
            <div className={styles.isometricVertical}>
              <div className={styles.isometricItem}>
                <FadeInImage
                  src="/assets/internal_temperatures.png"
                  alt="Internal temperatures"
                  width={712}
                  height={600}
                  className={styles.isometricImage}
                />
                <div className={styles.imageText}>internal temperatures</div>
              </div>
              <div className={styles.isometricItem}>
                <FadeInImage
                  src="/assets/heat_gains.png"
                  alt="Heat gains and losses"
                  width={712}
                  height={600}
                  className={styles.isometricImage}
                />
                <div className={styles.imageText}>heat gains and losses</div>
              </div>
          </div>
        </div>
        </section>
      )}

      {/* Photo section: only for first project (placed at bottom) */}
      {isFirstProject && (
        <section className={styles.photoSection}>
          <div className={styles.photoWrap}>
            <FadeInImage
              src="/assets/sverresborg_hotel.png"
              alt="main facade"
              width={1176}
              height={784}
              className={styles.photoImage}
            />
            <div className={styles.photoCaption}>main facade</div>
          </div>
        </section>
      )}

      {/* Two-photo side-by-side section: only for project 4 (additiv) */}
      {currentProject && currentProject.id === 4 && (
        <section className={styles.twoPhotoSection}>
          <div className={styles.twoPhotoWrap}>
            <div className={styles.photoItemLarge}>
              <FadeInImage
                src="/assets/grasshopper_script.png"
                alt="gh. script concrete structure"
                width={566}
                height={360}
                className={styles.photoLargeImage}
              />
              <div className={styles.photoLargeCaption}>gh. script concrete structure</div>
            </div>
            <div className={styles.photoItemLarge} style={{ position: 'relative' }}>
              <FadeInImage
                src="/assets/concrete.png"
                alt="building element"
                width={566}
                height={360}
                className={styles.photoLargeImage}
              />
              <div className={styles.photoLargeCaption} style={{ position: 'absolute', left: '0', bottom: '-30px' }}>building element</div>
            </div>
        </div>
        </section>
      )}

      {/* Stress/Deformation two-up section: only for project 4 (additiv) */}
      {currentProject && currentProject.id === 4 && (
        <section className={styles.twoChartSection}>
          <div className={styles.twoChartWrap}>
            <div className={styles.chartItem}>
              <FadeInImage
                src="/assets/stress.png"
                alt="stress before hardening"
                width={375}
                height={214}
                className={styles.chartImage}
              />
              <div className={styles.chartCaption}>stress before hardening</div>
            </div>
            <div className={styles.chartItem}>
              <FadeInImage
                src="/assets/deformation.png"
                alt="deformation before hardening"
                width={375}
                height={214}
                className={styles.chartImage}
              />
              <div className={styles.chartCaption}>deformation before hardening</div>
            </div>
      </div>
        </section>
      )}

      <Footer />
    </div>
  );
} 