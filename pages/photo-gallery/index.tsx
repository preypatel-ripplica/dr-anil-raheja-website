import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import BookCta from "@/components/BookCta/BookCta";
import MosaicGallery from "@/components/MosaicGallery/MosaicGallery";
import Reveal from "@/components/Motion/Reveal";
import { galleryPhotos } from "@/lib/content";
import { Camera, MapPin } from "@/components/Icons";
import styles from "./gallery.module.css";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Moments from Dr. Anil Raheja's practice, clinics, surgeries and patient milestones.",
};

export default function PhotoGalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Inside the practice"
        subtitle="A look at the clinics, the team and the milestones, the everyday work behind 15,000+ surgeries."
        breadcrumb="Photo Gallery"
      />

      <section className="section">
        <div className="container">
          {/* intro strip */}
          <Reveal className={styles.introStrip}>
            <div className={styles.introText}>
              <span className={styles.introIcon}>
                <Camera width={20} height={20} />
              </span>
              <p>
                <strong>{galleryPhotos.length} photographs</strong> from Dr. Anil Raheja&apos;s
                clinics and operating theatres. Tap any image to view it full-screen.
              </p>
            </div>
            <div className={styles.introMeta}>
              <MapPin width={15} height={15} /> Vijay Nagar · Apollo Spectra · Jeewan Mala
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <MosaicGallery images={galleryPhotos} />
          </Reveal>
        </div>
      </section>

      <BookCta />
    </>
  );
}
