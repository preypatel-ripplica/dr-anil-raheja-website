import { Html, Head, Main, NextScript, type DocumentContext } from "next/document";
import { getLocaleMeta, isLocale } from "@/lib/i18n";

type DocumentProps = { locale: string; dir: "ltr" | "rtl" };

function Document({ locale, dir }: DocumentProps) {
  return (
    <Html lang={locale} dir={dir}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await ctx.defaultGetInitialProps(ctx);
  const localeSegment = ctx.pathname.split("/")[1];
  const locale = isLocale(localeSegment) ? localeSegment : "en";
  const meta = getLocaleMeta(locale);
  return { ...initialProps, locale: meta.code, dir: meta.dir };
};

export default Document;
