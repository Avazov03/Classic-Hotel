import fs from "fs";
import { chromium } from "playwright";

const src = fs.readFileSync(
  "../baseline/elbergo.webflow.io/room/sea-view-room.html",
  "utf8",
);
const local = fs.readFileSync("src/baseline/html/room-sea-view-room.ts", "utf8");

console.log("SRC opacity:0", (src.match(/opacity:\s*0/g) || []).length);
console.log("LOCAL opacity:0", (local.match(/opacity:\s*0/g) || []).length);
console.log("SRC transform", (src.match(/style="[^"]*transform/g) || []).length);
console.log("LOCAL transform", (local.match(/style="[^"]*transform/g) || []).length);
console.log("SRC overlay", (src.match(/rt-image-overlay/g) || []).length);
console.log("LOCAL overlay", (local.match(/rt-image-overlay/g) || []).length);
console.log("SRC marquee", (src.match(/marquee/g) || []).length);
console.log("LOCAL marquee", (local.match(/marquee/g) || []).length);

const css = fs.readFileSync("src/styles/webflow/elbergo.shared.css", "utf8");
const rules = [
  ...css.matchAll(/\.rt-gallery-v5[^{]*\{[^}]+\}/gi),
  ...css.matchAll(/\.rt-gallery-[a-z0-9_-]*marquee[^{]*\{[^}]+\}/gi),
  ...css.matchAll(/\.rt-gallery-marquee[^{]*\{[^}]+\}/gi),
  ...css.matchAll(/\.rt-room-details-hero[^{]*\{[^}]+\}/gi),
  ...css.matchAll(/\.rt-room-overview-v2-right[^{]*\{[^}]+\}/gi),
].map((m) => m[0]);
console.log("\nCSS rules:\n" + rules.join("\n\n"));

const b = await chromium.launch({ headless: true });
for (const [tag, url] of [
  ["local", "http://localhost:3000/rooms/sea-view-room"],
  ["orig", "https://elbergo.webflow.io/room/sea-view-room"],
]) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(url, { waitUntil: "networkidle", timeout: 90000 });
  await p.waitForTimeout(2000);
  await p.evaluate(() => window.scrollTo(0, 2800));
  await p.waitForTimeout(800);
  const g = await p.evaluate(() => {
    const gal = document.querySelector(".rt-gallery-v5");
    const train = document.querySelector(
      ".rt-gallery-top-marquee-train, .rt-gallery-marquee-wrapper",
    );
    const imgs = [...document.querySelectorAll(".rt-gallery-v5 img")].slice(0, 6);
    const s = gal && getComputedStyle(gal);
    const ts = train && getComputedStyle(train);
    return {
      galH: gal ? Math.round(gal.getBoundingClientRect().height) : null,
      galOverflow: s?.overflow,
      trainTransform: ts?.transform?.slice(0, 60),
      trainW: train ? Math.round(train.getBoundingClientRect().width) : null,
      imgCount: document.querySelectorAll(".rt-gallery-v5 img").length,
      sampleImgs: imgs.map((img) => ({
        w: Math.round(img.getBoundingClientRect().width),
        h: Math.round(img.getBoundingClientRect().height),
        op: getComputedStyle(img).opacity,
      })),
      // hero chrome
      topBg: getComputedStyle(
        document.querySelector(".rt-top-main-box, .rt-top-main") ||
          document.body,
      ).backgroundColor,
      heroScale: document.querySelector(".rt-hero-image")?.getAttribute("style")?.slice(0, 80),
    };
  });
  console.log("\n", tag, JSON.stringify(g, null, 2));
  await p.screenshot({
    path: `d:/S.C.P/Hotel 1/web/.tmp-audit/${tag}-room-gallery.png`,
    fullPage: false,
  });
  await p.close();
}
await b.close();
