export type SuggestionChip = { text: string; align: "left" | "right" };

const GREETED_STORAGE_KEY = "guremir-assistant-greeted";

export const ASSISTANT_NAME = "Ko‘makchi AI";

const BASE_GREETING =
  "Salom! Men Ko‘makchi AI. Sizga qanday yordam bera olaman?";

const DEFAULT_SUGGESTIONS: SuggestionChip[] = [
  { text: "Mehmonxonada nimalar bor?", align: "left" },
  { text: "Qanday xonalar bor?", align: "right" },
  { text: "Nonushta qachon beriladi?", align: "right" },
  { text: "Bron qilish uchun nima qilaman?", align: "right" },
  { text: "Qabulxona qachon ishlaydi?", align: "right" },
];

export function getTimeGreeting(): string | null {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Xayrli tong!";
  if (hour >= 18 || hour < 5) return "Xayrli kech!";
  return null;
}

export function getPageGreetingSuffix(pathname: string): string | null {
  if (/^\/rooms\/[^/]+/.test(pathname)) return "Bu xona haqida savolingiz bormi?";
  if (pathname === "/rooms") return "Qaysi xonani ko‘rmoqchisiz?";
  if (pathname === "/restaurant" || pathname === "/banquet") {
    return "Restoran yoki teras haqida savolingiz bormi?";
  }
  if (pathname === "/spa") return "Bog‘ va teras haqida savolingiz bormi?";
  if (pathname === "/amenities") return "Qulayliklar haqida savolingiz bormi?";
  if (pathname === "/contact") return "Bron yoki aloqa haqida yozing.";
  if (pathname === "/about") return "Mehmonxona haqida nima bilmoqchisiz?";
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    return "Maqolalar haqida savolingiz bormi?";
  }
  return null;
}

export function getGreetingContextId(pathname: string): string {
  if (/^\/rooms\/[^/]+/.test(pathname)) return pathname;
  if (pathname.startsWith("/blog/")) return pathname;
  if (getPageGreetingSuffix(pathname)) return pathname;
  return "home";
}

function readGreetedMap(): Record<string, boolean> {
  try {
    const raw = sessionStorage.getItem(GREETED_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, boolean>;
    }
  } catch {
    /* ignore */
  }
  return {};
}

export function wasContextGreeted(contextId: string): boolean {
  if (typeof window === "undefined") return false;
  return !!readGreetedMap()[contextId];
}

export function markContextGreeted(contextId: string): void {
  if (typeof window === "undefined") return;
  try {
    const map = readGreetedMap();
    map[contextId] = true;
    sessionStorage.setItem(GREETED_STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

export function buildFabGreeting(pathname: string): string {
  const pageGreeting = getPageGreetingSuffix(pathname);
  if (pageGreeting) return pageGreeting;

  const parts: string[] = [];
  const timeGreeting = getTimeGreeting();
  if (timeGreeting) parts.push(timeGreeting);
  parts.push(BASE_GREETING);
  return parts.join(" ");
}

export function getContextualSuggestions(pathname: string): SuggestionChip[] {
  if (/^\/rooms\/[^/]+/.test(pathname)) {
    return [
      { text: "Bu xona haqida qisqacha ayting", align: "left" },
      { text: "Bu xonada nimalar bor?", align: "right" },
      { text: "Narxni qayerdan bilaman?", align: "right" },
      { text: "Boshqa xonalar bormi?", align: "right" },
    ];
  }

  if (pathname === "/rooms") {
    return [
      { text: "Qanday xonalar bor?", align: "left" },
      { text: "Ikki kishilik xona bormi?", align: "right" },
      { text: "Deluxe king size haqida ayting", align: "right" },
      { text: "Bron qilish uchun nima qilaman?", align: "right" },
    ];
  }

  if (pathname === "/restaurant" || pathname === "/banquet") {
    return [
      { text: "Restoran haqida ayting", align: "left" },
      { text: "Nonushta qachon beriladi?", align: "right" },
      { text: "Teras bormi?", align: "right" },
      { text: "Stol bron qilaman", align: "right" },
    ];
  }

  if (pathname === "/contact") {
    return [
      { text: "Qanday bog‘lanaman?", align: "left" },
      { text: "Bron qilish uchun nima qilaman?", align: "right" },
      { text: "Qabulxona qachon ishlaydi?", align: "right" },
    ];
  }

  if (pathname === "/about" || pathname === "/amenities" || pathname === "/spa") {
    return [
      { text: "Mehmonxonada nimalar bor?", align: "left" },
      { text: "Aeroport transferi bormi?", align: "right" },
      { text: "Wi-Fi va nonushta bormi?", align: "right" },
    ];
  }

  return DEFAULT_SUGGESTIONS;
}
