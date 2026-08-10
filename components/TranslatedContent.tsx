"use client";

import { useEffect, useRef } from "react";
import memory from "@/.cache/translation-memory.json";
import { useI18n } from "@/lib/i18n-context";
import { translateText, type TranslationMemory } from "@/lib/i18n";
import { translateSharedText } from "@/lib/shared-i18n";

function translateTree(root: HTMLElement, translate: (value: string) => string) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) textNodes.push(node as Text);

  for (const textNode of textNodes) {
    const parent = textNode.parentElement;
    if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) continue;
    if (parent.closest("[data-no-translate], bdi")) continue;
    const value = textNode.nodeValue || "";
    const leading = value.match(/^\s*/)?.[0] || "";
    const trailing = value.match(/\s*$/)?.[0] || "";
    const core = value.slice(leading.length, value.length - trailing.length || undefined);
    const translated = translate(core);
    if (translated !== core) textNode.nodeValue = `${leading}${translated}${trailing}`;
  }

  isolateNumericElements(root);
  protectNumbersAndContacts(root);

  root.querySelectorAll<HTMLElement>("[alt], [title], [aria-label], [placeholder]").forEach((element) => {
    for (const attribute of ["alt", "title", "aria-label", "placeholder"]) {
      if (element.closest("[data-no-translate]")) continue;
      const value = element.getAttribute(attribute);
      if (value && !isProtectedValue(value)) element.setAttribute(attribute, translate(value));
    }
  });
}

function isProtectedValue(value: string) {
  return /(?:https?:\/\/|mailto:|tel:|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|\+?\d[\d\s().-]{6,}\d)/.test(value);
}

function protectNumbersAndContacts(root: HTMLElement) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) textNodes.push(node as Text);

  for (const textNode of textNodes) {
    const parent = textNode.parentElement;
    const value = textNode.nodeValue || "";
    if (!parent || !value.trim() || parent.closest("[data-no-translate], bdi")) continue;

    // Keep phone numbers and emails as one isolated unit. This prevents RTL
    // punctuation reordering without changing the surrounding layout.
    if (isProtectedValue(value)) {
      const bdi = document.createElement("bdi");
      bdi.dir = "ltr";
      bdi.style.unicodeBidi = "isolate";
      bdi.textContent = value;
      textNode.replaceWith(bdi);
      continue;
    }

    const tokenPattern = /(?<![\p{L}\p{N}])(?:\+?\d[\d,]*(?:[.-]\d+)*(?:\+)?)(?![\p{L}\p{N}])/gu;
    if (!tokenPattern.test(value)) continue;
    tokenPattern.lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let last = 0;
    for (const match of value.matchAll(tokenPattern)) {
      const index = match.index ?? 0;
      fragment.append(value.slice(last, index));
      const bdi = document.createElement("bdi");
      bdi.dir = "ltr";
      bdi.style.unicodeBidi = "isolate";
      bdi.textContent = match[0];
      fragment.append(bdi);
      last = index + match[0].length;
    }
    fragment.append(value.slice(last));
    textNode.replaceWith(fragment);
  }
}

function isolateNumericElements(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>(
    '[class*="statNum"], [class*="heroCardNum"], [class*="heroCardTop"] strong'
  ).forEach((element) => {
    element.dir = "ltr";
    element.style.unicodeBidi = "isolate";
  });

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node as Text;
    const value = text.nodeValue?.trim() || "";
    if (/^(?:\+?\d[\d,.-]*\+?|\+?\d[\d,.-]*\s+(?:years?|वर्ष|سال|лет))$/i.test(value)) {
      const parent = text.parentElement;
      if (parent) {
        parent.dir = "ltr";
        parent.style.unicodeBidi = "isolate";
      }
    }
  }
}

export default function TranslatedContent({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { locale } = useI18n();

  useEffect(() => {
    if (locale === "en" || !rootRef.current) return;
    const root = rootRef.current;
    const translate = (value: string) => {
      const translated = translateText(value, locale, memory as TranslationMemory);
      return translated === value ? translateSharedText(value, locale) : translated;
    };
    translateTree(root, translate);
    const observer = new MutationObserver(() => {
      observer.disconnect();
      translateTree(root, translate);
      observer.observe(root, { childList: true, subtree: true, characterData: true });
    });
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [locale]);

  return <div ref={rootRef} className="localized-content">{children}</div>;
}
