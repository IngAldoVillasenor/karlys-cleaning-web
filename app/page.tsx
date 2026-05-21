"use client";

import { useState, useRef, useEffect } from 'react';
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

  // Estado para controlar qué imagen se muestra en pantalla completa
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Estado para el menú de hamburguesa en móviles
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  // 2. Nuevo estado para almacenar los nombres de las imágenes de la galería
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  // 3. Efecto para consultar la API interna al cargar la página
  useEffect(() => {
    async function loadGallery() {
      try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        if (Array.isArray(data)) {
          setGalleryImages(data);
        }
      } catch (error) {
        console.error("Error loading gallery:", error);
      }
    }
    loadGallery();
  }, []);
  return (
    <div className={styles.pageWrapper}>
      {/* --- TOP BAR (Info Rápida) --- */}
      <div className={styles.topBar}>
        <div className={styles.topBarContent}>
          <div className={styles.topBarItem}>
            <span>📍</span> West Chester, PA & Surrounding Areas
          </div>
          <div className={styles.topBarItem}>
            <span>📞</span> <a href="tel:2678449066">267-844-9066</a>
          </div>
        </div>
      </div>

      {/* --- MAIN HEADER --- */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image 
            src="/logo.png" 
            alt="Karly's Cleaning Services Logo" 
            width={320}  
            height={120} 
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        
        {/* Navegación para Escritorio */}
        <nav className={styles.desktopNav}>
          <a href="#services" className={styles.navLink}>Services</a>
          <a href="#promise" className={styles.navLink}>About Us</a>
          <a href="#gallery" className={styles.navLink}>Gallery</a>
        </nav>

        {/* Botón CTA para Escritorio */}
        <div className={styles.desktopCta}>
          <a href="#contact" className={styles.submitBtn} style={{ padding: '0.6rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>
            Get a Quote
          </a>
        </div>

        {/* Botón de Hamburguesa para Móviles */}
        <button 
          className={styles.hamburgerBtn} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Menú Desplegable Móvil */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <a href="#services" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#promise" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>About Us</a>
            <a href="#gallery" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Gallery</a>
            
            {/* Contenedor del botón ajustado */}
            <div style={{ marginTop: '1rem', width: '100%', boxSizing: 'border-box' }}>
              <a href="#contact" className={styles.submitBtn} onClick={() => setIsMenuOpen(false)}>
                Get a Quote
              </a>
            </div>
          </div>
        )}
      </header>

      {/* JSON-LD Schema Markup para Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Karly's Cleaning Services", // [cite: 10]
            "image": "https://karlys-cleaning-web.vercel.app/hero-image.jpg",
            "telephone": "267-844-9066", // 
            "email": "contact@karlyscleaning.com", // [cite: 9]
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "West Chester", // 
              "addressRegion": "PA", // 
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 39.9607, // Coordenadas aproximadas de West Chester
              "longitude": -75.6055
            },
            "url": "https://karlys-cleaning-web.vercel.app",
            "priceRange": "$$",
            "founder": "Karla Garcia" // [cite: 5]
          })
        }}
      />

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
      <section id="services" className={styles.featuresSection}>
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
        <div className={styles.ctaContainer}>
          <a href="#contact" className={styles.ctaButton}>Book Your Cleaning Today</a>
        </div>
      </section>

      {/* THE KARLY'S PROMISE SECTION (Inspired by competitors) */}
      <section id="promise" className={styles.promiseSection}>
        <h2 className={styles.sectionTitle}>More Than Just a Cleaning Service</h2>
        <div className={styles.promiseGrid}>
          
          <div className={styles.promiseCard}>
            <div className={styles.promiseIcon}>✓</div>
            <h3>Vetted & Trusted Professionals</h3>
            <p>Your security is our priority. Every member of our team is carefully background-checked, fully insured, and highly trained to treat your home with the utmost respect.</p>
          </div>

          <div className={styles.promiseCard}>
            <div className={styles.promiseIcon}>❤</div>
            <h3>Community First</h3>
            <p>We are a proud local business in West Chester, PA. We believe in giving back and supporting our community by providing a clean, healthy, and stress-free environment for local families.</p>
          </div>

          <div className={styles.promiseCard}>
            <div className={styles.promiseIcon}>★</div>
            <h3>Worry-Free Guarantee</h3>
            <p>We hold our standards high. If you are not completely satisfied with our service, let us know within 24 hours, and we will return to make it right at no extra cost.</p>
          </div>

        </div>
        <div className={styles.ctaContainer}>
          <a href="#contact" className={styles.ctaButton}>Experience the Difference</a>
        </div>
      </section>

      <section id="gallery" className={styles.gallerySection}>
        <h2 className={styles.sectionTitle}>Our Work Gallery</h2>
        <p style={{ textAlign: 'center', marginBottom: '3rem', color: '#475569', fontSize: '1.1rem' }}>
          Take a look at some of our recent professional cleaning projects in West Chester, PA.
        </p>

        <div className={styles.galleryCarousel}>
          {galleryImages.map((imageName, index) => (
            <div 
              key={index} 
              className={styles.galleryCarouselItem}
              onClick={() => setSelectedImage(imageName)} // Al hacer clic, abrimos el Lightbox
            >
              <div style={{ position: 'relative', width: '100%', height: '280px' }}>
                <Image 
                  src={`/gallery/${imageName}`} 
                  alt={`Karly's Cleaning service work ${index + 1}`} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje amigable si la carpeta está vacía */}
        {galleryImages.length === 0 && (
          <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '2rem' }}>
            No images added to the gallery yet.
          </p>
        )}
      </section>

      {/* LIGHTBOX / MODAL OVERLAY */}
      {selectedImage && (
        <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
          <span className={styles.lightboxClose} onClick={() => setSelectedImage(null)}>
            &times;
          </span>
          <div 
            className={styles.lightboxContent} 
            onClick={(e) => e.stopPropagation()} // Evita que se cierre si tocas la imagen misma
          >
            <Image 
              src={`/gallery/${selectedImage}`} 
              alt="Enlarged cleaning work"
              fill
              style={{ objectFit: 'contain' }} // Contain asegura que la imagen no se recorte
              quality={100}
            />
          </div>
        </div>
      )}

      {/* CONTACT & FORM SECTION */}
      <section id="contact" className={styles.contactSection}>
        <div className={styles.contactInfo}>
          
          {/* NUEVO: Logo integrado en los datos de contacto */}
          <div className={styles.contactLogoWrapper}>
            <Image 
              src="/logo.png" 
              alt="Karly's Cleaning Services" 
              width={260} 
              height={100} 
              style={{ objectFit: 'contain' }}
            />
          </div>

          <h2>Contact Us Today</h2>
          
          <div className={styles.infoItem}>
            <strong>📍 Service Area</strong>
            West Chester, PA & Surrounding Areas
          </div>
          <div className={styles.infoItem}>
            <strong>📞 Phone Number</strong>
            <a href="tel:2678449066" style={{ color: 'inherit', fontWeight: 'bold' }}>267-844-9066</a>
          </div>
          <div className={styles.infoItem}>
            <strong>⏰ Hours of Operation</strong>
            Monday - Saturday: 8:00 AM - 6:00 PM <br />
            Sunday: Closed
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
        
        {/* NUEVO: Logo integrado en el pie de página */}
        <div className={styles.footerLogoWrapper}>
          <Image 
            src="/logo.png" 
            alt="Karly's Cleaning Services Logo Footer" 
            width={180} 
            height={70} 
            style={{ objectFit: 'contain' }}
          />
        </div>

        <p style={{ marginTop: '1rem', fontWeight: 600 }}>
          ©️ {new Date().getFullYear()} Karly's Cleaning Services LLC. All rights reserved.
        </p>
      </footer>
    </div>
  );
}