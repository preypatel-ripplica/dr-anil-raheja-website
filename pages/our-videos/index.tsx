import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import BookCta from "@/components/BookCta/BookCta";
import VideoCard from "@/components/VideoCard/VideoCard";
import Reveal from "@/components/Motion/Reveal";
import { featureVideos, shorts } from "@/lib/content";
import { contact } from "@/lib/site";
import { Youtube } from "@/components/Icons";
import styles from "./videos.module.css";

export const metadata: Metadata = {
  title: "Our Videos",
  description:
    "Patient education videos and shorts from Dr. Anil Raheja — understand your orthopedic treatment before you walk in.",
};

export default function VideosPage() {
  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Our Videos"
        subtitle="Short, clear explainers on joints, surgery and recovery — straight from the operating surgeon."
        breadcrumb="Our Videos"
      />

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Featured</span>
            <h2>Patient talks &amp; procedures</h2>
          </Reveal>
          <div className={styles.featureGrid}>
            {featureVideos.map((id, i) => (
              <Reveal key={id} delay={i * 0.08}>
                <VideoCard id={id} title="Dr. Anil Raheja video" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ice">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Shorts</span>
            <h2>Quick answers, under a minute</h2>
          </Reveal>
          <div className={styles.shortsGrid}>
            {shorts.map((id, i) => (
              <Reveal key={id} delay={(i % 4) * 0.06}>
                <VideoCard id={id} title="Dr. Anil Raheja short" vertical />
              </Reveal>
            ))}
          </div>
          <Reveal className={styles.channel}>
            <a
              href={contact.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--navy"
            >
              <Youtube width={18} height={18} /> Subscribe @dranilrahejaortho
            </a>
          </Reveal>
        </div>
      </section>

      <BookCta />
    </>
  );
}
