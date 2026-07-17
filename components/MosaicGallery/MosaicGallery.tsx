"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Close, ArrowRight, Plus } from "@/components/Icons";
import styles from "./MosaicGallery.module.css";

// Deterministic size pattern for editorial rhythm (repeats across the set).
const SPANS = ["big", "", "tall", "", "wide", "", "", "tall", "", "wide", "", ""];

export default function MosaicGallery({
  images,
  basePath = "/images/",
}: {
  images: string[];
  basePath?: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);
  const move = useCallback(
    (dir: number) =>
      setActive((cur) => (cur === null ? cur : (cur + dir + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, move]);

  return (
    <>
      <div className={styles.mosaic}>
        {images.map((img, i) => (
          <button
            key={img}
            type="button"
            className={`${styles.tile} ${styles[SPANS[i % SPANS.length]] || ""}`}
            onClick={() => setActive(i)}
            aria-label={`Open photo ${i + 1} of ${images.length}`}
          >
            <Image
              src={`${basePath}${img}`}
              alt={`Clinic photo ${i + 1}`}
              fill
              sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
              className={styles.thumb}
            />
            <span className={styles.overlay}>
              <span className={styles.zoom}>
                <Plus width={20} height={20} />
              </span>
              <span className={styles.index}>
                {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
            </span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className={styles.lightbox} onClick={close} role="dialog" aria-modal="true">
          <div className={styles.lbBar}>
            <span className={styles.lbCount}>
              {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <button type="button" className={styles.lbClose} onClick={close} aria-label="Close">
              <Close width={22} height={22} />
            </button>
          </div>
          <button
            type="button"
            className={`${styles.nav} ${styles.prev}`}
            onClick={(e) => {
              e.stopPropagation();
              move(-1);
            }}
            aria-label="Previous photo"
          >
            <ArrowRight width={24} height={24} style={{ transform: "rotate(180deg)" }} />
          </button>
          <div className={styles.stage} onClick={(e) => e.stopPropagation()}>
            <Image
              src={`${basePath}${images[active]}`}
              alt={`Clinic photo ${active + 1}`}
              width={1200}
              height={850}
              className={styles.full}
            />
          </div>
          <button
            type="button"
            className={`${styles.nav} ${styles.next}`}
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
            aria-label="Next photo"
          >
            <ArrowRight width={24} height={24} />
          </button>
        </div>
      )}
    </>
  );
}
