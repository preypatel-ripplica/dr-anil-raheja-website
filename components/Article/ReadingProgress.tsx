"use client";

import { useEffect, useState } from "react";
import styles from "./ReadingProgress.module.css";

/** Thin progress bar that fills as the reader scrolls through the article. */
export default function ReadingProgress({ target = "article" }: { target?: string }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = document.querySelector(target) as HTMLElement | null;
    const onScroll = () => {
      const node = el ?? document.documentElement;
      const start = node.offsetTop ?? 0;
      const total = node.offsetHeight - window.innerHeight * 0.4;
      const scrolled = window.scrollY - start + window.innerHeight * 0.4;
      const p = Math.max(0, Math.min(1, scrolled / Math.max(total, 1)));
      setPct(p * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [target]);

  return (
    <div className={styles.wrap} aria-hidden>
      <div className={styles.bar} style={{ width: `${pct}%` }} />
    </div>
  );
}
