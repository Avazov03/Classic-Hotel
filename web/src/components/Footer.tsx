import Link from "next/link";
import { brandName, contact, footerTagline, navLinks } from "@/data/site";
import styles from "./Footer.module.css";

const more = [
  { href: "/amenities", label: "Amenities" },
  { href: "/spa", label: "SPA" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <div className={styles.brand}>
            <span className={styles.mark} aria-hidden />
            {brandName}
          </div>
          <p className={styles.blurb}>{footerTagline}</p>
        </div>

        <div>
          <div className={styles.colTitle}>Explore</div>
          <div className={styles.links}>
            {[...navLinks, ...more].map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className={styles.colTitle}>Contact</div>
          <div className={styles.links}>
            <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <span>{contact.address}</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">All rights reserved</div>
      </div>
    </footer>
  );
}