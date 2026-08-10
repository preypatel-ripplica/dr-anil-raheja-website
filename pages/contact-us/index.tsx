import Head from "next/head";
import PageHero from "@/components/PageHero/PageHero";
import BookCta from "@/components/BookCta/BookCta";
import VisitPlanner from "@/components/VisitPlanner/VisitPlanner";
import CallPrepKit from "@/components/CallPrepKit/CallPrepKit";
import Reveal from "@/components/Motion/Reveal";
import { appointmentUrl, contact, clinics } from "@/lib/site";
import { breadcrumbSchema, canonicalUrl, jsonLd, physicianSchema } from "@/lib/seo";
import { Phone, Mail, MapPin, Clock } from "@/components/Icons";
import styles from "./contact.module.css";
import { useI18n } from "@/lib/i18n-context";

export default function ContactPage() {
  const { t } = useI18n();
  return (
    <>
      <Head>
        <title>Contact Us | Dr. Anil Raheja</title>
        <meta
          name="description"
          content="Contact Dr. Anil Raheja's clinic for orthopaedic enquiries, clinic timings and appointment booking."
        />
        <link rel="canonical" href={canonicalUrl("/contact-us")} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd([
              physicianSchema,
              breadcrumbSchema([
                { name: "Home", path: "/" },
                { name: "Contact Us", path: "/contact-us" },
              ]),
            ]),
          }}
        />
      </Head>
      <PageHero
        eyebrow="Contact us"
        title="Talk to the clinic"
        subtitle="Book online for an appointment, or send an enquiry and the clinic team will guide the next step."
        breadcrumb="Contact us"
      />

      <section className="section">
        <div className="container">
          <div className={styles.cards}>
            <Reveal className={styles.card}>
              <span className={styles.icon}>
                <Phone width={21} height={21} />
              </span>
              <h3>Book online</h3>
              <a href={appointmentUrl} target="_blank" rel="noopener noreferrer" className={styles.big}>
                Book appointment
              </a>
              <p className={styles.muted}>Opens the HealthPlix booking page</p>
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
                <Clock width={13} height={13} /> <bdi dir="ltr" data-no-translate>{t(clinics[0].days)} · {t(clinics[0].hours)}</bdi>
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
