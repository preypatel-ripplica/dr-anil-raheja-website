import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero/PageHero";
import BookCta from "@/components/BookCta/BookCta";
import Reveal from "@/components/Motion/Reveal";
import CountUp from "@/components/Motion/CountUp";
import { stats, contact } from "@/lib/site";
import { Check, Phone, Star } from "@/components/Icons";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Dr. Anil Raheja",
  description:
    "Dr. Anil Raheja — MS (Ortho), M.Ch (Ortho). Director Orthopedics at Apollo Spectra Hospital Karol Bagh & Jeewan Mala Hospital with 28 years of experience and 12,000+ surgeries.",
};

const expertise = [
  "Minimal invasive single-incision total hip replacement",
  "Quadriceps-sparing total knee replacement",
  "Partial knee replacement",
  "Minimal invasive spine surgeries",
  "Arthroscopic procedures",
  "Complex trauma & fracture care",
];

const memberships = [
  "Medical Council of India",
  "Indian Orthopedic Association",
  "Indian Society of Hip & Knee Surgeons",
  "Indian Medical Association",
  "Delhi Medical Association",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="About Dr. Anil Raheja"
        subtitle="Best orthopedic surgeon in Delhi, India — 28 years of experience, 12,000+ surgeries."
        breadcrumb="About Us"
      />

      {/* Intro */}
      <section className="section">
        <div className={`container ${styles.intro}`}>
          <Reveal className={styles.introMedia}>
            <div className={styles.introFrame}>
              <Image
                src="/images/43566-3.png"
                alt="Dr. Anil Raheja"
                width={520}
                height={600}
                className={styles.cover}
                priority
              />
            </div>
            <div className={styles.introBadge}>
              <span>
                <CountUp value={12000} suffix="+" />
              </span>
              <small>Surgeries performed</small>
            </div>
          </Reveal>
          <Reveal delay={0.12} className={styles.introText}>
            <span className="eyebrow">The Doctor</span>
            <h2>
              Dr. Anil Raheja <span className="accent">MS (Ortho), M.Ch (Ortho)</span>
            </h2>
            <p>
              Dr. Anil Raheja is an orthopedic surgeon specialized in treating knee and
              shoulder injuries. He is the Director of Orthopedics at Apollo Spectra
              Hospital Karol Bagh &amp; Jeewan Mala Hospital — a highly skilled joint
              replacement surgeon with an experience of over 12,000 surgeries.
            </p>
            <p>
              A proud alumnus of M.D.U University, Rohtak, he holds special skills in
              minimal invasive techniques that mean smaller incisions, less pain and
              faster recovery for his patients. With some of the best technology at
              hand, he is committed to offering comprehensive orthopedic care all under
              one roof.
            </p>
            <p>
              His work is completely professional, delivered in time and within the
              specified budget — customized to suit the needs of every patient. That
              approach has made him a life saver for many people suffering from
              orthopedic and joint-related injuries.
            </p>
            <div className={styles.helpline}>
              <span className={styles.helpIcon}>
                <Phone width={18} height={18} />
              </span>
              <div>
                <small>Helpline number</small>
                <a href={`tel:${contact.phonePrimary}`}>{contact.phoneDisplay}</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statBand}>
        <div className={`container ${styles.statGrid}`}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className={styles.stat}>
              <span className={styles.statNum}>
                <CountUp value={s.value} suffix={s.suffix} />
              </span>
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Expertise + memberships */}
      <section className="section section--ice">
        <div className={`container ${styles.cols}`}>
          <Reveal className={styles.panel}>
            <span className="eyebrow">Area of Expertise</span>
            <h3>Surgical specialities</h3>
            <ul className={styles.list}>
              {expertise.map((e) => (
                <li key={e}>
                  <span className={styles.tick}>
                    <Check width={14} height={14} />
                  </span>
                  {e}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className={styles.panel}>
            <span className="eyebrow">Recognition</span>
            <h3>Memberships &amp; associations</h3>
            <ul className={styles.list}>
              {memberships.map((m) => (
                <li key={m}>
                  <span className={styles.tickAlt}>
                    <Star width={13} height={13} />
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <BookCta />
    </>
  );
}
