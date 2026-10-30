export const LOCALES = ["uz", "ru", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const LOCALE_COOKIE = "guremir-lang";

export function parseLocale(value: string | undefined | null): Locale {
  if (value === "ru" || value === "en" || value === "uz") return value;
  return "uz";
}
