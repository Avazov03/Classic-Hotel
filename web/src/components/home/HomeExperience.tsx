import Image from "next/image";
import Link from "next/link";
import { homeExperience } from "@/data/home";
import styles from "./HomeExperience.module.css";

export function HomeExperience() {
  return (
    <section className={styles.section} aria-labelledby="experience-heading">
      <div className={`container ${styles.grid}`}>
        <div>
          <div className={styles.eyebrow}>{homeExperience.eyebrow}</div>
          <h2 id="experience-heading" className={styles.title}>
            {homeExperience.title}
          </h2>
          <div className={styles.list}>
            {homeExperience.items.map((item) => (
              <article key={item.title} className={styles.item}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <Link className={styles.cta} href={homeExperience.ctaHref}>
            {homeExperience.cta}
          </Link>
        </div>

        <div className={styles.media}>
          {homeExperience.images.map((src, i) => (
            <figure key={src}>
              <Image
                src={src}
                alt={i === 0 ? "Guest arrival lounge" : "Hotel corridor"}
                width={720}
                height={500}
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}