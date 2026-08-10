import type { AppProps } from "next/app";
import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { logo, site } from "@/lib/site";
import { absoluteUrl, setSeoLocale } from "@/lib/seo";
import { getLocaleMeta, isLocale, type Locale } from "@/lib/i18n";
import { I18nProvider } from "@/lib/i18n-context";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-DNQW1XD1E0";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const routeLocale = router.asPath.split(/[/?#]/)[1];
  const locale = (isLocale(routeLocale || "") ? routeLocale : "en") as Locale;
  const localeMeta = getLocaleMeta(locale);
  setSeoLocale(locale);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.gtag?.("config", GA_MEASUREMENT_ID, {
        page_path: url,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    document.documentElement.lang = localeMeta.code;
    document.documentElement.dir = localeMeta.dir;
  }, [localeMeta.code, localeMeta.dir]);

  return (
    <I18nProvider locale={locale}>
      <>
      <Head>
        <title>{site.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="description" content={site.description} />
        <meta property="og:title" content={site.title} />
        <meta property="og:description" content={site.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={site.url} />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:image" content={absoluteUrl("/images/optimized/dr-anil-raheja-hero-900.png")} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={site.title} />
        <meta name="twitter:description" content={site.description} />
        <meta name="twitter:image" content={absoluteUrl("/images/optimized/dr-anil-raheja-hero-900.png")} />
        <link rel="icon" href={logo.icon} type="image/svg+xml" />
      </Head>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
      </>
    </I18nProvider>
  );
}
