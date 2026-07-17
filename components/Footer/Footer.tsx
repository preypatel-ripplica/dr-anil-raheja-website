import Link from "next/link";
import { site, contact, clinics, treatments } from "@/lib/site";
import { Phone, Mail, MapPin, Clock, Youtube, ArrowRight } from "@/components/Icons";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Brand */}
        <div>
          <div className={styles.brand}>
            <span className={styles.brandMark}>AR</span>
            <span>
              <strong>{site.name}</strong>
              <small>{site.credentials}</small>
            </span>
          </div>
          <p className={styles.blurb}>
            Renowned orthopedic surgeon in Delhi with 28 years of experience and
            12,000+ surgeries. Director Orthopedics at Apollo Spectra Hospital
            Karol Bagh &amp; Jeewan Mala Hospital.
          </p>
          <a
            href={contact.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.social}
            aria-label="YouTube channel"
          >
            <Youtube width={16} height={16} /> @dranilrahejaortho
          </a>
        </div>

        {/* Treatments */}
        <div>
          <h4 className={styles.heading}>Our Treatments</h4>
          <ul className={styles.links}>
            {treatments.map((t) => (
              <li key={t.slug}>
                <Link href={`/${t.slug}`}>
                  <ArrowRight width={13} height={13} /> {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* OPD timings */}
        <div>
          <h4 className={styles.heading}>OPD Timings</h4>
          <ul className={styles.timings}>
            {clinics.map((c) => (
              <li key={c.id}>
                <Clock width={15} height={15} className={styles.icon} />
                <div>
                  <strong>{c.name}</strong>
                  <span>
                    {c.area} · {c.days} · {c.hours}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className={styles.heading}>Contact</h4>
          <ul className={styles.contactList}>
            <li>
              <MapPin width={15} height={15} className={styles.icon} />
              <span>{contact.address}</span>
            </li>
            <li>
              <Phone width={15} height={15} className={styles.icon} />
              <a href={`tel:${contact.phonePrimary}`}>{contact.phoneDisplay}</a>
            </li>
            <li>
              <Mail width={15} height={15} className={styles.icon} />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
          </ul>
          <Link href="/contact-us" className={`btn btn--primary ${styles.footBtn}`}>
            Book an Appointment
          </Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p>
            © {new Date().getFullYear()} {site.name}. All Rights Reserved.
          </p>
          <p>
            <Link href="/contact-us">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
