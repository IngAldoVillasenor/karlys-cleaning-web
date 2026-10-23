"use client";
import BrandLogo from "./BrandLogo";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight, MapPin, Menu, Phone, X } from "lucide-react";
import styles from "./SiteChrome.module.css";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className={styles.topbar}>
        <div className={"container " + styles.topbarInner}>
          <span>
            <MapPin size={12} aria-hidden="true" />
            <span>West Chester, PA &amp; neighboring communities</span>
          </span>
          <a href="tel:2678449066">
            <Phone size={12} aria-hidden="true" /><span>267-844-9066</span>
          </a>
        </div>
      </div>
      <header
        className={styles.header}
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            setOpen(false);
            trigger.current?.focus();
          }
        }}
      >
        <div className={"container " + styles.headerInner}>
          <Link
            href="/"
            className={styles.brand}
            aria-label="Karly's Cleaning home"
            onClick={() => setOpen(false)}
          >
            <BrandLogo className={styles.headerLogo} priority decorative sizes="(max-width: 900px) 100px, 170px" />
            <span className={styles.brandDescriptor}>
              <span>Care in every corner.</span>
              <small>West Chester, Pennsylvania</small>
            </span>
          </Link>
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <Link href="/#services">Services</Link>
            <Link href="/#work">Our work</Link>
            <Link href="/about">About us</Link>
            <Link href="/#faq">FAQs</Link>
          </nav>
          <Link href="/#contact" className={"button " + styles.headerCta}>
            <span>Get a Free Quote</span><ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <button
            ref={trigger}
            className={styles.menuButton}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className={styles.mobileNav}
          hidden={!open}
        >
          <Link href="/#services" onClick={() => setOpen(false)}>
            Services
          </Link>
          <Link href="/#work" onClick={() => setOpen(false)}>
            Our work
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About us
          </Link>
          <Link href="/#faq" onClick={() => setOpen(false)}>
            FAQs
          </Link>
          <Link
            href="/#contact"
            className="button"
            onClick={() => setOpen(false)}
          >
            <span>Get a Free Quote</span><ArrowUpRight size={16} />
          </Link>
        </nav>
      </header>
    </>
  );
}
