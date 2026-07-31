"use client";

import { useState } from "react";
import { contact, treatments, clinics } from "@/lib/site";
import { Phone, Check, Clock } from "@/components/Icons";
import Reveal from "@/components/Motion/Reveal";
import styles from "./BookCta.module.css";

/**
 * "Book Appointment" band shown across the site (the live site ends every
 * page with one). Front-end only, the integrator wires onSubmit later.
 */
export default function BookCta({ defaultTreatment }: { defaultTreatment?: string }) {
  const [sent, setSent] = useState(false);

  return (
    <section id="appointment" className={`section ${styles.wrap}`}>
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.info}>
          <span className={styles.eyebrow}>Appointment</span>
          <h2 className={styles.title}>Book an appointment</h2>
          <p className={styles.lead}>
            Send your details and our team will contact you to confirm your
            appointment date and time.
          </p>
          <ul className={styles.points}>
            <li>
              <Check width={17} height={17} /> 30+ years of surgical experience
            </li>
            <li>
              <Check width={17} height={17} /> 15,000+ successful surgeries
            </li>
            <li>
              <Check width={17} height={17} /> Insurance &amp; cashless supported
            </li>
          </ul>
          <div className={styles.help}>
            <span className={styles.helpIcon}>
              <Phone width={19} height={19} />
            </span>
            <div>
              <small>Helpline number</small>
              <a href={`tel:${contact.phonePrimary}`}>{contact.phoneDisplay}</a>
            </div>
          </div>
          <div className={styles.hours}>
            <Clock width={15} height={15} />
            <span>
              {clinics[0].name}: {clinics[0].days}, {clinics[0].hours}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.12} className={styles.card}>
          {sent ? (
            <div className={styles.success}>
              <span className={styles.successIcon}>
                <Check width={30} height={30} />
              </span>
              <h3>Request received</h3>
              <p>Our team will call you shortly to confirm your appointment.</p>
            </div>
          ) : (
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <h3 className={styles.formTitle}>Get appointment</h3>
              <div className={styles.field}>
                <label htmlFor="bk-name">Full name</label>
                <input id="bk-name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div className={styles.two}>
                <div className={styles.field}>
                  <label htmlFor="bk-phone">Phone</label>
                  <input id="bk-phone" name="phone" type="tel" placeholder="Phone number" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="bk-email">Email</label>
                  <input id="bk-email" name="email" type="email" placeholder="Email (optional)" />
                </div>
              </div>
              <div className={styles.two}>
                <div className={styles.field}>
                  <label htmlFor="bk-treatment">Concern</label>
                  <select id="bk-treatment" name="treatment" defaultValue={defaultTreatment ?? ""}>
                    <option value="" disabled>
                      Select a concern
                    </option>
                    {treatments.map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.title}
                      </option>
                    ))}
                    <option value="general">General consultation</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="bk-clinic">Preferred clinic</label>
                  <select id="bk-clinic" name="clinic" defaultValue="">
                    <option value="" disabled>
                      Select clinic
                    </option>
                    {clinics.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}, {c.area}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn--primary" style={{ width: "100%" }}>
                Get Appointment
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
