import type { GetStaticProps } from "next";
import Head from "next/head";
import PageHero from "@/components/PageHero/PageHero";
import BookCta from "@/components/BookCta/BookCta";
import VideoCard from "@/components/VideoCard/VideoCard";
import Reveal from "@/components/Motion/Reveal";
import { reviews, reviewsSummary } from "@/lib/content";
import { getVideos, type VideoItem } from "@/lib/cms";
import { Star, Quote } from "@/components/Icons";
import styles from "./testimonials.module.css";

export const getStaticProps: GetStaticProps<{ featureVideos: VideoItem[] }> = async () => {
  const { featured } = await getVideos();
  return { props: { featureVideos: featured } };
};

export default function TestimonialsPage({ featureVideos }: { featureVideos: VideoItem[] }) {
  return (
    <>
      <Head>
        <title>Patient Testimonials | Dr. Anil Raheja</title>
        <meta
          name="description"
          content="What patients say about Dr. Anil Raheja — rated EXCELLENT from 212 Google reviews."
        />
      </Head>
      <PageHero
        eyebrow="Media"
        title="Patient Testimonials"
        subtitle="The trust of recovering patients is the practice's best credential."
        breadcrumb="Patient Testimonials"
      />

      {/* rating hero */}
      <section className={`section ${styles.ratingWrap}`}>
        <div className="container">
          <Reveal className={styles.ratingCard}>
            <span className={styles.ratingWord}>{reviewsSummary.rating}</span>
            <div className={styles.stars}>
              {[...Array(reviewsSummary.stars)].map((_, i) => (
                <Star key={i} width={26} height={26} />
              ))}
            </div>
            <p>Based on {reviewsSummary.count} Google reviews</p>
          </Reveal>

          <div className={styles.grid}>
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 0.08} as="article" className={styles.card}>
                <Quote width={24} height={24} className={styles.quote} />
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  <span className={styles.avatar}>{r.name.charAt(0)}</span>
                  <span>
                    <strong>{r.name}</strong>
                    <small>Google review</small>
                  </span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* video testimonials */}
      <section className="section section--ice">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">In their own words</span>
            <h2>Video testimonials</h2>
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

      <BookCta />
    </>
  );
}
