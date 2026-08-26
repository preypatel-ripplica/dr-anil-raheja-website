import Link from "next/link";
import Image from "next/image";
import BookCta from "@/components/BookCta/BookCta";
import EnquiryForm from "@/components/EnquiryForm/EnquiryForm";
import TreatmentJourney from "@/components/TreatmentJourney/TreatmentJourney";
import Faq from "@/components/Faq/Faq";
import Reveal from "@/components/Motion/Reveal";
import { contact, treatmentHref, type Treatment } from "@/lib/site";
import type { TreatmentContent, Section } from "@/lib/treatmentContent";
import { Check, Phone, ArrowRight } from "@/components/Icons";
import styles from "./TreatmentLayout.module.css";

// ---------------------------------------------------------------------------
// "Case file" treatment page: dark spec header with facts, a sticky index rail
// on the left, and editorial content sections on the right.
// Deliberately distinct from the Tripti sites' sidebar layout.
// ---------------------------------------------------------------------------

const sectionId = (i: number) => `s-${String(i + 1).padStart(2, "0")}`;

function SectionView({ section, index }: { section: Section; index: number }) {
  const id = sectionId(index);
  switch (section.type) {
    case "text":
      return (
        <Reveal as="article" className={styles.block}>
          <div id={id} className={styles.anchor} />
          <h2>{section.heading}</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
      );
    case "list":
      return (
        <Reveal as="article" className={styles.block}>
          <div id={id} className={styles.anchor} />
          <h2>{section.heading}</h2>
          {section.intro && <p>{section.intro}</p>}
          <ul className={styles.checkList}>
            {section.items.map((item) => (
              <li key={item}>
                <span className={styles.tick}>
                  <Check width={13} height={13} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      );
    case "image":
      return (
        <Reveal as="article" className={`${styles.block} ${styles.figureBlock}`}>
          <div id={id} className={styles.anchor} />
          <figure>
            <div className={styles.figureMedia}>
              <Image
                src={section.image}
                alt={section.alt || section.heading || ""}
                width={960}
                height={540}
                className={styles.figureImg}
              />
            </div>
            {section.heading && <figcaption>{section.heading}</figcaption>}
          </figure>
        </Reveal>
      );
    case "imageText":
      return (
        <Reveal as="article" className={styles.block}>
          <div id={id} className={styles.anchor} />
          <h2>{section.heading}</h2>
          <div className={`${styles.split} ${section.imageSide === "left" ? styles.splitLeft : ""}`}>
            <div>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className={styles.splitMedia}>
              <Image
                src={section.image}
                alt={section.heading}
                width={480}
                height={360}
                className={styles.splitImg}
              />
            </div>
          </div>
        </Reveal>
      );
  }
}

export default function TreatmentLayout({ content, treatments }: { content: TreatmentContent; treatments: Treatment[] }) {
  const current = treatments.find((t) => t.slug === content.slug);
  const others = treatments.filter((t) => t.slug !== content.slug);
  const currentShort = current?.short || content.short || content.title;
  const tocItems = content.sections.reduce<{ label: string; index: number }[]>((items, section, index) => {
    const label = "heading" in section ? section.heading || "" : "";
    if (label && !items.some((item) => item.label === label)) items.push({ label, index });
    return items;
  }, []);
  const tocLinks = [
    ...tocItems,
    ...(content.faqs?.length ? ["Frequently asked questions"] : []),
  ].map((item, i) => (typeof item === "string" ? { label: item, index: content.sections.length } : item));

  return (
    <>
      {/* ======================= CASE-FILE HEADER ======================= */}
      <header className={styles.caseHead}>
        <div className={styles.caseGrid} aria-hidden />
        <div className={`container ${styles.caseInner}`}>
          <Reveal className={styles.caseText}>
            <nav className={styles.crumbs} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Specialities</span>
              <span>/</span>
              <span aria-current="page">{currentShort}</span>
            </nav>
            <h1>{content.title}</h1>
            <p>{content.subtitle}</p>
            <div className={styles.caseCtas}>
              <Link href="#enquiry" className="btn btn--primary">
                Ask about this treatment <ArrowRight width={16} height={16} />
              </Link>
              <a href={`tel:${contact.phonePrimary}`} className={styles.caseCall}>
                <Phone width={15} height={15} /> {contact.phoneDisplay}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.12} className={styles.caseMedia}>
            <Image
              src={content.heroImage}
              alt={content.heroAlt || content.bannerAlt || content.title}
              width={640}
              height={420}
              className={styles.caseImg}
              priority
            />
          </Reveal>
        </div>
        {/* spec strip */}
        <div className={styles.specs}>
          <div className={`container ${styles.specsInner}`}>
            {content.facts.map((f) => (
              <div key={f.label} className={styles.spec}>
                <span className={styles.specLabel}>{f.label}</span>
                <span className={styles.specValue}>{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ======================= INDEX RAIL + CONTENT ======================= */}
      <section className="section">
        <div className={`container ${styles.body}`}>
          <aside className={styles.rail}>
            <span className={styles.railTitle}>On this page</span>
            <ol className={styles.toc}>
              {tocLinks.map(({ label, index }) => (
                <li key={label}>
                  <a href={`#${sectionId(index)}`}>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
            <a href={`tel:${contact.phonePrimary}`} className={styles.railCall}>
              <Phone width={15} height={15} />
              <span>
                <small>Helpline</small>
                {contact.phoneDisplay}
              </span>
            </a>
          </aside>

          <div className={styles.content}>
            {content.sections.map((s, i) => (
              <SectionView key={i} section={s} index={i} />
            ))}

            {content.faqs && content.faqs.length > 0 && (
              <Reveal as="article" className={styles.block}>
                <div id={sectionId(content.sections.length)} className={styles.anchor} />
                <h2>Frequently asked questions</h2>
                <Faq items={content.faqs} />
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ======================= PLAN-THIS-VISIT WIDGET ======================= */}
      <section className={`section section--mint section--ruled ${styles.journey}`}>
        <div className="container">
          <Reveal>
            <TreatmentJourney slug={content.slug} planner={content.treatmentPlanner} />
          </Reveal>
        </div>
      </section>

      {/* ======================= ENQUIRY BAND ======================= */}
      <section id="enquiry" className={`section section--ice ${styles.enquiry}`}>
        <div className={`container ${styles.enquiryGrid}`}>
          <Reveal>
            <span className="eyebrow">Ask the surgeon</span>
            <h2>
              Questions about{" "}
              <span className="grad-text">{currentShort.toLowerCase()}</span>?
            </h2>
            <p className={styles.enquiryLead}>
              Costs, recovery time, whether surgery is even needed in your case. Send
              your question and get a call back within one working day.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <EnquiryForm treatment={currentShort} />
          </Reveal>
        </div>
      </section>

      {/* ======================= OTHER TREATMENTS STRIP ======================= */}
      {others.length > 0 && (
        <section className={styles.othersStrip}>
          <div className={`container ${styles.othersInner}`}>
            <span className={styles.othersLabel}>Other specialities</span>
            <div className={styles.othersLinks}>
              {others.map((t) => (
                <Link key={t.slug} href={treatmentHref(t.slug)} className={styles.otherLink}>
                  {t.short} <ArrowRight width={13} height={13} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <BookCta defaultTreatment={content.slug} />
    </>
  );
}
