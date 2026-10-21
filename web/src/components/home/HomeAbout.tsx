"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { homeAbout } from "@/data/home";
import styles from "./HomeAbout.module.css";

export function HomeAbout() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTitleIndex((i) => (i + 1) % homeAbout.titles.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className={styles.section} aria-labelledby="about-heading">
      <div className={`container ${styles.grid}`}>
        <div>
          <div className={styles.eyebrow}>{homeAbout.eyebrow}</div>
          <h2 id="about-heading" className={styles.title}>
            {homeAbout.titles[titleIndex]}
          </h2>
          <p className={styles.body}>{homeAbout.body}</p>
          <Link className={styles.cta} href={homeAbout.ctaHref}>
            {homeAbout.cta}
          </Link>
        </div>

        <div className={styles.collage}>
          <div className={styles.main}>
            <Image
              className={styles.mainImg}
              src={homeAbout.images[0]}
              alt="Hotel exterior overlooking the water"
              width={720}
              height={900}
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </div>
          <div className={styles.side}>
            <Image
              className={styles.sideImg}
              src={homeAbout.images[1]}
              alt="Hotel lounge detail"
              width={480}
              height={360}
              sizes="(max-width: 900px) 50vw, 22vw"
            />
          </div>
          <div className={styles.side}>
            <Image
              className={styles.sideImg}
              src={homeAbout.images[2]}
              alt="Guest room atmosphere"
              width={480}
              height={360}
              sizes="(max-width: 900px) 50vw, 22vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}