
export const DEFAULT_LOCALE = "en" as const;

export const LOCALES = [
  { code: "en", label: "English", nativeLabel: "English", dir: "ltr" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", dir: "ltr" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl" },
  { code: "ru", label: "Russian", nativeLabel: "Русский", dir: "ltr" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];
export type LocaleMeta = (typeof LOCALES)[number];
export const TARGET_LOCALES = LOCALES.filter(({ code }) => code !== DEFAULT_LOCALE);
export const LOCALE_CODES = LOCALES.map(({ code }) => code);

export type TranslationMemory = Record<string, Record<string, string>>;

export function getLocaleMeta(locale?: string): LocaleMeta {
  return LOCALES.find((item) => item.code === locale) ?? LOCALES[0];
}

export function isLocale(value: string): value is Locale {
  return LOCALE_CODES.includes(value as Locale);
}

export function normalizeTranslationText(value: unknown) {
  return String(value).replace(/\s+/g, " ").trim();
}

export function getTranslationKey(value: unknown) {
  return normalizeTranslationText(value);
}

export function loadTranslationMemory(): TranslationMemory {
  return {};
}

export function translateText(value: string, locale: Locale, memory = loadTranslationMemory()) {
  if (locale === DEFAULT_LOCALE) return value;
  const normalized = normalizeTranslationText(value)
    .replace(/&amp;/g, "&")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"');
  const entry = Object.values(memory).find((item) => normalizeTranslationText(item.en)
    .replace(/&amp;/g, "&")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"') === normalized);
  return entry?.[locale] || value;
}

export function stripLocaleFromPath(pathname = "/") {
  const [pathWithoutHash, hash = ""] = pathname.split("#");
  const [pathWithoutQuery, query = ""] = pathWithoutHash.split("?");
  const segments = pathWithoutQuery.split("/").filter(Boolean);
  if (segments.length && isLocale(segments[0]) && segments[0] !== DEFAULT_LOCALE) segments.shift();
  const barePath = `/${segments.join("/")}`.replace(/\/$/, "") || "/";
  return `${barePath}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
}

export function localizePath(pathname = "/", locale: Locale = DEFAULT_LOCALE) {
  if (!pathname || /^(https?:|mailto:|tel:|#)/.test(pathname)) return pathname;
  const basePath = stripLocaleFromPath(pathname);
  return locale === DEFAULT_LOCALE ? basePath : basePath === "/" ? `/${locale}` : `/${locale}${basePath}`;
}

export function localizedAbsolutePath(pathname: string, locale: Locale) {
  return localizePath(pathname, locale);
}
