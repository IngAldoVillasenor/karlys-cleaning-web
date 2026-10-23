import styles from "./CompanyPurpose.module.css";

// English adaptation of Karly_Cleaning_Quienes_Somos.pdf supplied by the business.
const values = [
  {
    title: "Trust",
    description:
      "We build strong relationships with our clients through honesty, respect, and transparency in every interaction.",
  },
  {
    title: "Excellence",
    description:
      "We strive to exceed expectations with every service, paying close attention to detail and never settling for anything less than our best.",
  },
  {
    title: "Community",
    description:
      "We are part of West Chester and take pride in serving our neighbors. As our community grows, we grow with it.",
  },
  {
    title: "Responsibility",
    description:
      "We keep our commitments. If something does not meet your expectations, we make it right. We stand behind our work with liability insurance and our word.",
  },
  {
    title: "Attention to Detail",
    description:
      "Small details make the difference between an ordinary cleaning and an extraordinary experience. Every corner matters.",
  },
];

export default function CompanyPurpose() {
  return (
    <div className={styles.companyPurpose}>
      <div className={styles.purposeGrid}>
        <section
          id="mission"
          className={styles.purposeCard}
          aria-labelledby="mission-title"
        >
          <p className={styles.eyebrow}>The care we bring</p>
          <h3 id="mission-title">Our Mission</h3>
          <p className={styles.statement}>
            To provide high-quality, reliable, and affordable residential
            cleaning services that exceed our clients&apos; expectations and
            give them the peace of mind of living in a clean, organized, and
            healthy space.
          </p>
          <p>
            Our mission goes beyond cleaning: we treat every home with the
            same care and dedication we would give our own. We use products
            and techniques suited to each surface, delivering visible results
            from the very first visit.
          </p>
          <p>
            We believe dependable cleaning gives you more time to focus on
            what matters most: your family, your work, and your well-being.
          </p>
        </section>

        <section
          id="vision"
          className={styles.purposeCard}
          aria-labelledby="vision-title"
        >
          <p className={styles.eyebrow}>The future we see</p>
          <h3 id="vision-title">Our Vision</h3>
          <p className={styles.statement}>
            To be the most trusted and recommended residential cleaning
            company in Chester County, known for our quality, punctuality, and
            the positive impact we make on the families and communities we
            serve.
          </p>
          <p>
            We aspire to grow alongside our community, welcoming dedicated
            professionals to our team and extending our service to more homes
            across the greater Philadelphia area.
          </p>
          <p>
            We want the Karly&apos;s Cleaning Services name to stand for
            spotless cleaning, friendly service, and results that speak for
            themselves.
          </p>
        </section>
      </div>

      <section
        id="values"
        className={styles.valuesSection}
        aria-labelledby="values-title"
      >
        <div className={styles.valuesHeading}>
          <p className={styles.eyebrow}>What guides every visit</p>
          <h3 id="values-title">Our Values</h3>
        </div>
        <ul className={styles.valuesGrid}>
          {values.map((value, index) => (
            <li key={value.title} className={styles.value}>
              <span className={styles.valueNumber} aria-hidden="true">
                0{index + 1}
              </span>
              <h4>{value.title}</h4>
              <p>{value.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
