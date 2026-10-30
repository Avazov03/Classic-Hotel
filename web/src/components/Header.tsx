"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { brandName, contact, navLinks } from "@/data/site";
import styles from "./Header.module.css";

const extraLinks = [
  { href: "/amenities", label: "Qulayliklar" },
  { href: "/spa", label: "Bog‘ va teras" },
  { href: "/restaurant", label: "Restoran" },
  { href: "/contact", label: "Aloqa" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link
          href="/"
          className={styles.brand}
          aria-label={`${brandName} bosh sahifa`}
          onClick={() => setOpen(false)}
        >
          <span className={styles.mark} aria-hidden />
          {brandName}
        </Link>

        <nav className={styles.nav} aria-label="Asosiy menyu">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <a className={styles.phone} href={contact.phoneHref}>
            {contact.phoneDisplay}
          </a>
          <Link className={styles.book} href="/contact">
            Bron qilish
          </Link>
          <button
            className={`${styles.menuBtn} ${open ? styles.menuOpen : ""}`}
            type="button"
            aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {open ? (
        <div className={styles.drawer} role="dialog" aria-label="Mobil menyu">
          <nav className={styles.drawerNav}>
            {[...navLinks, ...extraLinks].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a className={styles.drawerPhone} href={contact.phoneHref}>
            {contact.phoneDisplay}
          </a>
          <Link
            className={styles.drawerBook}
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Bron qilish
          </Link>
        </div>
      ) : null}
    </header>
  );
}