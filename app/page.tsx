import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
  Heart,
  Check,
  Clock3,
  Phone,
  Plus,
} from "lucide-react";
import WorkGallery from "./components/WorkGallery";
import QuoteForm from "./components/QuoteForm";
import styles from "./page.module.css";

const services = [
  {
    number: "01",
    title: "Everyday living, made lighter.",
    name: "Family home cleaning",
    image: "/gallery/Kitchen.jpeg",
    alt: "A kitchen cleaned by the Karly’s team",
    description:
      "Thoughtful care for the home you live in. Let us take cleaning off your list, so you can get back to yours.",
    detail: "For busy homes and everyday life",
  },
  {
    number: "02",
    title: "A fresh start feels good.",
    name: "Move-in & move-out cleaning",
    image: "/gallery/Bathroom 6.jpeg",
    alt: "Freshly cleaned double vanity and bathroom mirrors",
    description:
      "Moving brings enough to think about. We help prepare your space for a new beginning, or leave it ready for what comes next.",
    detail: "For your next chapter",
  },
  {
    number: "03",
    title: "Enjoy the occasion.",
    name: "Parties & special occasions",
    image: "/gallery/Towels.jpeg",
    alt: "Carefully arranged towels in a client’s bathroom",
    description:
      "A little help before the guests arrive or after the celebration. Spend your energy making memories.",
    detail: "For the moments worth celebrating",
  },
];
const faqs = [
  {
    question: "Which areas do you serve?",
    answer:
      "We are based in West Chester, Pennsylvania, and serve neighboring communities throughout Chester County. Share your location when requesting a quote so we can confirm coverage for your home.",
  },
  {
    question: "What types of cleaning can I request?",
    answer:
      "We offer family home cleaning, move-in and move-out cleaning, and cleaning for parties and special occasions. You can also ask about last-minute availability. Tell us about your space and we will discuss the right service with you.",
  },
  {
    question: "Is your business insured?",
    answer:
      "Yes. Karly’s Cleaning Services LLC carries liability insurance through The Hartford, as described in our company information.",
  },
  {
    question: "How do I arrange my first cleaning?",
    answer:
      "Send us a quote request or call 267-844-9066. We will discuss your home, the service you need, and scheduling. Sending the form requests a quote; it does not automatically book an appointment.",
  },
  {
    question: "When can I reach you?",
    answer:
      "Our listed business hours are Monday through Saturday, 8:00 AM to 6:00 PM. We are closed on Sundays.",
  },
];

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Karly's Cleaning Services LLC",
            url: "https://www.karlyscleaning.com",
            telephone: "+1-267-844-9066",
            email: "contact@karlyscleaning.com",
            image: "https://www.karlyscleaning.com/hero-image.jpg",
            address: {
              "@type": "PostalAddress",
              addressLocality: "West Chester",
              addressRegion: "PA",
              addressCountry: "US",
            },
            areaServed: {
              "@type": "AdministrativeArea",
              name: "Chester County, Pennsylvania",
            },
          }),
        }}
      />
      <section className={styles.hero}>
        <div className={"container " + styles.heroGrid}>
          <div className={styles.heroCopy}>
            <span className="eyebrow">
              <span className={styles.smallLine} /> A little care. A lot of
              peace of mind.
            </span>
            <h1>
              A beautifully
              <br />
              clean home.
              <br />
              <em>More time for you.</em>
            </h1>
            <p>
              Thoughtful residential cleaning for West Chester and neighboring
              communities. We care for your home, so you can enjoy being in it.
            </p>
            <div className={styles.heroActions}>
              <a href="#contact" className="button">
                Get a Free Quote <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a href="#services" className="text-link">
                Explore our services <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <p className={styles.offer}>
              <span>WELCOME HOME</span> Enjoy 20% off your first cleaning.
            </p>
          </div>
          <div className={styles.heroPhoto}>
            <Image
              src="/hero-image.jpg"
              alt="A bright, welcoming home being carefully cleaned"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <div className={styles.photoNote}>
              <ShieldCheck size={24} aria-hidden="true" />
              <span>
                Care you can count on.
                <small>Local service. Liability insured.</small>
              </span>
            </div>
            <span className={styles.photoCaption}>
              A fresh feeling, from the moment you walk in.
            </span>
          </div>
        </div>
      </section>

      <div
        className={"container " + styles.trustStrip}
        aria-label="Our commitments"
      >
        <span>
          <MapPin size={20} aria-hidden="true" />
          <span>
            Rooted in West Chester<small>Your neighbors, here to help</small>
          </span>
        </span>
        <span>
          <ShieldCheck size={20} aria-hidden="true" />
          <span>
            Liability insured<small>Coverage through The Hartford</small>
          </span>
        </span>
        <span>
          <Heart size={20} aria-hidden="true" />
          <span>
            Care in every corner<small>Your home, treated with respect</small>
          </span>
        </span>
      </div>

      <section id="services" className={styles.services}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <span className="eyebrow">A clean for every chapter</span>
              <h2 className="section-title">
                Your home. Your rhythm.
                <br />
                Our thoughtful care.
              </h2>
            </div>
            <p>
              From everyday routines to fresh starts,
              <br />a helping hand that fits your life.
            </p>
          </div>
          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <article key={service.number} className={styles.serviceCard}>
                <div className={styles.serviceImage}>
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                  <span>{service.number}</span>
                </div>
                <div className={styles.serviceText}>
                  <span className={styles.serviceName}>{service.name}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className={styles.serviceDetail}>
                    <Check size={14} aria-hidden="true" />
                    {service.detail}
                  </span>
                  <a href="#contact" className="text-link">
                    Ask about this service{" "}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.lastMinute}>
            <span>
              <Clock3 size={19} aria-hidden="true" />
              <span>
                A change of plans?{" "}
                <strong>Ask about last-minute cleaning.</strong>
              </span>
            </span>
            <a href="tel:2678449066" className="text-link">
              Let&apos;s talk <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="work" className={styles.work}>
        <div className="container">
          <div id="gallery" className={styles.sectionHead}>
            <div>
              <span className="eyebrow">Real homes. Real care.</span>
              <h2 className="section-title">
                The difference is
                <br />
                in the details.
              </h2>
            </div>
            <p>
              A closer look at our work.
              <br />
              Photographs from our cleaning projects.
            </p>
          </div>
          <WorkGallery />
        </div>
      </section>

      <section className={styles.process}>
        <div className="container">
          <div className={styles.processIntro}>
            <span className="eyebrow">Simple from the start</span>
            <h2 className="section-title">
              A cleaner home,
              <br />
              without the complication.
            </h2>
          </div>
          <ol className={styles.steps}>
            <li>
              <span>01</span>
              <h3>Tell us about your home</h3>
              <p>
                Share your space, the service you need, and what matters most to
                you.
              </p>
            </li>
            <li>
              <span>02</span>
              <h3>Let&apos;s make a plan</h3>
              <p>
                We discuss your quote and find a time that works for your
                schedule.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Come home to clean</h3>
              <p>
                Our team brings care and attention, leaving you more time for
                yourself.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section id="promise" className={styles.story}>
        <div id="about" className={"container " + styles.storyGrid}>
          <div className={styles.storyImage}>
            <Image
              src="/gallery/Window cleaning 2.jpeg"
              alt="A member of the cleaning team carefully cleaning a window"
              fill
              sizes="(max-width: 760px) 100vw, 45vw"
            />
            <span>From our team, with care.</span>
          </div>
          <div className={styles.storyCopy}>
            <span className="eyebrow">Meet Karly&apos;s Cleaning</span>
            <h2 className="section-title">
              More than a clean home.
              <br />
              <em>A relationship built on trust.</em>
            </h2>
            <p>
              We are a local residential cleaning company, proudly serving
              families in West Chester and Chester County. We believe a clean
              home brings comfort, well-being, and a little more room to
              breathe.
            </p>
            <p>
              Inviting someone into your home is personal. We honor that trust
              with carefully selected professionals, respectful service, and
              attention to the little things.
            </p>
            <Link href="/about" className="text-link">
              Get to know us <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.reviews} aria-labelledby="reviews-title">
        <div className="container">
          <span className="eyebrow">Kind words, cared-for homes</span>
          <h2 id="reviews-title" className="section-title">
            It&apos;s the feeling that stays.
          </h2>
          <div className={styles.reviewGrid}>
            <figure className={styles.featuredReview}>
              <span className={styles.quoteMark} aria-hidden="true">
                “
              </span>
              <blockquote>
                Coming home to a sparkling clean house after a long week is the
                best feeling.
              </blockquote>
              <figcaption>
                Sarah M. <span>West Chester, PA</span>
              </figcaption>
            </figure>
            <div className={styles.otherReviews}>
              <figure>
                <blockquote>
                  “We hired them for a move-out cleaning, and they exceeded our
                  expectations. The bathrooms and kitchen looked brand new.”
                </blockquote>
                <figcaption>
                  John D. <span>Exton, PA</span>
                </figcaption>
              </figure>
              <figure>
                <blockquote>
                  “With two dogs at home, keeping up with the pet hair is
                  exhausting, but they leave my floors completely spotless every
                  single time.”
                </blockquote>
                <figcaption>
                  Linda R. <span>Downingtown, PA</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className={styles.faq}>
        <div className={"container " + styles.faqGrid}>
          <div>
            <span className="eyebrow">A few things you may be wondering</span>
            <h2 className="section-title">
              Good questions.
              <br />
              Clear answers.
            </h2>
            <p>
              Still have something on your mind?
              <br />
              We&apos;re happy to talk it through.
            </p>
            <a href="tel:2678449066" className="text-link">
              <Phone size={15} aria-hidden="true" />
              267-844-9066
            </a>
          </div>
          <div className={styles.questions}>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <Plus size={18} aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={styles.contact}>
        <div className={"container " + styles.contactGrid}>
          <div className={styles.contactCopy}>
            <span className="eyebrow">Let us take it from here</span>
            <h2 className="section-title">
              A little less on your list.
              <br />
              <em>A little more life.</em>
            </h2>
            <p>
              Tell us about your home and the help you&apos;re looking for.
              We&apos;ll get in touch to talk through your cleaning needs.
            </p>
            <a href="tel:2678449066" className={styles.contactPhone}>
              267-844-9066 <ArrowUpRight size={22} aria-hidden="true" />
            </a>
            <div className={styles.contactDetails}>
              <span>WEST CHESTER &amp; CHESTER COUNTY</span>
              <p>
                Monday–Saturday · 8 am–6 pm
                <br />
                Sunday · Closed
              </p>
            </div>
            <p className={styles.contactOffer}>
              Your first clean comes with a little extra welcome.
              <br />
              <strong>Enjoy 20% off your first cleaning.</strong>
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>
    </main>
  );
}
