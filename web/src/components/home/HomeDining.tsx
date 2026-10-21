import Image from "next/image";
import { homeDining } from "@/data/home";
import styles from "./HomeDining.module.css";

export function HomeDining() {
  return (
    <section className={styles.section} aria-labelledby="dining-heading">
      <div className="container">
        <div className={styles.layout}>
          <div>
            <div className={styles.eyebrow}>{homeDining.eyebrow}</div>
            <h2 id="dining-heading" className={styles.title}>
              {homeDining.title}
            </h2>
            <div className={styles.tags}>
              {homeDining.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.gallery}>
            {homeDining.images.map((src, i) => (
              <figure key={src}>
                <Image
                  src={src}
                  alt={`Dining moment ${i + 1}`}
                  width={560}
                  height={448}
                  sizes="(max-width: 900px) 50vw, 28vw"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}