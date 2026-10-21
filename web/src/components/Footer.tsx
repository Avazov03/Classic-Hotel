import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <div className={styles.brand}>
            <span className={styles.mark} aria-hidden />
            Classic Hotel
          </div>
          <p className={styles.blurb}>
            We create unforgettable stay experiences by blending comfort,
            thoughtful care, and warm, genuine hospitality that makes every
            guest feel truly valued.
          </p>
        </div>

        <div>
          <div className={styles.colTitle}>Explore</div>
          <div className={styles.links}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/rooms">Rooms</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <div className={styles.colTitle}>Contact</div>
          <div className={styles.links}>
            <a href="tel:8884567890">(888) 456 7890</a>
            <a href="mailto:info@example.com">info@example.com</a>
            <span>410 Sandtown, California 94001, USA</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">All rights reserved</div>
      </div>
    </footer>
  );
}