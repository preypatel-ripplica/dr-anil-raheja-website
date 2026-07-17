"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

/**
 * Reveal-on-scroll wrapper. Adds `.is-visible` when the element enters the
 * viewport; CSS in globals.css handles the fade/slide. `delay` staggers
 * children (seconds). Respects prefers-reduced-motion via CSS.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "span" | "article";
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error — polymorphic ref is fine at runtime
      ref={ref}
      data-reveal
      className={className}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
