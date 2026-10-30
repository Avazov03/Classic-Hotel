import Link from "next/link";
import { brandName, contact, footerTagline, navLinks } from "@/data/site";
import styles from "./Footer.module.css";

const more = [
  { href: "/amenities", label: "Qulayliklar" },
  { href: "/spa", label: "Bog‘ va teras" },
  { href: "/restaurant", label: "Restoran" },
  { href: "/contact", label: "Aloqa" },
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
          <div className={styles.colTitle}>Kashf eting</div>
          <div className={styles.links}>
            {[...navLinks, ...more].map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className={styles.colTitle}>Aloqa</div>
          <div className={styles.links}>
            <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <span>{contact.address}</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">Barcha huquqlar himoyalangan.</div>
      </div>
    </footer>
  );
}