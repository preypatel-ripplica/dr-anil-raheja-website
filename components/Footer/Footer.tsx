import Link from "next/link";
import { appointmentUrl, site, contact, clinics, treatments, logo, treatmentHref } from "@/lib/site";
import { Phone, Mail, MapPin, Clock, Youtube, ArrowRight } from "@/components/Icons";
import styles from "./Footer.module.css";
import { useI18n } from "@/lib/i18n-context";

export default function Footer() {
  const { t, localizeHref } = useI18n();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Brand */}
        <div>
          <div className={styles.brand}>
            <span className={styles.brandMark}>
              <img src={logo.icon} alt="" />
            </span>
            <span>
              <strong>{site.name}</strong>
              <small>{site.credentials}</small>
            </span>
          </div>
          <p className={styles.blurb}>
            {t("Renowned orthopedic surgeon in Delhi with 30 years of experience and 15,000+ surgeries. Director Orthopedics at Apollo Spectra Hospital Karol Bagh &amp; Jeewan Mala Hospital.")}
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
            <h4 className={styles.heading}>{t("Our Treatments")}</h4>
          <ul className={styles.links}>
            {treatments.map((treatment) => (
              <li key={treatment.slug}>
                <Link href={localizeHref(treatmentHref(treatment.slug))}>
                  <ArrowRight width={13} height={13} /> {t(treatment.title)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* OPD timings */}
        <div>
          <h4 className={styles.heading}>{t("OPD Timings")}</h4>
          <ul className={styles.timings}>
            {clinics.map((c) => (
              <li key={c.id}>
                <Clock width={15} height={15} className={styles.icon} />
                <div>
                    <strong>{t(c.name)}</strong>
                    <span>
                    {t(c.area)} · {t(c.days)} · {c.hours}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className={styles.heading}>{t("Contact")}</h4>
          <ul className={styles.contactList}>
            <li>
              <MapPin width={15} height={15} className={styles.icon} />
              <span>{contact.address}</span>
            </li>
            <li>
              <Phone width={15} height={15} className={styles.icon} />
              <a href={`tel:${contact.phonePrimary}`}><bdi dir="ltr" data-no-translate>{contact.phoneDisplay}</bdi></a>
            </li>
            <li>
              <Mail width={15} height={15} className={styles.icon} />
              <a href={`mailto:${contact.email}`}><bdi dir="ltr" data-no-translate>{contact.email}</bdi></a>
            </li>
          </ul>
          <a href={appointmentUrl} target="_blank" rel="noopener noreferrer" className={`btn btn--primary ${styles.footBtn}`}>
            {t("Book an Appointment")}
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p>
            © {new Date().getFullYear()} {site.name}. All Rights Reserved.
          </p>
          <p>
            <Link href={localizeHref("/contact-us")}>{t("Privacy Policy")}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
