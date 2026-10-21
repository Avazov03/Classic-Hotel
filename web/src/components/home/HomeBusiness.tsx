import Image from "next/image";
import Link from "next/link";
import { homeBusiness } from "@/data/home";
import styles from "./HomeBusiness.module.css";

export function HomeBusiness() {
  return (
    <section className={styles.section} aria-labelledby="business-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <h2 id="business-heading">{homeBusiness.title}</h2>
          <p>{homeBusiness.body}</p>
          <Link className={styles.cta} href={homeBusiness.ctaHref}>
            {homeBusiness.cta}
          </Link>
        </div>

        <div className={styles.media}>
          {homeBusiness.images.map((src, i) => (
            <figure key={src}>
              <Image
                src={src}
                alt={i === 0 ? "Conference hall" : "Event space"}
                width={560}
                height={700}
                sizes="(max-width: 900px) 50vw, 28vw"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}