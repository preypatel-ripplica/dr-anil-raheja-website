import type { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import HomePage from "@/pages/index";
import AboutPage from "@/pages/about-us";
import BlogsPage from "@/pages/blogs";
import ArticlePage from "@/pages/blogs/[slug]";
import ContactPage from "@/pages/contact-us";
import VideosPage from "@/pages/our-videos";
import TestimonialsPage from "@/pages/patient-testimonials";
import GalleryPage from "@/pages/photo-gallery";
import TreatmentPage from "@/components/TreatmentPage/TreatmentPage";
import { getArticles, getTreatments, getTreatment, getTreatmentSummaries, getVideos } from "@/lib/cms";
import { toArticleSummary } from "@/lib/blog";
import { I18nProvider } from "@/lib/i18n-context";
import { type Locale } from "@/lib/i18n";
import { absoluteUrl, absoluteUrlForLocale, setSeoLocale } from "@/lib/seo";
import TranslatedContent from "@/components/TranslatedContent";

const fixedRoutes = [[], ["about-us"], ["blogs"], ["contact-us"], ["our-videos"], ["patient-testimonials"], ["photo-gallery"]];

export async function getLocalizedPaths(locale: Locale) {
  const articles = await getArticles();
  const treatments = await getTreatments();
  return [
    ...fixedRoutes.map((path) => ({ params: { path } })),
    ...articles.map((article) => ({ params: { path: ["blogs", article.slug] } })),
    ...Object.keys(treatments).map((slug) => ({ params: { path: ["treatment", slug] } })),
  ].map((item) => ({ ...item, params: { ...item.params, locale } }));
}

export async function getLocalizedProps(locale: Locale, context: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> {
  const path = Array.isArray(context.params?.path) ? context.params.path : [];
  const route = path.join("/");
  if (!route) {
    const [articles, videos, treatments] = await Promise.all([getArticles(), getVideos(), getTreatmentSummaries()]);
    return { props: { locale, page: "home", pageProps: { blogPosts: articles.map(toArticleSummary), featureVideos: videos.featured, treatments }, seoPath: "/" } };
  }
  if (route === "about-us") return { props: { locale, page: "about", seoPath: "/about-us" } };
  if (route === "blogs") {
    return { props: { locale, page: "blogs", pageProps: { articles: (await getArticles()).map(toArticleSummary) }, seoPath: "/blogs" } };
  }
  if (route.startsWith("blogs/")) {
    const articles = await getArticles();
    const article = articles.find((item) => item.slug === path[1]);
    if (!article) return { notFound: true };
    return { props: { locale, page: "article", pageProps: { article, related: articles.filter((item) => item.slug !== article.slug).slice(0, 2).map(toArticleSummary) }, seoPath: `/blogs/${path[1]}` } };
  }
  if (route === "contact-us") return { props: { locale, page: "contact", seoPath: "/contact-us" } };
  if (route === "our-videos") {
    return { props: { locale, page: "videos", pageProps: await getVideos(), seoPath: "/our-videos" } };
  }
  if (route === "patient-testimonials") {
    return { props: { locale, page: "testimonials", pageProps: { featureVideos: (await getVideos()).featured }, seoPath: "/patient-testimonials" } };
  }
  if (route === "photo-gallery") return { props: { locale, page: "gallery", seoPath: "/photo-gallery" } };

  const slug = path[path.length - 1];
  const [content, treatments] = await Promise.all([getTreatment(slug), getTreatmentSummaries()]);
  if (!content) return { notFound: true };
  return { props: { locale, page: "treatment", pageProps: { content, treatments }, seoPath: `/treatment/${slug}` } };
}

export default function LocalizedPage({ locale, page, pageProps, seoPath }: any) {
  const router = useRouter();
  const activeLocale = (router.query.locale || locale) as Locale;
  setSeoLocale(activeLocale);
  const component = page === "home" ? <HomePage {...(pageProps || {})} /> :
    page === "about" ? <AboutPage /> : page === "blogs" ? <BlogsPage {...pageProps} /> :
    page === "article" ? <ArticlePage {...pageProps} /> : page === "contact" ? <ContactPage /> :
    page === "videos" ? <VideosPage {...pageProps} /> : page === "testimonials" ? <TestimonialsPage {...pageProps} /> :
    page === "gallery" ? <GalleryPage /> : <TreatmentPage {...pageProps} />;

  return <I18nProvider locale={activeLocale}>
    <Head>
      <link rel="alternate" hrefLang="en" href={absoluteUrlForLocale(seoPath, "en")} />
      <link rel="alternate" hrefLang="hi" href={absoluteUrlForLocale(seoPath, "hi")} />
      <link rel="alternate" hrefLang="ar" href={absoluteUrlForLocale(seoPath, "ar")} />
      <link rel="alternate" hrefLang="ru" href={absoluteUrlForLocale(seoPath, "ru")} />
      <link rel="alternate" hrefLang="x-default" href={absoluteUrlForLocale(seoPath, "en")} />
    </Head>
    <TranslatedContent>{component}</TranslatedContent>
  </I18nProvider>;
}
