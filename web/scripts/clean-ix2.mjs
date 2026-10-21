import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "src", "baseline", "html");

function neutralize(html) {
  return html
    // Remove entire style attrs that only exist to hide for IX2
    .replace(/\sstyle="([^"]*)"/gi, (_, style) => {
      const parts = style
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean)
        .filter((s) => {
          const lower = s.toLowerCase();
          if (lower.startsWith("opacity:") && /opacity:\s*0/.test(lower)) return false;
          if (lower.includes("transform:") && /translate3d\(0,\s*[1-9]/.test(lower)) return false;
          if (lower.includes("transform:") && /translate3d\(0px,\s*[1-9]/.test(lower)) return false;
          if (lower.includes("filter:") && /blur\(/.test(lower)) return false;
          return true;
        });
      if (!parts.length) return "";
      return ` style="${parts.join("; ")}"`;
    })
    // Webflow often sets opacity 0 via attribute without other styles surviving
    .replace(/\sopacity="0"/gi, "");
}

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".ts"))) {
  const full = path.join(dir, file);
  const src = fs.readFileSync(full, "utf8");
  const match = src.match(/^([\s\S]*export const html = )([\s\S]*);?\s*$/);
  if (!match) continue;
  const html = JSON.parse(match[2].replace(/;$/, ""));
  const next = neutralize(html);
  fs.writeFileSync(
    full,
    `/* auto-generated — do not edit */\nexport const html = ${JSON.stringify(next)};\n`,
  );
  console.log(file, html.length, "->", next.length);
}
