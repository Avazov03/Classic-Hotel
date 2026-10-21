import Image from "next/image";
import Link from "next/link";
import { homeGallery } from "@/data/home";
import styles from "./HomeGallery.module.css";

export function HomeGallery() {
  return (
    <section id="gallery" className={styles.section} aria-labelledby="gallery-heading">
      <div className="container">
        <div className={styles.head}>
          <div>
            <h2 id="gallery-heading">Our Gallery</h2>
            <p className={styles.sub}>
              A visual journey through our finest moments and experiences
            </p>
          </div>
          <Link className={styles.more} href="/rooms">
            Explore more
          </Link>
        </div>

        <div className={styles.track}>
          {homeGallery.map((item) => (
            <figure key={item.label} className={styles.card}>
              <Image
                src={item.src}
                alt={item.label}
                width={480}
                height={640}
                sizes="(max-width: 768px) 60vw, 22vw"
              />
              <figcaption className={styles.label}>{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}