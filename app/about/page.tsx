import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AboutSection from "../components/AboutSection";
import styles from "./page.module.css";
export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Meet the local team behind Karly’s Cleaning Services. Our story, mission, vision, and the values that guide our care for West Chester homes.",
  alternates: { canonical: "/about" },
  openGraph: { title: "Our Story | Karly's Cleaning", url: "/about" },
};
export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className={"container " + styles.hero}>
        <div>
          <span className="eyebrow">Our story · West Chester, PA</span>
          <h1>
            Good people.
            <br />
            <em>Thoughtful care.</em>
          </h1>
          <p>
            Behind every clean home is a team that cares. Get to know the
            people, purpose, and principles behind Karly&apos;s Cleaning.
          </p>
          <Link href="/#contact" className="button">
            Get a Free Quote <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.photo}>
          <Image
            src="/gallery/Window cleaning 3.jpeg"
            alt="Our cleaning team caring for a client's windows"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 45vw"
          />
        </div>
      </div>
      <AboutSection />
    </main>
  );
}
