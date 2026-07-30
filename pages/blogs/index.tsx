import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero/PageHero";
import BookCta from "@/components/BookCta/BookCta";
import Reveal from "@/components/Motion/Reveal";
import type { Article } from "@/lib/blog";
import { getArticles } from "@/lib/cms";
import { breadcrumbSchema, canonicalUrl, jsonLd } from "@/lib/seo";
import { ArrowRight, Clock } from "@/components/Icons";
import styles from "./blogs.module.css";

export const getStaticProps: GetStaticProps<{ articles: Article[] }> = async () => ({
  props: { articles: await getArticles() },
});

export default function BlogsPage({ articles }: { articles: Article[] }) {
  const [featured, ...rest] = articles;

  return (
    <>
      <Head>
        <title>Blogs | Dr. Anil Raheja</title>
        <meta
          name="description"
          content="Orthopedic health articles by Dr. Anil Raheja — joints, surgery and recovery."
        />
        <link rel="canonical" href={canonicalUrl("/blogs")} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(
              breadcrumbSchema([
                { name: "Home", path: "/" },
                { name: "Blogs", path: "/blogs" },
              ])
            ),
          }}
        />
      </Head>
      <PageHero
        eyebrow="Our Blog Posts"
        title="From the desk of Dr. Raheja"
        subtitle="Plain-language articles on bones, joints and getting back to movement."
        breadcrumb="Blogs"
      />
      <section className="section">
        <div className="container">
          {/* featured */}
          {featured && (
            <Reveal>
              <Link href={`/blogs/${featured.slug}`} className={styles.featured}>
                <div className={styles.featuredImg}>
                  <Image src={featured.image} alt={featured.title} fill sizes="(max-width: 900px) 100vw, 55vw" className={styles.cover} />
                </div>
                <div className={styles.featuredBody}>
                  <span className={styles.tag}>Featured · {featured.category}</span>
                  <h2>{featured.title}</h2>
                  <p>{featured.excerpt}</p>
                  <span className={styles.meta}>
                    <Clock width={14} height={14} /> {featured.readMins} min read
                  </span>
                  <span className={styles.readMore}>
                    Read article <ArrowRight width={16} height={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          {/* rest */}
          <div className={styles.grid}>
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08} as="article" className={styles.card}>
                <Link href={`/blogs/${post.slug}`} className={styles.img}>
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 900px) 100vw, 33vw" className={styles.cover} />
                </Link>
                <div className={styles.body}>
                  <span className={styles.tagSm}>{post.category}</span>
                  <h3>
                    <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                  <Link href={`/blogs/${post.slug}`} className={styles.readMoreSm}>
                    Read More <ArrowRight width={15} height={15} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <BookCta />
    </>
  );
}
