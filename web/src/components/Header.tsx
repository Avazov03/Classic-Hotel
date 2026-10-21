import Link from "next/link";
import styles from "./Header.module.css";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/rooms", label: "Rooms" },
  { href: "/banquet", label: "Banquet" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Classic Hotel home">
          <span className={styles.mark} aria-hidden />
          Classic Hotel
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <a className={styles.phone} href="tel:8884567890">
            (888) 456 7890
          </a>
          <Link className={styles.book} href="/contact">
            Book now
          </Link>
          <button className={styles.menuBtn} type="button" aria-label="Open menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}