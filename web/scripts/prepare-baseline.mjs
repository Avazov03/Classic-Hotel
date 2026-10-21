import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const slicesDir = path.join(root, "_slices");
const outDir = path.join(root, "src", "baseline", "html");

fs.mkdirSync(outDir, { recursive: true });

const linkMap = [
  [/href="index\.html"/g, 'href="/"'],
  [/href="home-one\.html"/g, 'href="/"'],
  [/href="home-two\.html"/g, 'href="/"'],
  [/href="home-three\.html"/g, 'href="/"'],
  [/href="about-us\.html"/g, 'href="/about"'],
  [/href="rooms\.html"/g, 'href="/rooms"'],
  [/href="room\/standard-room\.html"/g, 'href="/rooms/standard-room"'],
  [/href="room\/sea-view-room\.html"/g, 'href="/rooms/sea-view-room"'],
  [/href="room\/executive-suite\.html"/g, 'href="/rooms/executive-suite"'],
  [/href="amenities\.html"/g, 'href="/amenities"'],
  [/href="banquet\.html"/g, 'href="/banquet"'],
  [/href="spa\.html"/g, 'href="/spa"'],
  [/href="restaurant\.html"/g, 'href="/restaurant"'],
  [/href="blog-one\.html"/g, 'href="/blog"'],
  [/href="blog-two\.html"/g, 'href="/blog"'],
  [/href="blog-three\.html"/g, 'href="/blog"'],
  [/href="contact-one\.html"/g, 'href="/contact"'],
  [/href="contact-two\.html"/g, 'href="/contact"'],
  [/href="contact-three\.html"/g, 'href="/contact"'],
  [/href="404\.html"/g, 'href="/not-found-page"'],
  [/href="401\.html"/g, 'href="/"'],
  [
    /href="post\/([^"]+)\.html"/g,
    'href="/blog/$1"',
  ],
];

function neutralizeIx2(html) {
  return html.replace(/\sstyle="([^"]*)"/gi, (_, style) => {
    const parts = style
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((s) => {
        const lower = s.toLowerCase().replace(/\s+/g, "");
        if (lower.startsWith("opacity:0")) return false;
        if (lower.includes("opacity:0;") || lower.endsWith("opacity:0")) return false;
        return true;
      });
    if (!parts.length) return "";
    return ` style="${parts.join("; ")}"`;
  });
}

function clean(html) {
  let out = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\.\.\/cdn\.prod\.website-files\.com/g, "https://cdn.prod.website-files.com")
    .replace(/src="\.\.\/([^"]+)"/g, 'src="https://$1"');

  for (const [re, rep] of linkMap) out = out.replace(re, rep);
  out = neutralizeIx2(out);
  return out.trim();
}

function toModule(name, html) {
  const content = `/* auto-generated — do not edit */\nexport const html = ${JSON.stringify(html)};\n`;
  fs.writeFileSync(path.join(outDir, `${name}.ts`), content);
}

let chrome = clean(fs.readFileSync(path.join(slicesDir, "chrome.html"), "utf8"));
// chrome slice ends with broken <main><div>
chrome = chrome.replace(/<main>\s*<div>\s*$/i, "");
toModule("chrome", chrome);

const sectionFiles = fs
  .readdirSync(slicesDir)
  .filter((f) => f.startsWith("section-") && f.endsWith(".html"))
  .sort((a, b) => {
    const na = Number(a.match(/section-(\d+)/)?.[1] || 0);
    const nb = Number(b.match(/section-(\d+)/)?.[1] || 0);
    return na - nb;
  });

const homeSections = [];
let footer = "";

for (const file of sectionFiles) {
  const raw = fs.readFileSync(path.join(slicesDir, file), "utf8");
  const html = clean(raw);
  const idx = Number(file.match(/section-(\d+)/)?.[1] || 0);
  const cls = (html.match(/class="([^"]*)"/) || [])[1] || "";
  if (cls.includes("rt-footer")) {
    footer = html;
    toModule("footer", html);
  } else {
    homeSections.push(html);
    toModule(`home-${idx}`, html);
  }
}

toModule(
  "home",
  homeSections.join("\n"),
);

console.log("Prepared baseline HTML modules:", {
  chrome: chrome.length,
  homeSections: homeSections.length,
  footer: footer.length,
});
