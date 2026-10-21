import Link from "next/link";
import { homeHero } from "@/data/home";
import styles from "./HomeHero.module.css";

export function HomeHero() {
  return (
    <section className={styles.hero} aria-label="Bosh banner">
      <div className={styles.media}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={homeHero.poster}
          aria-hidden
        >
          <source src={homeHero.videoWebm} type="video/webm" />
          <source src={homeHero.videoMp4} type="video/mp4" />
        </video>
        <div className={styles.shade} />
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.offer}>{homeHero.offer}</div>
        <h1 className={styles.title}>{homeHero.title}</h1>
        <Link className={styles.cta} href={homeHero.ctaHref}>
          {homeHero.cta}
        </Link>
      </div>
    </section>
  );
}