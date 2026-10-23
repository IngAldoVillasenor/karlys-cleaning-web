import { ShieldCheck } from 'lucide-react';
import styles from './AboutSection.module.css';

// English adaptation of Karly_Cleaning_Quienes_Somos.pdf supplied by the business.
const values = [
  {
    title: 'Trust',
    description: 'We build strong relationships with our clients through honesty, respect, and transparency in every interaction.',
  },
  {
    title: 'Excellence',
    description: 'We strive to exceed expectations with every service, paying close attention to detail and never settling for anything less than our best.',
  },
  {
    title: 'Community',
    description: 'We are part of West Chester and take pride in serving our neighbors. As our community grows, we grow with it.',
  },
  {
    title: 'Responsibility',
    description: 'We keep our commitments. If something does not meet your expectations, we make it right. We stand behind our work with liability insurance and our word.',
  },
  {
    title: 'Attention to Detail',
    description: 'Small details make the difference between an ordinary cleaning and an extraordinary experience. Every corner matters.',
  },
];

export default function AboutSection() {
  return (
    // Preserve the original #promise destination for existing links and bookmarks.
    <section id="promise" className={styles.aboutSection} aria-labelledby="about-title">
      <div className={styles.container}>
        <div id="about" className={styles.aboutIntro}>
          <div className={styles.story}>
            <p className={styles.eyebrow}>About Karly&apos;s Cleaning</p>
            <h2 id="about-title" className={styles.title}>Who We Are</h2>
            <p className={styles.lead}>A local team. A cleaner home. Peace of mind.</p>
            <p>
              Karly&apos;s Cleaning Services LLC is a local residential cleaning company
              proudly serving families in West Chester, PA, and neighboring communities
              throughout Chester County. Founded on the belief that a clean home brings
              well-being and peace of mind, we work every day to make your space more
              comfortable, hygienic, and welcoming.
            </p>
            <p>
              More than cleaning homes, we build lasting relationships based on trust
              and results. Many of our clients have trusted us with their homes week
              after week for months, and that means everything to us.
            </p>
          </div>

          <aside className={styles.trustPanel} aria-labelledby="trust-title">
            <ShieldCheck className={styles.trustIcon} size={36} aria-hidden="true" />
            <h3 id="trust-title">Confidence in every visit</h3>
            <p>
              We understand that inviting someone into your home takes trust. Each of
              our cleaning professionals is carefully selected and committed to
              punctuality, respect, and excellence in every service.
            </p>
            <div className={styles.insurance}>
              <span>Liability insured</span>
              <strong>Coverage through The Hartford</strong>
              <p>For your peace of mind, every time we care for your home.</p>
            </div>
          </aside>
        </div>

        <div className={styles.purposeGrid}>
          <section id="mission" className={styles.purposeCard} aria-labelledby="mission-title">
            <p className={styles.eyebrow}>The care we bring</p>
            <h3 id="mission-title">Our Mission</h3>
            <p className={styles.statement}>
              To provide high-quality, reliable, and affordable residential cleaning
              services that exceed our clients&apos; expectations and give them the
              peace of mind of living in a clean, organized, and healthy space.
            </p>
            <p>
              Our mission goes beyond cleaning: we treat every home with the same
              care and dedication we would give our own. We use products and
              techniques suited to each surface, delivering visible results from
              the very first visit.
            </p>
            <p>
              We believe dependable cleaning gives you more time to focus on what
              matters most: your family, your work, and your well-being.
            </p>
          </section>

          <section id="vision" className={styles.purposeCard} aria-labelledby="vision-title">
            <p className={styles.eyebrow}>The future we see</p>
            <h3 id="vision-title">Our Vision</h3>
            <p className={styles.statement}>
              To be the most trusted and recommended residential cleaning company in
              Chester County, known for our quality, punctuality, and the positive
              impact we make on the families and communities we serve.
            </p>
            <p>
              We aspire to grow alongside our community, welcoming dedicated
              professionals to our team and extending our service to more homes
              across the greater Philadelphia area.
            </p>
            <p>
              We want the Karly&apos;s Cleaning Services name to stand for spotless
              cleaning, friendly service, and results that speak for themselves.
            </p>
          </section>
        </div>

        <section id="values" className={styles.valuesSection} aria-labelledby="values-title">
          <div className={styles.valuesHeading}>
            <p className={styles.eyebrow}>What guides every visit</p>
            <h3 id="values-title">Our Values</h3>
          </div>
          <ul className={styles.valuesGrid}>
            {values.map((value, index) => (
              <li key={value.title} className={styles.value}>
                <span className={styles.valueNumber} aria-hidden="true">0{index + 1}</span>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.ctaContainer}>
          <p>A home cared for. More time for you.</p>
          <a href="#contact" className={styles.ctaButton}>Get a Free Quote</a>
        </div>
      </div>
    </section>
  );
}
