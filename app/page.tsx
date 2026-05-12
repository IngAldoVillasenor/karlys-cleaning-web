"use client";

import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function LandingPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.logo}>
          {/* Asegúrate de tener public/logo.png */}
          <Image 
            src="/logo.png" 
            alt="Karly's Cleaning Services Logo" 
            width={200} 
            height={60} 
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <div style={{ fontWeight: 600, color: '#1e40af' }}>
          Call us: 267-844-9066
        </div>
      </header>

      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          
          <div className={styles.heroText}>
            <div className={styles.promoBadge}>
              20% OFF YOUR FIRST CLEANING
            </div>
            <h1 className={styles.heroTitle}>Let us take cleaning off your to-do list.</h1>
            <p className={styles.heroSubtitle}>
              Karly's Cleaning Services LLC is proud to serve local families with dependable & detailed cleaning. Enjoy a sparkling home without the stress!
            </p>
          </div>

          <div className={styles.heroImageWrapper}>
            {/* Asegúrate de tener public/hero-image.jpg */}
            <Image 
              src="/hero-image.jpg" 
              alt="Sparkling clean home interior" 
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Our Guarantees</h3>
            <ul>
              <li>Trusted Local Service</li>
              <li>Satisfaction Guaranteed</li>
              <li>Fully Insured</li>
              <li>Always the same cleaning team</li>
              <li>Long term references available on request</li>
            </ul>
          </div>
          <div className={styles.card}>
            <h3>What We Offer</h3>
            <ul>
              <li>Flexible Scheduling</li>
              <li>Affordable Rates</li>
              <li>Specializing in move-ins, move-outs and family homes</li>
              <li>Last Minute Cleanings</li>
              <li>Parties & Special Occasions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONTACT & FORM SECTION */}
      <section className={styles.contactSection}>
        <div className={styles.contactInfo}>
          <h2>Get a Free Quote</h2>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
            Ready for a spotless home? Fill out the form or contact us directly.
          </p>
          
          <div className={styles.infoItem}>
            <strong>Owner</strong>
            Karla Garcia
          </div>
          <div className={styles.infoItem}>
            <strong>Phone</strong>
            267-844-9066
          </div>
          <div className={styles.infoItem}>
            <strong>Email</strong>
            gkaty662@gmail.com
          </div>
          <div className={styles.infoItem}>
            <strong>Location</strong>
            West Chester, PA.
          </div>
        </div>

        <div className={styles.formBox}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required />
            </div>
            
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input type="tel" placeholder="267-000-0000" required />
            </div>
            
            <div className={styles.formGroup}>
              <label>Type of Service</label>
              <select required>
                <option value="">Select a service...</option>
                <option value="family-home">Family Home Cleaning</option>
                <option value="move-in-out">Move-in / Move-out</option>
                <option value="last-minute">Last Minute Cleaning</option>
                <option value="special-occasion">Party / Special Occasion</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Message / Details</label>
              <textarea rows={4} placeholder="Tell us about your home..." required></textarea>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Request Information
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <h3>Karly's Cleaning Services LLC</h3>
        <p style={{ marginBottom: '1rem' }}>West Chester, PA. | Fully Insured</p>
        <p style={{ fontSize: '0.875rem' }}>© {new Date().getFullYear()} Owner: Karla Garcia. All rights reserved.</p>
      </footer>
    </div>
  );
}