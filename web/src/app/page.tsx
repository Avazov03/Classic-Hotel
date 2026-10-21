import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <section className={styles.hero} aria-label="Hero">
        <div className={`container ${styles.content}`}>
          <div className={styles.eyebrow}>Indulge in elevated hospitality</div>
          <h1 className={styles.title}>
            Your perfect escape for luxury comfort and peace
          </h1>
          <Link className={styles.cta} href="/contact">
            Reserve your stay
          </Link>
        </div>
      </section>

      <section className={styles.note}>
        <div className="container">
          <h2>Next.js foundation is live</h2>
          <p>
            Design DNA (colors, fonts, marquee, header/footer, hero motion) is
            preserved. Full Home One parity — rooms, gallery, lightbox — comes
            next on this branch without touching the static baseline.
          </p>
        </div>
      </section>
    </>
  );
}