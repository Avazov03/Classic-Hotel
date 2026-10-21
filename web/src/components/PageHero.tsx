import Image from "next/image";
import type { PageIntro } from "@/data/pages";
import styles from "./PageHero.module.css";

type Props = {
  page: PageIntro;
};

export function PageHero({ page }: Props) {
  return (
    <section className={styles.hero} aria-label={page.title}>
      <div className={styles.bg}>
        <Image
          src={page.image}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className={styles.shade} />
      </div>
      <div className={`container ${styles.content}`}>
        {page.eyebrow ? <div className={styles.eyebrow}>{page.eyebrow}</div> : null}
        <h1 className={styles.title}>{page.title}</h1>
        {page.subtitle ? <p className={styles.subtitle}>{page.subtitle}</p> : null}
      </div>
    </section>
  );
}