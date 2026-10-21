"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { homeAbout } from "@/data/home";
import styles from "./HomeAboutScroll.module.css";

const STAGES = homeAbout.titles.map((title, i) => ({
  title,
  image: homeAbout.images[i],
}));

export function HomeAboutScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let frame = 0;

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = trackRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        if (total <= 0) return;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const progress = scrolled / total;
        // 3 stages across the sticky scroll distance
        const next = Math.min(2, Math.floor(progress * 3));
        setActive((prev) => (prev === next ? prev : next));
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className={styles.section} aria-label="About the hotel">
      <div className={styles.track} ref={trackRef}>
        <div className={styles.sticky}>
          <h2 className={styles.eyebrow}>{homeAbout.eyebrow}</h2>

          <div className={styles.pillWrap}>
            {STAGES.map((stage, i) => (
              <div
                key={stage.title}
                className={`${styles.slide} ${
                  i === active ? styles.slideActive : styles.slideInactive
                }`}
              >
                <Image
                  src={stage.image}
                  alt={stage.title}
                  fill
                  sizes="(max-width: 767px) 72vw, 28rem"
                  priority={i === 0}
                />
              </div>
            ))}
            <div className={styles.caption}>{STAGES[active].title}</div>
          </div>

          <p className={styles.body}>{homeAbout.body}</p>

          <Link className={styles.cta} href={homeAbout.ctaHref}>
            {homeAbout.cta}
          </Link>

          <div className={styles.progress} aria-hidden>
            {STAGES.map((stage, i) => (
              <span
                key={stage.title}
                className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}