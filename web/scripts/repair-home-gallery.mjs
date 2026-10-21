/**
 * Re-extract gallery section from home-one.html with w-json lightbox payloads.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "..", "baseline", "elbergo.webflow.io", "home-one.html");
const out = path.join(root, "src", "baseline", "html", "home-7.ts");

let html = fs.readFileSync(src, "utf8");
const body = (html.match(/<body[^>]*>([\s\S]*)<\/body>/i) || [])[1] || html;

// Stack-extract top-level sections, pick gallery
const re = /<\/?section\b[^>]*>/gi;
const stack = [];
const sections = [];
let m;
while ((m = re.exec(body))) {
  const tag = m[0];
  if (/^<\/section/i.test(tag)) {
    const start = stack.pop();
    if (start && stack.length === 0) {
      sections.push(body.slice(start.index, m.index + tag.length));
    }
  } else {
    stack.push({ index: m.index });
  }
}

const gallery = sections.find((s) => s.includes("rt-gallery-v4"));
if (!gallery) {
  console.error("gallery section not found");
  process.exit(1);
}

let cleaned = gallery
  .replace(/<script(?![^>]*type=["']application\/json["'])[\s\S]*?<\/script>/gi, "")
  .replace(/\.\.\/cdn\.prod\.website-files\.com/g, "https://cdn.prod.website-files.com")
  .replace(/href="banquet\.html"/g, 'href="/banquet"')
  .replace(/href="(?:\.\.\/)?banquet\.html"/g, 'href="/banquet"');

// neutralize opacity:0 only (keep transforms for lightbox imgs)
cleaned = cleaned.replace(/\sstyle="([^"]*)"/gi, (_, style) => {
  const parts = style
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((s) => !/^opacity:\s*0$/i.test(s.replace(/\s+/g, "")));
  if (!parts.length) return "";
  return ` style="${parts.join("; ")}"`;
});

fs.writeFileSync(
  out,
  `/* auto-generated — do not edit */\nexport const html = ${JSON.stringify(cleaned)};\n`,
);
console.log("home-7", cleaned.length, "w-json", (cleaned.match(/w-json/g) || []).length);
