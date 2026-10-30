import phrases from "./phrases.json";
import { type Locale } from "./locale";

type Phrase = { ru: string; en: string };

const table = phrases as Record<string, Phrase>;

/** Match the same phrase whether the source uses ʻ, ’, or '. */
export function normKey(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/[\u2018\u2019\u02BB\u02BC']/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function encodeText(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function t(value: string, locale: Locale): string {
  if (locale === "uz" || !value) return value;
  const hit = table[normKey(value)];
  if (!hit) return value;
  return hit[locale];
}

function translateChunk(chunk: string, locale: Locale): string {
  if (!chunk.trim()) return chunk;
  const decoded = chunk
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'");
  const trimmed = decoded.trim();
  const hit = table[normKey(trimmed)];
  if (!hit) return chunk;
  const lead = decoded.match(/^\s*/)?.[0] ?? "";
  const trail = decoded.match(/\s*$/)?.[0] ?? "";
  return encodeText(lead + hit[locale] + trail);
}

function translateTag(tag: string, locale: Locale): string {
  return tag.replace(
    /\s(placeholder|aria-label|alt|title)="([^"]*)"/g,
    (full, attr: string, value: string) => {
      const hit = table[normKey(value)];
      if (!hit) return full;
      return ` ${attr}="${encodeText(hit[locale])}"`;
    },
  );
}

/** Swap guest-facing copy inside baseline HTML. Tags and scripts stay put. */
export function translateHtml(html: string, locale: Locale): string {
  if (locale === "uz") return html;
  const parts = html.split(/(<[^>]+>)/);
  return parts
    .map((part, index) =>
      index % 2 === 1 ? translateTag(part, locale) : translateChunk(part, locale),
    )
    .join("");
}
