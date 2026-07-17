import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { articles, getArticle, articleSlugs, type Article, type Block } from "@/lib/blog";
import { treatments } from "@/lib/site";
import BookCta from "@/components/BookCta/BookCta";
import Reveal from "@/components/Motion/Reveal";
import ReadingProgress from "@/components/Article/ReadingProgress";
import SelfCheck from "@/components/Article/SelfCheck";
import { ArrowRight, Clock, Calendar } from "@/components/Icons";
import styles from "./article.module.css";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "lead":
      return <p className={styles.lead}>{block.text}</p>;
    case "p":
      return <p>{block.text}</p>;
    case "h":
      return (
        <h2 id={slugify(block.text)}>
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul>
          {block.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
  }
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export const getStaticPaths: GetStaticPaths = () => ({
  paths: articleSlugs.map((slug) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<{ article: Article }> = ({ params }) => {
  const article = getArticle(String(params?.slug ?? ""));

  if (!article) {
    return { notFound: true };
  }

  return { props: { article } };
};

export default function ArticlePage({ article }: { article: Article }) {
  const headings = article.body.filter((b) => b.type === "h") as Extract<Block, { type: "h" }>[];
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2);
  const relatedTreatment = treatments.find((t) => t.slug === article.related);

  return (
    <>
      <ReadingProgress />

      {/* header */}
      <header className={styles.head}>
        <div className={`container ${styles.headInner}`}>
          <Reveal>
            <nav className={styles.crumbs} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/blogs">Blogs</Link>
              <span>/</span>
              <span aria-current="page">{article.category}</span>
            </nav>
            <span className={styles.category}>{article.category}</span>
            <h1 className={styles.title}>{article.title}</h1>
            <div className={styles.meta}>
              <span><Calendar width={15} height={15} /> {fmtDate(article.date)}</span>
              <span><Clock width={15} height={15} /> {article.readMins} min read</span>
              <span className={styles.author}>By Dr. Anil Raheja</span>
            </div>
          </Reveal>
        </div>
      </header>

      {/* cover */}
      <div className="container">
        <Reveal className={styles.cover}>
          <Image
            src={article.image}
            alt={article.title}
            width={1120}
            height={560}
            className={styles.coverImg}
            priority
          />
        </Reveal>
      </div>

      {/* body + rail */}
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <aside className={styles.rail}>
            {headings.length > 1 && (
              <div className={styles.toc}>
                <span className={styles.tocTitle}>In this article</span>
                <ol>
                  {headings.map((h, i) => (
                    <li key={h.text}>
                      <a href={`#${slugify(h.text)}`}>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </aside>

          <article className={`prose ${styles.article}`}>
            {article.body.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}

            {/* interactive self-check */}
            <Reveal className={styles.checkWrap}>
              <SelfCheck data={article.selfCheck} relatedSlug={article.related} />
            </Reveal>

            {relatedTreatment && (
              <div className={styles.treatmentCta}>
                <div>
                  <span className={styles.tCtaLabel}>Related treatment</span>
                  <strong>{relatedTreatment.title}</strong>
                </div>
                <Link href={`/${relatedTreatment.slug}`} className="btn btn--primary">
                  Read more <ArrowRight width={16} height={16} />
                </Link>
              </div>
            )}

            <p className={styles.sourceLine}>
              Originally published on{" "}
              <a href={article.source} target="_blank" rel="noopener noreferrer">
                dranilraheja.com
              </a>
              .
            </p>
          </article>
        </div>
      </section>

      {/* related posts */}
      <section className={`section section--ice ${styles.relatedSec}`}>
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Keep reading</span>
            <h2>More from the desk</h2>
          </Reveal>
          <div className={styles.relatedGrid}>
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.08} as="article" className={styles.relatedCard}>
                <Link href={`/blogs/${r.slug}`} className={styles.relatedImg}>
                  <Image src={r.image} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" className={styles.cover} />
                </Link>
                <div className={styles.relatedBody}>
                  <span className={styles.relatedCat}>{r.category}</span>
                  <h3>
                    <Link href={`/blogs/${r.slug}`}>{r.title}</Link>
                  </h3>
                  <p>{r.excerpt.length > 100 ? r.excerpt.slice(0, 97).trimEnd() + "…" : r.excerpt}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BookCta defaultTreatment={article.related} />
    </>
  );
}
