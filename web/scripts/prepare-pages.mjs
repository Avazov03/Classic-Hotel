import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mirror = path.join(root, "..", "elbergo.webflow.io");
const outDir = path.join(root, "src", "baseline", "html");
fs.mkdirSync(outDir, { recursive: true });

const linkMap = [
  [/href="(?:\.\.\/)?index\.html"/g, 'href="/"'],
  [/href="(?:\.\.\/)?home-one\.html"/g, 'href="/"'],
  [/href="(?:\.\.\/)?home-two\.html"/g, 'href="/"'],
  [/href="(?:\.\.\/)?home-three\.html"/g, 'href="/"'],
  [/href="(?:\.\.\/)?about-us\.html"/g, 'href="/about"'],
  [/href="(?:\.\.\/)?rooms\.html"/g, 'href="/rooms"'],
  [/href="(?:\.\.\/)?room\/standard-room\.html"/g, 'href="/rooms/standard-room"'],
  [/href="(?:\.\.\/)?room\/sea-view-room\.html"/g, 'href="/rooms/sea-view-room"'],
  [/href="(?:\.\.\/)?room\/executive-suite\.html"/g, 'href="/rooms/executive-suite"'],
  [/href="(?:\.\.\/)?amenities\.html"/g, 'href="/amenities"'],
  [/href="(?:\.\.\/)?banquet\.html"/g, 'href="/banquet"'],
  [/href="(?:\.\.\/)?spa\.html"/g, 'href="/spa"'],
  [/href="(?:\.\.\/)?restaurant\.html"/g, 'href="/restaurant"'],
  [/href="(?:\.\.\/)?blog-one\.html"/g, 'href="/blog"'],
  [/href="(?:\.\.\/)?blog-two\.html"/g, 'href="/blog"'],
  [/href="(?:\.\.\/)?blog-three\.html"/g, 'href="/blog"'],
  [/href="(?:\.\.\/)?contact-one\.html"/g, 'href="/contact"'],
  [/href="(?:\.\.\/)?contact-two\.html"/g, 'href="/contact"'],
  [/href="(?:\.\.\/)?contact-three\.html"/g, 'href="/contact"'],
  [/href="(?:\.\.\/)?404\.html"/g, 'href="/not-found"'],
  [/href="(?:\.\.\/)?401\.html"/g, 'href="/password-protected"'],
  [/href="(?:\.\.\/)?post\/([^"]+)\.html"/g, 'href="/blog/$1"'],
  [/href="(?:\.\.\/)?style-guide\.html"/g, 'href="/style-guide"'],
  [/href="(?:\.\.\/)?license\.html"/g, 'href="/license"'],
  [/href="(?:\.\.\/)?changelog\.html"/g, 'href="/changelog"'],
];

function neutralizeIx2(html) {
  /*
   * Keep IX2 start DNA:
   * - rt-image-overlay wipe masks + their skew/translate start transforms
   * - opacity:0 on scroll-in text (WebflowRuntime / IX2 reveals them)
   * Only strip vertical counter-train offsets that look broken without IX2.
   */
  return html.replace(/\sstyle="([^"]*)"/gi, (_, style) => {
    const parts = style
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((s) => {
        // Counter digit trains: translate3d(0, -N%, 0) — not image overlays
        if (
          /transform:/i.test(s) &&
          /translate3d\(\s*0\s*,\s*-?\d+%/i.test(s)
        ) {
          return false;
        }
        return true;
      });
    if (!parts.length) return "";
    return ` style="${parts.join("; ")}"`;
  });
}

function clean(html) {
  let out = html
    // Keep Webflow lightbox JSON; strip executable scripts only
    .replace(/<script(?![^>]*type=["']application\/json["'])[\s\S]*?<\/script>/gi, "")
    .replace(/\.\.\/cdn\.prod\.website-files\.com/g, "https://cdn.prod.website-files.com")
    .replace(/src="\.\.\/([^"]+)"/g, (_, p) => {
      if (p.startsWith("http")) return `src="${p}"`;
      if (p.startsWith("cdn.")) return `src="https://${p}"`;
      return `src="/${p}"`;
    });
  for (const [re, rep] of linkMap) out = out.replace(re, rep);
  out = neutralizeIx2(out);
  return out.trim();
}

/** Stack-based extractor — naive regex breaks nested room tab <section>s. */
function extractTopLevelSections(html) {
  const results = [];
  const re = /<\/?section\b[^>]*>/gi;
  const stack = [];
  let match;
  while ((match = re.exec(html))) {
    const tag = match[0];
    if (/^<\/section/i.test(tag)) {
      const start = stack.pop();
      if (start && stack.length === 0) {
        results.push(html.slice(start.index, match.index + tag.length));
      }
    } else {
      stack.push({ index: match.index });
    }
  }
  return results;
}

function extractMain(html) {
  const sections = extractTopLevelSections(html);
  const mainSections = sections.filter((s) => {
    const cls = (s.match(/class="([^"]*)"/) || [])[1] || "";
    if (/rt-footer/.test(cls)) return false;
    if (/rt-navbar|rt-top-main|rt-nav-inner|w-nav\b/.test(cls)) return false;
    return true;
  });
  // Room pages wrap tabs in a bare <section> — keep full nested panes
  return mainSections.join("\n");
}

const pages = [
  { file: "about-us.html", out: "about" },
  { file: "rooms.html", out: "rooms" },
  { file: "amenities.html", out: "amenities" },
  { file: "banquet.html", out: "banquet" },
  { file: "spa.html", out: "spa" },
  { file: "restaurant.html", out: "restaurant" },
  { file: "blog-one.html", out: "blog" },
  { file: "contact-two.html", out: "contact" },
  { file: "404.html", out: "not-found" },
  { file: "401.html", out: "password-protected" },
  { file: "style-guide.html", out: "style-guide" },
  { file: "license.html", out: "license" },
  { file: "changelog.html", out: "changelog" },
  { file: "room/standard-room.html", out: "room-standard-room" },
  { file: "room/sea-view-room.html", out: "room-sea-view-room" },
  { file: "room/executive-suite.html", out: "room-executive-suite" },
];

const posts = fs
  .readdirSync(path.join(mirror, "post"))
  .filter((f) => f.endsWith(".html"));

for (const file of posts) {
  pages.push({
    file: path.join("post", file),
    out: `post-${file.replace(/\.html$/, "")}`,
  });
}

const notFoundFallback = `<section class="rt-inner-hero"><div class="w-layout-blockcontainer rt-container w-container" style="padding:6rem 0;text-align:center"><h1 class="rt-gap-off">Page not found</h1><p style="margin:1rem 0 1.5rem">The page you are looking for may have moved.</p><a href="/" class="rt-button rt-overflow-hidden rt-change-black w-inline-block"><div class="rt-position-relative rt-overflow-hidden"><div class="rt-button-text rt-text-one">Back home</div></div></a></div></section>`;

for (const page of pages) {
  const full = path.join(mirror, page.file);
  if (!fs.existsSync(full)) {
    console.warn("missing", page.file);
    continue;
  }
  const raw = fs.readFileSync(full, "utf8");
  const body = (raw.match(/<body[^>]*>([\s\S]*)<\/body>/i) || [])[1] || raw;
  let html = clean(extractMain(body));
  // Utility pages (401) use div wrappers, not <section>
  if (!html && /rt-utility-page-wrap/.test(body)) {
    html = clean(body);
  }
  if (!html && page.out === "not-found") html = notFoundFallback;
  const content = `/* auto-generated — do not edit */\nexport const html = ${JSON.stringify(html)};\n`;
  fs.writeFileSync(path.join(outDir, `${page.out}.ts`), content);
  console.log(page.out, html.length);
}
