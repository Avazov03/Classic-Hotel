import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "src", "baseline", "html");

function neutralize(html) {
  /*
   * Do NOT strip opacity:0 or image-overlay transforms — IX2 needs them.
   * Only strip vertical counter-train offsets (translate3d(0, N%, …)).
   */
  return html.replace(/\sstyle="([^"]*)"/gi, (_, style) => {
    const parts = style
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((s) => {
        if (
          /transform:/i.test(s) &&
          /translate3d\(\s*0(?:px)?\s*,\s*-?\d+%/i.test(s)
        ) {
          return false;
        }
        return true;
      });
    if (!parts.length) return "";
    return ` style="${parts.join("; ")}"`;
  });
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
