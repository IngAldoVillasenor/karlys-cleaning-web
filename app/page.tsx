"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';
import { sendEmailForm } from './actions/sendEmail';
import styles from './page.module.css';

export default function LandingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'captchaError'>('idle');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  
  // Nuevo estado para guardar los errores de los campos (Zod)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  async function handleSubmit(formData: FormData) {
    // Reseteamos errores previos
    setFieldErrors({});
    
    if (!captchaToken) {
      setSubmitStatus('captchaError');
      return;
    }

    setIsSubmitting(true);
    formData.append('recaptchaToken', captchaToken);
    
    const response = await sendEmailForm(formData);
    
    if (response.success) {
      setSubmitStatus('success');
      if (recaptchaRef.current) recaptchaRef.current.reset();
      setCaptchaToken(null);
    } else {
      setSubmitStatus('error');
      // Si Zod devolvió errores específicos de los campos, los guardamos en el estado
      if (response.errors) {
        setFieldErrors(response.errors);
      }
    }
    
    setIsSubmitting(false);
  }
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
          <form action={handleSubmit}>
            {submitStatus === 'success' && (
              <div style={{ padding: '1rem', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '8px', marginBottom: '1rem' }}>
                Thank you! Your request has been sent. We will get in touch with you shortly.
              </div>
            )}

            {submitStatus === 'error' && (
              <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '1rem' }}>
                There was a problem sending your request. Please try again.
              </div>
            )}

            {submitStatus === 'captchaError' && (
              <div style={{ padding: '1rem', backgroundColor: '#fef08a', color: '#854d0e', borderRadius: '8px', marginBottom: '1rem' }}>
                Please verify that you are not a robot.
              </div>
            )}

            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input type="text" name="name" placeholder="John Doe" required disabled={isSubmitting} />
              {fieldErrors.name && <p style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>{fieldErrors.name[0]}</p>}
            </div>
            
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input type="tel" name="phone" placeholder="267-844-9066" required disabled={isSubmitting} />
              {fieldErrors.phone && <p style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>{fieldErrors.phone[0]}</p>}
            </div>
            
            <div className={styles.formGroup}>
              <label>Type of Service</label>
              <select name="service" required disabled={isSubmitting}>
                <option value="">Select a service...</option>
                <option value="family-home">Family Home Cleaning</option>
                <option value="move-in-out">Move-in / Move-out</option>
                <option value="last-minute">Last Minute Cleaning</option>
                <option value="special-occasion">Party / Special Occasion</option>
              </select>
              {fieldErrors.service && <p style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>{fieldErrors.service[0]}</p>}
            </div>

            <div className={styles.formGroup}>
              <label>Message / Details</label>
              <textarea name="message" rows={4} placeholder="Tell us about your home..." required disabled={isSubmitting}></textarea>
              {fieldErrors.message && <p style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>{fieldErrors.message[0]}</p>}
            </div>

            {/* COMPONENTE RECAPTCHA */}
            <div style={{ marginBottom: '1.5rem' }}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Request Information'}
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