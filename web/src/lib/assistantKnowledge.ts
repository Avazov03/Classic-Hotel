import { brandName, contact } from "@/data/site";

const ROOM_PAGES: Record<string, string> = {
  "standard-room": "Standard Single — bir kishilik. Havola: /rooms/standard-room",
  "sea-view-room":
    "Standard Twin — ikki alohida karavot. Havola: /rooms/sea-view-room. Dengiz manzarasi yo‘q.",
  "executive-suite": "Deluxe king size. Havola: /rooms/executive-suite",
};

export function hotelKnowledge(): string {
  return `MEHMONXONA: ${brandName}
JOY: shahar markazidagi tinch mehmonxona. Aniq ko‘cha, shahar nomi va telefon raqami saytda yo‘q.
ALOQA: ${contact.email} — forma /contact. Telefon ko‘rsatilmagan, qabulxona orqali.
QABULXONA: 24 soat.
NONUSHTA: bufet 07:00–10:00, a la carte, halol.
JOYLAR: bog‘, ochiq teras, restoran va bar.
TRANSFER: aeroport transferi bor, narxi va vaqtini qabulxonadan so‘rash kerak.
NARX: xona narxi, m² va bandlik saytda yo‘q. Mehmonni /contact formasiga yo‘naltir.
XONALAR:
- Standard Single — /rooms/standard-room
- Standard Twin — /rooms/sea-view-room
- Standard Double — ikki kishilik, bitta katta karavot. Alohida sahifa yo‘q, /rooms
- Deluxe king size — /rooms/executive-suite
QULAYLIKLAR: Wi-Fi, konditsioner, televizor, shkaf, hammom. Deluxe va Single da seyf, fen, choynak, ish stoli ham tilga olingan.
SAHIFALAR: / bosh sahifa, /about, /rooms, /restaurant, /banquet teras va restoran, /spa bog‘, /amenities, /blog, /contact.`;
}

export function pageFocus(path: string | undefined): string {
  if (!path) return "JORIY SAHIFA: noma’lum";
  const room = path.match(/^\/rooms\/([^/]+)/);
  if (room) {
    const slug = room[1];
    return `JORIY SAHIFA: ${ROOM_PAGES[slug] || `xona ${slug}. Havola: /rooms/${slug}`}`;
  }
  const labels: Record<string, string> = {
    "/": "bosh sahifa",
    "/rooms": "xonalar ro‘yxati /rooms",
    "/about": "mehmonxona haqida /about",
    "/contact": "aloqa va bron formasi /contact",
    "/restaurant": "restoran /restaurant",
    "/banquet": "teras va restoran /banquet",
    "/spa": "bog‘ va dam olish /spa",
    "/amenities": "qulayliklar /amenities",
    "/blog": "blog /blog",
  };
  if (path.startsWith("/blog/")) return `JORIY SAHIFA: blog maqolasi ${path}`;
  return `JORIY SAHIFA: ${labels[path] || path}`;
}
