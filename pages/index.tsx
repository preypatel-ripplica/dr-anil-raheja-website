import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { appointmentUrl, treatments, contact, clinics, site, treatmentHref } from "@/lib/site";
import { reviews, reviewsSummary, generalFaqs } from "@/lib/content";
import { breadcrumbSchema, canonicalUrl, faqSchema, jsonLd, physicianSchema, websiteSchema } from "@/lib/seo";
import { toArticleSummary, type ArticleSummary } from "@/lib/blog";
import { getArticles, getVideos, type VideoItem } from "@/lib/cms";
import BookCta from "@/components/BookCta/BookCta";
import SymptomGuide from "@/components/SymptomGuide/SymptomGuide";
import VideoCard from "@/components/VideoCard/VideoCard";
import Faq from "@/components/Faq/Faq";
import Reveal from "@/components/Motion/Reveal";
import CountUp from "@/components/Motion/CountUp";
import {
  Star,
  ArrowRight,
  Check,
  Phone,
  Quote,
  MapPin,
  Bone,
  Joint,
  Spine,
  Tool,
  Pulse,
  Shield,
  Walk,
  Scan,
} from "@/components/Icons";

const serviceIcons = [Joint, Bone, Spine, Tool, Pulse, Bone, Scan, Shield, Walk, Pulse];
const heroMobileSrc = "/images/optimized/dr-anil-raheja-hero-640.png";
const heroDesktopSrc = "/images/optimized/dr-anil-raheja-hero-900.png";

export const getStaticProps: GetStaticProps<{
  blogPosts: ArticleSummary[];
  featureVideos: VideoItem[];
}> = async () => {
  const [blogPosts, videos] = await Promise.all([getArticles(), getVideos()]);
  return { props: { blogPosts: blogPosts.map(toArticleSummary), featureVideos: videos.featured } };
};

export default function HomePage({
  blogPosts,
  featureVideos,
}: {
  blogPosts: ArticleSummary[];
  featureVideos: VideoItem[];
}) {
  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl("/")} />
        <link rel="preload" as="image" href={heroMobileSrc} media="(max-width: 780px)" />
        <link rel="preload" as="image" href={heroDesktopSrc} media="(min-width: 781px)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd([
              websiteSchema,
              physicianSchema,
              breadcrumbSchema([{ name: "Home", path: "/" }]),
              faqSchema(generalFaqs),
            ].filter(Boolean) as object[]),
          }}
        />
      </Head>
      {/* ============ HERO — calm, reassuring split ============ */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <span className="eyebrow">Hip Replacement Surgeon · Delhi</span>
            <h1 className={styles.heroTitle}>
              Get back to <span className="grad-text">pain-free</span> movement
            </h1>
            <p className={styles.heroLead}>
              Dr. Anil Raheja is a leading Hip Replacement Surgeon in Delhi with 30 years
              of experience and over 25,000 successful surgeries. He specialises in the
              muscle-sparing Direct Anterior Approach (DAA) and minimally invasive hip
              surgery, alongside knee replacement, spine surgery, arthroscopy and
              arthritis care. Trusted, minimally invasive, recovery-focused.
            </p>
            <div className={styles.heroCtas}>
              <a href={appointmentUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                Book an Appointment <ArrowRight width={17} height={17} />
              </a>
              <a href={`tel:${contact.phonePrimary}`} className="btn btn--outline">
                <Phone width={16} height={16} /> {contact.phoneDisplay}
              </a>
            </div>
            <div className={styles.heroTrust}>
              <div className={styles.trustItem}>
                <span className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} width={16} height={16} />
                  ))}
                </span>
                <span>
                  <strong>{reviewsSummary.rating}</strong> · {reviewsSummary.count} reviews
                </span>
              </div>
              <div className={styles.trustDivide} aria-hidden />
              <div className={styles.trustItem}>
                <Shield width={18} height={18} className={styles.trustIcon} />
                <span>Director Orthopedics, Apollo Spectra</span>
              </div>
            </div>
          </div>

          <div className={styles.heroMedia}>
            <div className={styles.heroPhoto}>
              <picture className={styles.heroPicture}>
                <source srcSet={heroMobileSrc} media="(max-width: 780px)" width={640} height={640} />
                <img
                  src={heroDesktopSrc}
                  alt="Dr. Anil Raheja, Best Orthopedic Doctor in Delhi"
                  width={900}
                  height={900}
                  loading="eager"
                  decoding="sync"
                  fetchPriority="high"
                  className={styles.heroImg}
                />
              </picture>
            </div>
            <div className={styles.heroCard}>
              <span className={styles.heroCardNum}>
                <CountUp value={25000} suffix="+" />
              </span>
              <span className={styles.heroCardLabel}>Successful surgeries</span>
            </div>
            <div className={styles.heroCardTop}>
              <span className={styles.heroCardIcon}>
                <Check width={16} height={16} />
              </span>
              <div>
                <strong>30 years</strong>
                <small>of experience</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STAT BAND — confident numbers ============ */}
      <section className={styles.stats}>
        <div className={`container ${styles.statsGrid}`}>
          <Reveal className={styles.stat}>
            <span className={styles.statNum}>
              <CountUp value={30} suffix="+" />
            </span>
            <span className={styles.statLabel}>Years of experience</span>
          </Reveal>
          <Reveal delay={0.08} className={styles.stat}>
            <span className={styles.statNum}>
              <CountUp value={100000} suffix="+" />
            </span>
            <span className={styles.statLabel}>Happy patients</span>
          </Reveal>
          <Reveal delay={0.16} className={styles.stat}>
            <span className={styles.statNum}>
              <CountUp value={25000} suffix="+" />
            </span>
            <span className={styles.statLabel}>Surgeries performed</span>
          </Reveal>
          <Reveal delay={0.24} className={styles.stat}>
            <span className={styles.statNum}>3</span>
            <span className={styles.statLabel}>Clinic locations</span>
          </Reveal>
        </div>
      </section>

      {/* ============ SERVICES — clean cards ============ */}
      <section className={`section ${styles.services}`}>
        <div className="container">
          <Reveal className={styles.servicesHead}>
            <div>
              <span className="eyebrow">Specialities &amp; Services</span>
              <h2>
                Comprehensive <span className="grad-text">orthopedic care</span>
              </h2>
            </div>
            <p>
              A clear, patient-friendly process for every treatment, using advanced
              technology to deliver safe, effective and predictable outcomes.
            </p>
          </Reveal>
          <div className={styles.serviceGrid}>
            {treatments.map((t, i) => {
              const Icon = serviceIcons[i] ?? Joint;
              return (
                <Reveal key={t.slug} delay={i * 0.06}>
                  <Link href={treatmentHref(t.slug)} className={styles.serviceCard}>
                    <div className={styles.serviceImg}>
                      <Image src={t.image} alt={t.title} fill sizes="(max-width: 700px) 100vw, 33vw" className={styles.cover} />
                      <span className={styles.serviceIcon}>
                        <Icon width={22} height={22} />
                      </span>
                    </div>
                    <div className={styles.serviceBody}>
                      <h3>{t.title}</h3>
                      <p>{t.excerpt}</p>
                      <span className={styles.serviceLink}>
                        Learn more <ArrowRight width={15} height={15} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
            <Reveal delay={0.32}>
              <div className={`${styles.serviceCard} ${styles.helpCard}`}>
                <span className={styles.helpIcon}>
                  <Phone width={22} height={22} />
                </span>
                <h3>Not sure which one?</h3>
                <p>Call the helpline and describe your problem. We&apos;ll guide you to the right specialist.</p>
                <a href={`tel:${contact.phonePrimary}`} className={styles.helpNum}>
                  {contact.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ SYMPTOM GUIDE ============ */}
      <SymptomGuide />

      {/* ============ ABOUT ============ */}
      <section className={`section section--ice ${styles.about}`}>
        <div className={`container ${styles.aboutGrid}`}>
          <Reveal className={styles.aboutMedia}>
            <div className={styles.aboutFrame}>
              <Image
                src="/images/optimized/orthopaedics-1-800.jpg"
                alt="Dr. Anil Raheja in surgery"
                width={560}
                height={620}
                className={styles.cover}
              />
            </div>
            <div className={styles.aboutBadge}>
              <span className={styles.aboutBadgeNum}>
                <CountUp value={30} suffix="+" />
              </span>
              <span>years of trusted care</span>
            </div>
          </Reveal>
          <Reveal delay={0.1} className={styles.aboutText}>
            <span className="eyebrow">Meet the Doctor</span>
            <h2>
              A name North Delhi <span className="grad-text">trusts</span> with movement
            </h2>
            <p>
              Orthopedics is the one department of medicine where you truly need a
              specialist, and Dr. Anil Raheja has built a career on exactly that. As
              Director of Orthopedics at Apollo Spectra and Jeewan Mala Hospital, he
              specializes in minimally invasive joint replacement, spine surgery and
              arthroscopic procedures.
            </p>
            <ul className={styles.aboutList}>
              <li>
                <span className={styles.iconChip}>
                  <Scan width={18} height={18} />
                </span>
                <div>
                  <strong>Diagnosis first</strong>
                  <span>Clear, imaging-backed answers before any treatment decision.</span>
                </div>
              </li>
              <li>
                <span className={styles.iconChip}>
                  <Tool width={18} height={18} />
                </span>
                <div>
                  <strong>Minimally invasive</strong>
                  <span>Single-incision and keyhole techniques for a faster, gentler recovery.</span>
                </div>
              </li>
              <li>
                <span className={styles.iconChip}>
                  <Walk width={18} height={18} />
                </span>
                <div>
                  <strong>Recovery-focused</strong>
                  <span>Every plan is measured by one thing: getting you moving again.</span>
                </div>
              </li>
            </ul>
            <Link href="/about-us" className="btn btn--navy">
              About Dr. Anil <ArrowRight width={16} height={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ PROCESS — calm steps on navy ============ */}
      <section className={`section section--navy ${styles.process}`}>
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow eyebrow--invert">How this works</span>
            <h2 className={styles.processTitle}>From first call to full recovery</h2>
          </Reveal>
          <ol className={styles.steps}>
            {[
              { icon: Phone, t: "Consult", d: "Describe your problem in clinic or by phone; examination and imaging as needed." },
              { icon: Scan, t: "Diagnose", d: "X-ray / MRI-backed diagnosis with a clear explanation of what's wrong and why." },
              { icon: Tool, t: "Treat", d: "Conservative care first; minimally invasive surgery only when it's truly needed." },
              { icon: Walk, t: "Recover", d: "A guided rehabilitation plan with follow-ups until you're moving freely again." },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.t} delay={i * 0.08} as="li" className={styles.step}>
                  <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.stepIcon}>
                    <Icon width={22} height={22} />
                  </span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
      <section className={`section ${styles.reviews}`}>
        <div className="container">
          <Reveal className={styles.reviewHead}>
            <div>
              <span className="eyebrow">Patient Stories</span>
              <h2>
                Rated <span className="grad-text">EXCELLENT</span> by 212 patients
              </h2>
            </div>
            <Link href="/patient-testimonials" className="btn btn--outline">
              All testimonials <ArrowRight width={16} height={16} />
            </Link>
          </Reveal>
          <div className={styles.reviewGrid}>
            {reviews.slice(0, 3).map((r, i) => (
              <Reveal key={r.name} delay={i * 0.08} as="article" className={styles.reviewCard}>
                <Quote width={26} height={26} className={styles.rQuote} />
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  <span className={styles.avatar}>{r.name.charAt(0)}</span>
                  <span>
                    <strong>{r.name}</strong>
                    <span className={styles.miniStars}>
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} width={12} height={12} />
                      ))}
                    </span>
                  </span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VIDEOS ============ */}
      <section className={`section section--mint ${styles.videos}`}>
        <div className="container">
          <Reveal className={styles.videoHead}>
            <div>
              <span className="eyebrow">Video Gallery</span>
              <h2>Understand your treatment</h2>
            </div>
            <Link href="/our-videos" className="btn btn--outline">
              All videos <ArrowRight width={16} height={16} />
            </Link>
          </Reveal>
          <div className={styles.videoGrid}>
            {featureVideos.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.08}>
                <VideoCard id={v.id} title={v.title} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ + BLOG ============ */}
      <section className={`section ${styles.faqBlog}`}>
        <div className={`container ${styles.faqBlogGrid}`}>
          <div>
            <Reveal className="section-head">
              <span className="eyebrow">Good to Know</span>
              <h2>Frequently asked questions</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <Faq items={generalFaqs} />
            </Reveal>
          </div>
          <div>
            <Reveal className="section-head">
              <span className="eyebrow">From the Desk</span>
              <h2>Health articles</h2>
            </Reveal>
            <div className={styles.blogList}>
              {blogPosts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.07} as="article" className={styles.blogRow}>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className={styles.blogThumb}
                    aria-label={`Read article: ${post.title}`}
                  >
                    <Image src={post.image} alt="" fill sizes="120px" className={styles.cover} />
                  </Link>
                  <div>
                    <h3>
                      <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p>{post.excerpt.length > 110 ? post.excerpt.slice(0, 107).trimEnd() + "…" : post.excerpt}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={0.25}>
                <Link href="/blogs" className="btn btn--ghost">
                  All posts <ArrowRight width={15} height={15} />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLINICS STRIP ============ */}
      <section className={styles.clinicsStrip}>
        <div className={`container ${styles.clinicsInner}`}>
          {clinics.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.07} className={styles.clinicItem}>
              <span className={styles.clinicPin}>
                <MapPin width={17} height={17} />
              </span>
              <div>
                <strong>{c.name}</strong>
                <span>
                  {c.area} · {c.days} · {c.hours}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ APPOINTMENT ============ */}
      <BookCta />
    </>
  );
}
