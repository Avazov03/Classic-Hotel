"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { homeAbout } from "@/data/home";
import type { Locale } from "@/i18n/locale";
import { t } from "@/i18n/translate";
import {
  BLUR1_OP,
  BLUR2_OP,
  BLUR3_OP,
  COPY_BLUR,
  COPY_OP,
  COPY_Y,
  ONE_S,
  ONE_Y,
  sample,
  THREE_Y,
  TWO_S,
  TWO_Y,
} from "./aboutIx2Keyframes";

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n));
}

function pillTransform(y: number, s: number) {
  return `translate3d(0, ${y}%, 0) scale3d(${s}, ${s}, 1)`;
}

/**
 * Phase 1 — "ABOUT THE HOTEL" slowly clears (blur → sharp) while the
 * rounded white panel rises over the sticky hero. Pills stay parked below
 * until this finishes (matches original sequencing the user described).
 */
function titleReveal(aboutTop: number, vh: number) {
  // Pastdan silliq chiqish — scroll oralig‘i kengroq, blur kamroq
  const start = vh * 0.95;
  const end = vh * 0.28;
  const t = clamp((start - aboutTop) / (start - end || 1));
  // smoothstep for softer rise
  const eased = t * t * (3 - 2 * t);
  return {
    opacity: Math.min(1, eased * 1.05),
    y: (1 - eased) * 110,
    blur: (1 - eased) * 3,
    done: eased >= 0.98,
  };
}

/** While title is still revealing, keep pills mostly below the fold. */
const PILL_HOLD_Y = { one: 62, two: 130, three: 215 } as const;

/**
 * React port of Webflow IX2 About scroll — keyframes measured from baseline.
 * Transforms applied imperatively (like IX2) to avoid React render lag on scroll.
 */
export function HomeAboutScroll({ locale }: { locale: Locale }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const oneRef = useRef<HTMLDivElement>(null);
  const twoRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<HTMLDivElement>(null);
  const blur1Ref = useRef<HTMLDivElement>(null);
  const blur2Ref = useRef<HTMLDivElement>(null);
  const blur3Ref = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const copyInnerRef = useRef<HTMLDivElement>(null);
  const copyCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    /** ScrollY when title finished — pill chapter starts from here. */
    let pillOriginY: number | null = null;

    function apply(progress: number, aboutTop: number, titleDone: boolean) {
      const title = titleReveal(aboutTop, window.innerHeight);

      // Pill chapter only after title has fully cleared
      const oneY = titleDone
        ? sample(ONE_Y, progress)
        : PILL_HOLD_Y.one;
      const oneS = titleDone ? sample(ONE_S, progress) : 1;
      const twoY = titleDone ? sample(TWO_Y, progress) : PILL_HOLD_Y.two;
      const twoS = titleDone ? sample(TWO_S, progress) : 1;
      const threeY = titleDone
        ? sample(THREE_Y, progress)
        : PILL_HOLD_Y.three;

      if (oneRef.current) {
        oneRef.current.style.transform = pillTransform(oneY, oneS);
      }
      if (twoRef.current) {
        twoRef.current.style.transform = pillTransform(twoY, twoS);
      }
      if (threeRef.current) {
        threeRef.current.style.transform = pillTransform(threeY, 1);
      }
      if (titleRef.current) {
        titleRef.current.style.opacity = String(title.opacity);
        titleRef.current.style.transform = `translate3d(0, ${title.y}px, 0)`;
        titleRef.current.style.filter = `blur(${title.blur}px)`;
      }
      if (blur1Ref.current) {
        blur1Ref.current.style.opacity = String(
          titleDone ? sample(BLUR1_OP, progress) : 0.31,
        );
      }
      if (blur2Ref.current) {
        blur2Ref.current.style.opacity = String(
          titleDone ? sample(BLUR2_OP, progress) : 1,
        );
      }
      if (blur3Ref.current) {
        blur3Ref.current.style.opacity = String(
          titleDone ? sample(BLUR3_OP, progress) : 1,
        );
      }
      if (copyRef.current) {
        const y = titleDone ? sample(COPY_Y, progress) : 40;
        const blur = titleDone ? sample(COPY_BLUR, progress) : 4;
        copyRef.current.style.transform = `translate3d(0, ${y}%, 0)`;
        copyRef.current.style.filter = `blur(${blur}px)`;
      }
      const copyOp = titleDone ? sample(COPY_OP, progress) : 0;
      if (copyInnerRef.current) {
        copyInnerRef.current.style.opacity = String(copyOp);
      }
      if (copyCtaRef.current) {
        copyCtaRef.current.style.opacity = String(copyOp);
      }
    }

    function update() {
      const aboutEl = trackRef.current?.closest(
        ".rt-about-v1",
      ) as HTMLElement | null;
      const aboutTop =
        aboutEl?.getBoundingClientRect().top ?? window.innerHeight;
      const title = titleReveal(aboutTop, window.innerHeight);

      if (reduce) {
        pillOriginY = window.scrollY;
        apply(1, 0, true);
        return;
      }

      if (title.done) {
        if (pillOriginY === null) pillOriginY = window.scrollY;
      } else {
        // Scrolling back up — reset pill chapter so sequence replays
        pillOriginY = null;
      }

      const el = trackRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        apply(1, aboutTop, true);
        return;
      }

      const pillProgress =
        pillOriginY === null
          ? 0
          : clamp((window.scrollY - pillOriginY) / total);

      apply(pillProgress, aboutTop, title.done);
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

  const stages = homeAbout.titles.map((title, i) => ({
    title: t(title, locale),
    image: homeAbout.images[i],
  }));

  // Start with pills held below — title reveals first
  const initOne = pillTransform(PILL_HOLD_Y.one, 1);
  const initTwo = pillTransform(PILL_HOLD_Y.two, 1);
  const initThree = pillTransform(PILL_HOLD_Y.three, 1);

  return (
    <section
      className="rt-about-v1 rt-position-relative"
      aria-label={t(homeAbout.eyebrow, locale)}
      data-react-about="ix2-port"
    >
      <div className="w-layout-blockcontainer rt-container w-container">
        <div className="rt-about-v1-main-wrapper" ref={trackRef}>
          <div className="rt-about-v1-sticky">
            <div className="rt-text-center rt-overflow-hidden">
              <div
                ref={titleRef}
                className="rt-big-text-one rt-text-beige"
                style={{
                  opacity: 0,
                  filter: "blur(3px)",
                  transform: "translate3d(0, 110px, 0)",
                  willChange: "opacity, transform, filter",
                }}
              >
                {t(homeAbout.eyebrow, locale)}
              </div>
            </div>

            <div className="rt-about-v1-image-main-wrapper">
              <div className="rt-about-v1-image-main rt-landscape-display-none">
                <div
                  ref={oneRef}
                  className="rt-position-relative rt-about-v1-image-one-wrapper"
                  style={{
                    transform: initOne,
                    willChange: "transform",
                    zIndex: 1,
                  }}
                >
                  <div className="rt-about-v1-image-one-wrapper">
                    <Image
                      src={stages[0].image}
                      alt={stages[0].title}
                      width={820}
                      height={1100}
                      className="rt-radius-200"
                      sizes="(max-width: 479px) 100vw, 26rem"
                      priority
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                  <div className="rt-about-v1-image-overlay-box rt-landscape-text-center">
                    <div className="rt-text-style-h4 rt-text-white">
                      {stages[0].title}
                    </div>
                  </div>
                  <div
                    ref={blur1Ref}
                    className="rt-about-v1-image-blur rt-v1 rt-tab-display-off"
                    style={{ opacity: 0.31 }}
                  />
                </div>

                <div
                  ref={twoRef}
                  className="rt-about-v1-image-two-wrapper"
                  style={{
                    transform: initTwo,
                    willChange: "transform",
                    zIndex: 2,
                  }}
                >
                  <div className="rt-about-v1-image-one-wrapper">
                    <Image
                      src={stages[1].image}
                      alt={stages[1].title}
                      width={820}
                      height={1100}
                      className="rt-radius-200"
                      sizes="(max-width: 479px) 100vw, 26rem"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                  <div className="rt-about-v1-image-overlay-box rt-landscape-text-center">
                    <div className="rt-text-style-h4 rt-text-white">
                      {stages[1].title}
                    </div>
                  </div>
                  <div
                    ref={blur2Ref}
                    className="rt-about-v1-image-blur rt-v2 rt-tab-display-off"
                    style={{ opacity: 1 }}
                  />
                </div>

                <div
                  ref={threeRef}
                  className="rt-about-v1-image-three-wrapper"
                  style={{
                    transform: initThree,
                    willChange: "transform",
                    zIndex: 3,
                  }}
                >
                  <div className="rt-about-v1-image-one-wrapper">
                    <Image
                      src={stages[2].image}
                      alt={stages[2].title}
                      width={820}
                      height={1100}
                      className="rt-radius-200"
                      sizes="(max-width: 479px) 100vw, 26rem"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                  <div className="rt-about-v1-image-overlay-box rt-landscape-text-center">
                    <div className="rt-text-style-h4 rt-text-white">
                      {stages[2].title}
                    </div>
                  </div>
                  <div
                    ref={blur3Ref}
                    className="rt-about-v1-image-blur rt-v3 rt-tab-display-off"
                    style={{ opacity: 1 }}
                  />
                </div>
              </div>
            </div>

            <div
              ref={copyRef}
              className="w-layout-vflex rt-about-bottom-text"
              style={{
                filter: "blur(4px)",
                transform: "translate3d(0, 40%, 0)",
                willChange: "filter, transform",
              }}
            >
              <div
                ref={copyInnerRef}
                className="rt-overflow-hidden rt-position-relative rt-text-center rt-h2-to-button-gap"
                style={{ opacity: 0 }}
              >
                <h2 className="rt-gap-off rt-about-v1-heading">
                  {t(homeAbout.body, locale)}
                </h2>
              </div>
              <div ref={copyCtaRef} style={{ opacity: 0 }}>
                <Link
                  href={homeAbout.ctaHref}
                  className="rt-button rt-overflow-hidden w-inline-block"
                  data-wf--rt-button-v3--variant="rt-v2"
                >
                  <div className="rt-position-relative rt-overflow-hidden">
                    <div className="rt-button-text rt-text-one">
                      {t(homeAbout.cta, locale)}
                    </div>
                    <div className="rt-button-text rt-text-two">
                      {t(homeAbout.cta, locale)}
                    </div>
                  </div>
                  <div className="rt-button-overlay rt-dark-overlay rt-change-white w-variant-a9279b47-3bd8-3b8e-dcbe-db3ac09346a2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
