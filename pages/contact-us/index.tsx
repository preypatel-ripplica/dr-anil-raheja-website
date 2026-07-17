import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import BookCta from "@/components/BookCta/BookCta";
import VisitPlanner from "@/components/VisitPlanner/VisitPlanner";
import CallPrepKit from "@/components/CallPrepKit/CallPrepKit";
import Reveal from "@/components/Motion/Reveal";
import { contact, clinics } from "@/lib/site";
import { Phone, Mail, MapPin, Clock } from "@/components/Icons";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Book an appointment with Dr. Anil Raheja — Vijay Nagar clinic, Apollo Spectra and Jeewan Mala Hospital, Karol Bagh.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Talk to the clinic"
        subtitle="Call, write, or plan your visit — we'll confirm your appointment date and time."
        breadcrumb="Contact us"
      />

      <section className="section">
        <div className="container">
          <div className={styles.cards}>
            <Reveal className={styles.card}>
              <span className={styles.icon}>
                <Phone width={21} height={21} />
              </span>
              <h3>For appointments</h3>
              <a href={`tel:${contact.phonePrimary}`} className={styles.big}>
                {contact.phoneDisplay}
              </a>
              <p className={styles.muted}>Mon – Sat, OPD hours</p>
            </Reveal>
            <Reveal delay={0.07} className={styles.card}>
              <span className={styles.icon}>
                <Mail width={21} height={21} />
              </span>
              <h3>Send mail</h3>
              <a href={`mailto:${contact.email}`} className={styles.big}>
                {contact.email}
              </a>
              <p className={styles.muted}>Replies within one working day</p>
            </Reveal>
            <Reveal delay={0.14} className={styles.card}>
              <span className={styles.icon}>
                <MapPin width={21} height={21} />
              </span>
              <h3>Main clinic</h3>
              <p className={styles.muted}>{contact.address}</p>
              <p className={styles.hours}>
                <Clock width={13} height={13} /> {clinics[0].days} · {clinics[0].hours}
              </p>
            </Reveal>
          </div>

          <Reveal className={styles.mapWrap}>
            <iframe
              className={styles.map}
              src={contact.mapEmbed}
              title="Raheja Ortho And Gynae Clinic location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </section>

      <VisitPlanner />

      <CallPrepKit />

      <BookCta />
    </>
  );
}
