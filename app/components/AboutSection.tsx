import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import CompanyPurpose from "./CompanyPurpose";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    // Preserve the original #promise destination for existing links and bookmarks.
    <section
      id="promise"
      className={styles.aboutSection}
      aria-labelledby="about-title"
    >
      <div className={styles.container}>
        <div id="about" className={styles.aboutIntro}>
          <div className={styles.story}>
            <p className={styles.eyebrow}>About Karly&apos;s Cleaning</p>
            <h2 id="about-title" className={styles.title}>
              Who We Are
            </h2>
            <p className={styles.lead}>
              A local team. A cleaner home. Peace of mind.
            </p>
            <p>
              Karly&apos;s Cleaning Services LLC is a local residential cleaning
              company proudly serving families in West Chester, PA, and
              neighboring communities throughout Chester County. Founded on the
              belief that a clean home brings well-being and peace of mind, we
              work every day to make your space more comfortable, hygienic, and
              welcoming.
            </p>
            <p>
              More than cleaning homes, we build lasting relationships based on
              trust and results. Many of our clients have trusted us with their
              homes week after week for months, and that means everything to us.
            </p>
          </div>

          <aside className={styles.trustPanel} aria-labelledby="trust-title">
            <ShieldCheck
              className={styles.trustIcon}
              size={36}
              aria-hidden="true"
            />
            <h3 id="trust-title">Confidence in every visit</h3>
            <p>
              We understand that inviting someone into your home takes trust.
              Each of our cleaning professionals is carefully selected and
              committed to punctuality, respect, and excellence in every
              service.
            </p>
            <div className={styles.insurance}>
              <span>Liability insured</span>
              <strong>Coverage through The Hartford</strong>
              <p>For your peace of mind, every time we care for your home.</p>
            </div>
          </aside>
        </div>

        <CompanyPurpose />

        <div className={styles.ctaContainer}>
          <p>A home cared for. More time for you.</p>
          <Link href="/#contact" className={styles.ctaButton}>
            Get a Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
