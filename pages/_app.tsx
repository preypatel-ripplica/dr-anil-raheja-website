import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { logo, site } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";
import "./globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
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
        <meta property="og:image" content={absoluteUrl("/images/43566-3.png")} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={site.title} />
        <meta name="twitter:description" content={site.description} />
        <meta name="twitter:image" content={absoluteUrl("/images/43566-3.png")} />
        <link rel="icon" href={logo.icon} type="image/svg+xml" />
      </Head>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
