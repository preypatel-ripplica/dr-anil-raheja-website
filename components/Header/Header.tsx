"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { nav, contact, site } from "@/lib/site";
import { Phone, Mail, Chevron, Menu, Close, ArrowRight } from "@/components/Icons";
import styles from "./Header.module.css";

export default function Header() {
  const router = useRouter();
  const pathname = router.asPath.split(/[?#]/)[0] || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href !== "#" && (pathname === href || (href !== "/" && pathname.startsWith(href)));

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      {/* Top utility bar */}
      <div className={styles.topbar}>
        <div className={`container ${styles.topInner}`}>
          <span className={styles.topNote}>
            {site.credentials} · 28+ years · 12,000+ surgeries
          </span>
          <div className={styles.topContact}>
            <a href={`tel:${contact.phonePrimary}`} className={styles.topItem}>
              <Phone width={14} height={14} />
              <span>{contact.phoneDisplay}</span>
            </a>
            <a href={`mailto:${contact.email}`} className={styles.topItem}>
              <Mail width={14} height={14} />
              <span>{contact.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className={styles.mainbar}>
        <div className={`container ${styles.mainInner}`}>
          <Link href="/" className={styles.brand} aria-label="Dr. Anil Raheja — Home">
            <span className={styles.brandMark}>AR</span>
            <span className={styles.brandText}>
              <strong>Dr. Anil Raheja</strong>
              <small>Orthopedic Surgeon</small>
            </span>
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            <ul>
              {nav.map((item) =>
                item.children ? (
                  <li key={item.label} className={styles.hasChildren}>
                    <button type="button" className={styles.navLink}>
                      {item.label}
                      <Chevron width={15} height={15} className={styles.caret} />
                    </button>
                    <ul className={styles.dropdown}>
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className={isActive(c.href) ? styles.activeSub : ""}>
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`${styles.navLink} ${isActive(item.href) ? styles.active : ""}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          <Link href="/contact-us" className={`btn btn--primary ${styles.cta}`}>
            Book Appointment
          </Link>

          <button
            type="button"
            className={styles.burger}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Menu width={26} height={26} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}>
        <div className={styles.drawerHead}>
          <span>Menu</span>
          <button type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
            <Close width={24} height={24} />
          </button>
        </div>
        <nav aria-label="Mobile">
          <ul className={styles.mobileNav}>
            {nav.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    type="button"
                    className={styles.mobileToggle}
                    aria-expanded={openGroup === item.label}
                    onClick={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
                  >
                    {item.label}
                    <Chevron
                      width={18}
                      height={18}
                      style={{
                        transform: openGroup === item.label ? "rotate(180deg)" : "none",
                        transition: "transform .2s",
                      }}
                    />
                  </button>
                  {openGroup === item.label && (
                    <ul className={styles.mobileSub}>
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href}>{c.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className={isActive(item.href) ? styles.active : ""}>
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
          <Link href="/contact-us" className="btn btn--primary" style={{ width: "100%", marginTop: 20 }}>
            Book Appointment <ArrowRight width={18} height={18} />
          </Link>
        </nav>
      </div>
      {open && <div className={styles.backdrop} onClick={() => setOpen(false)} />}
    </header>
  );
}
