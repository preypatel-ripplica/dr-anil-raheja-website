import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_LOCALE, localizePath, translateText, type Locale, type TranslationMemory } from "./i18n";
import { translateSharedText } from "./shared-i18n";

type I18nValue = {
  locale: Locale;
  t: (value: string) => string;
  localizeHref: (href: string) => string;
};

export const I18nContext = createContext<I18nValue>({
  locale: DEFAULT_LOCALE,
  t: (value) => value,
  localizeHref: (href) => href,
});

export function I18nProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const [memory, setMemory] = useState<TranslationMemory>({});

  useEffect(() => {
    if (locale === DEFAULT_LOCALE) return;
    import("@/.cache/translation-memory.json").then((module) => setMemory(module.default as TranslationMemory));
  }, [locale]);

  const value: I18nValue = {
    locale,
    t: (text) => {
      const translated = translateText(text, locale, memory);
      return translated === text ? translateSharedText(text, locale) : translated;
    },
    localizeHref: (href) => localizePath(href, locale),
  };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
