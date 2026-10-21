import Image from "next/image";
import Link from "next/link";
import { homeCta } from "@/data/home";
import styles from "./HomeCta.module.css";

export function HomeCta() {
  return (
    <section className={styles.section} aria-labelledby="cta-heading">
      <div className={styles.bg}>
        <Image
          src={homeCta.image}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className={styles.shade} />
      </div>
      <div className={`container ${styles.content}`}>
        <h2 id="cta-heading">{homeCta.title}</h2>
        <Link className={styles.cta} href={homeCta.ctaHref}>
          {homeCta.cta}
        </Link>
      </div>
    </section>
  );
}