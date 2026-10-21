import Image from "next/image";
import { homeStats } from "@/data/home";
import styles from "./HomeStats.module.css";

export function HomeStats() {
  return (
    <section className={styles.section} aria-label="Hotel highlights">
      <div className="container">
        <p className={styles.intro}>{homeStats.intro}</p>

        <div className={styles.grid}>
          {homeStats.items.map((item) => (
            <div key={item.label} className={styles.stat}>
              <div className={styles.value}>{item.value}</div>
              <div className={styles.label}>{item.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.photos}>
          {homeStats.images.map((src, i) => (
            <figure key={src}>
              <Image
                src={src}
                alt={`Hotel amenity ${i + 1}`}
                width={480}
                height={360}
                sizes="(max-width: 700px) 50vw, 25vw"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}