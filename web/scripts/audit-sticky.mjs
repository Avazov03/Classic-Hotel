import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";

const outDir = path.resolve("d:/S.C.P/Hotel 1/web/.tmp-audit");
await mkdir(outDir, { recursive: true });

const b = await chromium.launch({ headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3000/", {
  waitUntil: "networkidle",
  timeout: 60000,
});
await p.waitForTimeout(1500);
await p.keyboard.press("Escape");

const points = [0, 400, 900, 1400, 2000, 2800, 4000, 5500, 7000, 9000, 12000];
const report = [];

for (const y of points) {
  await p.evaluate((yy) => window.scrollTo(0, yy), y);
  await p.waitForTimeout(300);
  const info = await p.evaluate(() => {
    const stickies = [...document.querySelectorAll("*")]
      .filter((el) => {
        const pos = getComputedStyle(el).position;
        return pos === "sticky" || pos === "fixed";
      })
      .map((el) => {
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        return {
          cls: (el.className || "").toString().slice(0, 50),
          pos: s.position,
          top: s.top,
          z: s.zIndex,
          y: Math.round(r.top),
          h: Math.round(r.height),
          inView: r.bottom > 0 && r.top < innerHeight && r.height > 40,
        };
      })
      .filter((x) => x.inView);

    const hero = document.querySelector(".rt-hero-v1");
    const hr = hero ? hero.getBoundingClientRect() : null;
    const over = [];
    if (hr && hr.bottom > 50) {
      for (const el of document.querySelectorAll("section, [class*=rt-]")) {
        if (
          hero.contains(el) ||
          el === hero ||
          el.closest(".rt-top-main-box") ||
          el.closest(".rt-hero-v1")
        )
          continue;
        const r = el.getBoundingClientRect();
        if (r.height < 80 || r.width < 80) continue;
        if (
          r.top < hr.bottom - 20 &&
          r.bottom > hr.top + 20 &&
          r.top < innerHeight
        ) {
          const s = getComputedStyle(el);
          over.push({
            cls: (el.className || "").toString().slice(0, 45),
            pos: s.position,
            y: Math.round(r.top),
            h: Math.round(r.height),
            z: s.zIndex,
          });
        }
      }
    }

    // heights of main tracks
    const tracks = [
      ".rt-feature-main-height",
      ".rt-experience-main-height",
      ".rt-value",
      ".rt-service-v1",
      ".rt-about-v1-main-wrapper",
    ].map((sel) => {
      const el = document.querySelector(sel);
      if (!el) return { sel, missing: true };
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        sel,
        h: Math.round(r.height),
        cssH: s.height,
        pos: s.position,
      };
    });

    return {
      scrollY: Math.round(scrollY),
      stickies,
      over: over.slice(0, 20),
      heroY: hr ? Math.round(hr.top) : null,
      heroH: hr ? Math.round(hr.height) : null,
      tracks,
    };
  });
  report.push(info);
  await p.screenshot({
    path: path.join(outDir, `y${y}.png`),
    fullPage: false,
  });
}

console.log(JSON.stringify(report, null, 2));
await b.close();
