"use client";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { sendEmailForm } from "../actions/sendEmail";
import styles from "./QuoteForm.module.css";

export default function QuoteForm() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "captcha"
  >("idle");
  const [token, setToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const captcha = useRef<ReCAPTCHA>(null);
  const form = useRef<HTMLFormElement>(null);
  const feedback = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  async function submit(data: FormData) {
    setErrors({});
    if (!token) {
      setStatus("captcha");
      requestAnimationFrame(() => feedback.current?.focus());
      return;
    }
    setBusy(true);
    setStatus("idle");
    data.set("recaptchaToken", token);
    try {
      const result = await sendEmailForm(data);
      setStatus(result.success ? "success" : "error");
      if (result.success) form.current?.reset();
      if (!result.success && result.errors) setErrors(result.errors);
    } catch {
      setStatus("error");
    } finally {
      setBusy(false);
      captcha.current?.reset();
      setToken(null);
      requestAnimationFrame(() => feedback.current?.focus());
    }
  }
  return (
    <form
      ref={form}
      onSubmit={(event) => {
        event.preventDefault();
        void submit(new FormData(event.currentTarget));
      }}
      className={styles.form}
      aria-label="Request a cleaning quote"
      aria-busy={busy}
    >
      <span className="eyebrow">Your home, our care</span>
      <h3>Let&apos;s start with a free quote.</h3>
      <p className={styles.intro}>
        A few details are all we need to get the conversation started.
      </p>
      <div
        ref={feedback}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={status !== "idle" ? styles.feedback : undefined}
      >
        {status === "success" &&
          "Thank you! Your request has been sent. We will get in touch to discuss your cleaning."}
        {status === "error" &&
          "We could not send your request. Check your details and try again, or call 267-844-9066."}
        {status === "captcha" &&
          "Please complete the verification before sending your request."}
      </div>
      <div className={styles.fieldsRow}>
        <div className={styles.field}>
          <label htmlFor="quote-name">Your name</label>
          <input
            id="quote-name"
            name="name"
            autoComplete="name"
            placeholder="Full name"
            minLength={2}
            maxLength={60}
            required
            disabled={busy}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className={styles.error}>
              {errors.name[0]}
            </p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="quote-phone">Phone number</label>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 123-4567"
            required
            disabled={busy}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className={styles.error}>
              {errors.phone[0]}
            </p>
          )}
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="quote-service">How can we help?</label>
        <select
          id="quote-service"
          name="service"
          required
          disabled={busy}
          defaultValue=""
          aria-invalid={!!errors.service}
          aria-describedby={errors.service ? "service-error" : undefined}
        >
          <option value="" disabled>
            Select a cleaning service
          </option>
          <option value="family-home">Family home cleaning</option>
          <option value="move-in-out">Move-in / move-out cleaning</option>
          <option value="special-occasion">Party / special occasion</option>
          <option value="last-minute">Last-minute cleaning</option>
        </select>
        {errors.service && (
          <p id="service-error" className={styles.error}>
            {errors.service[0]}
          </p>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="quote-message">A little about your home</label>
        <textarea
          id="quote-message"
          name="message"
          placeholder="Your location, the size of your home, and anything you would like us to know…"
          rows={3}
          minLength={10}
          maxLength={1000}
          required
          disabled={busy}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className={styles.error}>
            {errors.message[0]}
          </p>
        )}
      </div>
      {siteKey ? (
        <div className={styles.verification}>
          <ReCAPTCHA
            ref={captcha}
            sitekey={siteKey}
            size="compact"
            onChange={setToken}
            onExpired={() => setToken(null)}
            onErrored={() => {
              setToken(null);
              setStatus("captcha");
            }}
          />
          <span>
            A quick verification
            <br />
            before we connect.
          </span>
        </div>
      ) : (
        <p className={styles.unavailable}>
          Online requests are temporarily unavailable. Please call{" "}
          <a href="tel:2678449066">267-844-9066</a> for your quote.
        </p>
      )}
      <button type="submit" className="button" disabled={busy || !siteKey}>
        {busy ? "Sending your request…" : "Request My Free Quote"}
        <ArrowUpRight size={17} aria-hidden="true" />
      </button>
      <p className={styles.privacy}>
        <LockKeyhole size={12} aria-hidden="true" /> A quote request, with no
        appointment booked automatically.
      </p>
    </form>
  );
}
