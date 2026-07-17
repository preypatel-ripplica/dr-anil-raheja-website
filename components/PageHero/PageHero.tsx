import Link from "next/link";
import Reveal from "@/components/Motion/Reveal";
import styles from "./PageHero.module.css";

/** Left-aligned technical page header (media/utility pages). */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}) {
  return (
    <section className={styles.hero}>
      <div className="container">
        <Reveal>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">{breadcrumb ?? title}</span>
          </nav>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}
