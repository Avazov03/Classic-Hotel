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

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Original Webflow behavior: sticky "ABOUT THE HOTEL", then 3 pill images
 * rise from bottom to top one-by-one as the user scrolls the 250vh track.
 */
export function HomeAboutScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      return;
    }

    let frame = 0;

    function update() {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(1);
        return;
      }
      const scrolled = clamp(-rect.top / total);
      setProgress(scrolled);
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Sequential rises with a short handoff overlap so the next capsule tip peeks (baseline).
  const ranges = [
    { start: 0.0, end: 0.26 },
    { start: 0.24, end: 0.52 },
    { start: 0.5, end: 0.78 },
  ];

  // 140% keeps idle pills fully below the sticky viewport (110% still peeked).
  const pillY = ranges.map(({ start, end }) => {
    const t = clamp((progress - start) / (end - start));
    const eased = 1 - (1 - t) ** 3;
    return (1 - eased) * 140;
  });

  // Body + CTA reveal near the end of the third rise
  const copyReady = progress > 0.72;

  return (
    <section className={styles.section} aria-label="About the hotel">
      <div className={styles.track} ref={trackRef}>
        <div className={styles.sticky}>
          <h2 className={styles.eyebrow}>{homeAbout.eyebrow}</h2>

          <div className={styles.stack}>
            {STAGES.map((stage, i) => (
              <div
                key={stage.title}
                className={styles.pill}
                style={{
                  zIndex: i + 1,
                  transform: `translate3d(0, ${pillY[i]}%, 0)`,
                }}
              >
                <Image
                  src={stage.image}
                  alt={stage.title}
                  fill
                  sizes="(max-width: 767px) 78vw, 26rem"
                  priority={i === 0}
                />
                <div className={styles.caption}>{stage.title}</div>
              </div>
            ))}
          </div>

          <div
            className={`${styles.copy} ${
              copyReady ? styles.copyVisible : styles.copyHidden
            }`}
          >
            <p className={styles.body}>{homeAbout.body}</p>
            <Link className={styles.cta} href={homeAbout.ctaHref}>
              {homeAbout.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}