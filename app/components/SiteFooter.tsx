import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./SiteChrome.module.css";
export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={"container " + styles.footerGrid}>
        <div>
          <Link
            href="/"
            className={styles.brand}
            aria-label="Karly's Cleaning home"
          >
            <Image
              src="/5 Background Removed.png"
              alt=""
              width={64}
              height={64}
            />
            <span className={styles.brandName}>
              Karly&apos;s<span>Cleaning Services</span>
            </span>
          </Link>
          <p className={styles.footerIntro}>
            A cleaner home.
            <br />
            More time for the things you love.
          </p>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/#services">Our services</Link>
          <Link href="/#work">Our work</Link>
          <Link href="/about">Our story</Link>
          <Link href="/#faq">Common questions</Link>
        </div>
        <div>
          <h2>Get in touch</h2>
          <a href="tel:2678449066">267-844-9066</a>
          <a href="mailto:contact@karlyscleaning.com">
            contact@karlyscleaning.com
          </a>
          <p>
            Mon–Sat · 8 am–6 pm
            <br />
            Sunday · Closed
          </p>
        </div>
        <div>
          <h2>Proudly local</h2>
          <p>
            West Chester &amp; neighboring
            <br />
            Chester County communities.
          </p>
          <Link href="/#contact" className={styles.footerLink}>
            Let&apos;s talk about your home <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
      <div className={"container " + styles.footerBottom}>
        <span>
          {"© " + new Date().getFullYear() + " Karly's Cleaning Services LLC"}
        </span>
        <span>Care in every corner.</span>
      </div>
    </footer>
  );
}
