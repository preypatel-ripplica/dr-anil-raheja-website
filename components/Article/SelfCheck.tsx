"use client";

import { useState } from "react";
import Link from "next/link";
import type { SelfCheck } from "@/lib/blog";
import { contact } from "@/lib/site";
import { Check, ArrowRight, Phone } from "@/components/Icons";
import styles from "./SelfCheck.module.css";

/**
 * Interactive in-article self-check. The reader ticks statements that apply;
 * a live, tiered recommendation appears with a booking CTA. Guidance only , 
 * not a diagnosis. Front-end; CMS-ready.
 */
export default function SelfCheck({
  data,
  relatedSlug,
}: {
  data: SelfCheck;
  relatedSlug: string;
}) {
  const [ticked, setTicked] = useState<boolean[]>(() => data.items.map(() => false));
  const [revealed, setRevealed] = useState(false);
  const count = ticked.filter(Boolean).length;
  const level =
    [...data.levels].sort((a, b) => b.min - a.min).find((l) => count >= l.min) ??
    data.levels[data.levels.length - 1];

  const toggle = (i: number) =>
    setTicked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <aside className={styles.card} aria-label="Quick self-check">
      <span className={styles.tag}>Quick self-check</span>
      <h3 className={styles.heading}>{data.heading}</h3>
      <p className={styles.prompt}>{data.prompt}</p>

      <ul className={styles.items}>
        {data.items.map((item, i) => (
          <li key={item}>
            <button
              type="button"
              className={`${styles.item} ${ticked[i] ? styles.itemOn : ""}`}
              onClick={() => toggle(i)}
              aria-pressed={ticked[i]}
            >
              <span className={styles.box}>{ticked[i] && <Check width={13} height={13} />}</span>
              {item}
            </button>
          </li>
        ))}
      </ul>

      {!revealed ? (
        <button type="button" className="btn btn--primary" onClick={() => setRevealed(true)} style={{ width: "100%" }}>
          See what this suggests <ArrowRight width={16} height={16} />
        </button>
      ) : (
        <div className={`${styles.result} ${styles[level.tone]}`}>
          <span className={styles.resultCount}>{count} of {data.items.length}</span>
          <strong>{level.title}</strong>
          <p>{level.note}</p>
          <div className={styles.resultCtas}>
            <Link href={`/${relatedSlug}`} className="btn btn--navy">
              Read the treatment <ArrowRight width={15} height={15} />
            </Link>
            <a href={`tel:${contact.phonePrimary}`} className="btn btn--outline">
              <Phone width={15} height={15} /> Call clinic
            </a>
          </div>
        </div>
      )}
      <p className={styles.disclaimer}>This is general guidance, not a medical diagnosis.</p>
    </aside>
  );
}
