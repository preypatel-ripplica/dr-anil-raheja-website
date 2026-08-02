"use client";

import { useState } from "react";
import { clinics, contact, type Clinic } from "@/lib/site";
import { MapPin, Clock, Phone, Check, ArrowRight } from "@/components/Icons";
import Reveal from "@/components/Motion/Reveal";
import styles from "./VisitPlanner.module.css";

/**
 * Plan Your Visit — pick a clinic, see its hours, leave your details.
 * Front-end only; submission handler to be wired by the CMS/backend developer.
 */
export default function VisitPlanner() {
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [sent, setSent] = useState(false);
  const step = sent ? 3 : clinic ? 2 : 1;

  return (
    <section className={`section ${styles.wrap}`}>
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Plan your visit</span>
          <h2>
            Three clinics, <span className="accent">one doctor</span>
          </h2>
          <p>Pick the location that suits you. We&apos;ll take it from there.</p>
        </Reveal>

        <Reveal delay={0.1} className={styles.planner}>
          {/* step rail */}
          <ol className={styles.rail}>
            {["Choose clinic", "Your details", "Confirmed"].map((label, i) => (
              <li
                key={label}
                className={`${styles.railStep} ${step > i ? styles.railDone : ""} ${
                  step === i + 1 ? styles.railActive : ""
                }`}
              >
                <span className={styles.railDot}>{step > i + 1 || sent ? <Check width={13} height={13} /> : i + 1}</span>
                {label}
              </li>
            ))}
          </ol>

          {step === 1 && (
            <div className={styles.pane}>
              <div className={styles.clinicGrid}>
                {clinics.map((c) => (
                  <button key={c.id} type="button" className={styles.clinicCard} onClick={() => setClinic(c)}>
                    <span className={styles.clinicIcon}>
                      <MapPin width={19} height={19} />
                    </span>
                    <strong>{c.name}</strong>
                    <span className={styles.clinicArea}>{c.area}</span>
                    <span className={styles.clinicHours}>
                      <Clock width={13} height={13} /> {c.days} · {c.hours}
                    </span>
                    <span className={styles.clinicGo}>
                      Select <ArrowRight width={14} height={14} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && clinic && (
            <div className={styles.pane}>
              <div className={styles.chosen}>
                <MapPin width={16} height={16} />
                <span>
                  <strong>{clinic.name}</strong>, {clinic.area} · {clinic.days}, {clinic.hours}
                </span>
                <button type="button" onClick={() => setClinic(null)}>
                  Change
                </button>
              </div>
              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <input type="text" name="name" placeholder="Full name" required aria-label="Full name" />
                <input type="tel" name="phone" placeholder="Phone number" required aria-label="Phone number" />
                <button type="submit" className="btn btn--primary">
                  Request visit <ArrowRight width={16} height={16} />
                </button>
              </form>
              <p className={styles.altNote}>
                Prefer to call? <a href={`tel:${contact.phonePrimary}`}>{contact.phoneDisplay}</a>
              </p>
            </div>
          )}

          {step === 3 && clinic && (
            <div className={`${styles.pane} ${styles.confirm}`}>
              <span className={styles.confirmIcon}>
                <Check width={26} height={26} />
              </span>
              <h3>Visit requested</h3>
              <p>
                We&apos;ll call to confirm your slot at <strong>{clinic.name}</strong> ({clinic.area}).
                OPD hours there: {clinic.days}, {clinic.hours}.
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
