import { featuredRooms, homeDining, homeGallery } from "@/data/home";
import { pageIntros } from "@/data/pages";
import { roomsListing } from "@/data/rooms";
import { contact } from "@/data/site";

export type AssistantCard = {
  href: string;
  title: string;
  image: string;
  meta: string;
  facts: string;
  blurb: string;
  action: string;
  tone: "room" | "dining" | "booking" | "place";
};

type RoomId = "single" | "twin" | "double" | "deluxe";

function facts(items: readonly string[]): string {
  return items.filter((item) => !/so.rang/i.test(item)).slice(0, 3).join(" · ");
}

const gallery = (label: string) =>
  homeGallery.find((item) => item.label.replace(/[‘’ʻʼ']/g, "").startsWith(label))?.src || homeDining.images[0];

const ROOMS: Record<RoomId, AssistantCard> = {
  single: {
    href: "/rooms/standard-room",
    title: "Standard Single",
    image: roomsListing[0].image,
    meta: "Bir kishilik · narx so‘raladi",
    facts: facts(roomsListing[0].highlights),
    blurb: "",
    action: "Xonani ochish",
    tone: "room",
  },
  deluxe: {
    href: "/rooms/executive-suite",
    title: "Deluxe king size",
    image: roomsListing[1].image,
    meta: "King size · narx so‘raladi",
    facts: facts(roomsListing[1].highlights),
    blurb: "",
    action: "Xonani ochish",
    tone: "room",
  },
  twin: {
    href: "/rooms/sea-view-room",
    title: "Standard Twin",
    image: roomsListing[2].image,
    meta: "Ikki alohida karavot · narx so‘raladi",
    facts: facts(roomsListing[2].highlights),
    blurb: "",
    action: "Xonani ochish",
    tone: "room",
  },
  double: {
    href: "/rooms",
    title: "Standard Double",
    image: featuredRooms[1].image,
    meta: "Ikki kishilik · narx so‘raladi",
    facts: "Bitta katta karavot · Televizor · Zamonaviy interyer",
    blurb: "Alohida sahifasi yo‘q. Xonalar ro‘yxatidan ko‘riladi.",
    action: "Xonalar ro‘yxati",
    tone: "room",
  },
};

const DINING: AssistantCard = {
  href: "/restaurant",
  title: "Restoran va nonushta",
  image: gallery("bufet"),
  meta: "Nonushta har kuni 07:00–10:00",
  facts: "Bufet · Alakart · Halol taomlar",
  blurb: "Ertalab bufet. Kun davomida a la carte. Taomlar halol. Restoran, bar va teras bor.",
  action: "Restoranni ochish",
  tone: "dining",
};

const BOOKING: AssistantCard = {
  href: "/contact",
  title: "Joy bron qilish",
  image: pageIntros.contact.image,
  meta: "Qabulxona 24 soat",
  facts: `Narx va bo‘sh xona shu yerda · ${contact.email}`,
  blurb: "Sayt band qilmaydi va to‘lov olmaydi. Formani yuboring, qabulxona javob beradi.",
  action: "Bron formasini ochish",
  tone: "booking",
};

const GARDEN: AssistantCard = {
  href: "/spa",
  title: "Bog‘ va teras",
  image: gallery("bog"),
  meta: "Ochiq teras",
  facts: "Bog‘ · Teras · Restoran va bar",
  blurb: "Tinch hovli va ochiq teras. Restoran va bar shu yerda.",
  action: "Bog‘ni ochish",
  tone: "place",
};

const CYR: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "j", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "x", ц: "ts", ч: "ch", ш: "sh", щ: "sh",
  ъ: "", ы: "i", ь: "", э: "e", ю: "yu", я: "ya", қ: "q", ғ: "g", ҳ: "h", ў: "o",
};

const SUFFIX =
  /^(i|ini|iga|ni|ning|da|dan|ga|ka|lar|lari|larini|larni|larda|larga|m|im|ing|si|sini|dagi|ham|dir|mi|chi|man|miz|ngiz|kilish|kilmok|kilmokci|kilmokciman|kilmokcim|kilaman|kiling|kil|lamok|layman|laymiz)?$/;

const CONTAINS = new Set(["bron", "book", "nonushta", "restoran", "deluxe", "zavtrak", "breakfast"]);

function fold(raw: string): string {
  const lower = raw.toLowerCase().replace(/[‘’ʻʼ'`´]/g, "");
  let out = "";
  for (const ch of lower) out += CYR[ch] ?? ch;
  return out.replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

function soften(value: string): string {
  return value.replace(/h/g, "x").replace(/q/g, "k");
}

function squeeze(value: string): string {
  return value.replace(/(.)\1+/g, "$1");
}

function levenshtein(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const saved = row[j];
      row[j] = a[i - 1] === b[j - 1] ? prev : Math.min(prev, row[j], row[j - 1]) + 1;
      prev = saved;
    }
  }
  return row[b.length];
}

function tokenHits(token: string, keyword: string): boolean {
  const a = soften(token);
  const b = soften(keyword);
  if (!a || !b) return false;
  if (a === b || (squeeze(a) === squeeze(b) && a.length >= b.length)) return true;
  if (a.startsWith(b) && SUFFIX.test(a.slice(b.length))) return true;
  if (CONTAINS.has(b) && a.includes(b)) return true;
  const limit = b.length >= 8 ? 2 : b.length >= 5 ? 1 : 0;
  if (limit === 0 || Math.abs(a.length - b.length) > limit) return false;
  return levenshtein(a, b) <= limit;
}

function anyHit(tokens: string[], keywords: readonly string[]): boolean {
  return keywords.some((keyword) => tokens.some((token) => tokenHits(token, keyword)));
}

function phrase(tokens: string[], words: readonly string[]): boolean {
  for (let i = 0; i <= tokens.length - words.length; i++) {
    if (words.every((word, index) => tokenHits(tokens[i + index], word))) return true;
  }
  return false;
}

function roomFromPath(path: string | undefined): RoomId | null {
  const slug = path?.match(/^\/rooms\/([^/]+)/)?.[1];
  if (slug === "standard-room") return "single";
  if (slug === "sea-view-room") return "twin";
  if (slug === "executive-suite") return "deluxe";
  return null;
}

const ROOM_WORDS = ["xona", "xonalar", "room", "rooms", "nomer", "nomera", "nomerlar", "yotoq", "karavot"];
const ROOM_PLURAL = ["xonalar", "rooms", "nomera", "nomerlar"];
const WHICH = ["qanday", "qaysi", "boshqa", "kakie"];

function namedRooms(tokens: string[]): RoomId[] {
  const found: RoomId[] = [];
  const add = (id: RoomId) => {
    if (!found.includes(id)) found.push(id);
  };
  if (anyHit(tokens, ["deluxe", "delyuks", "lyuks", "lyux", "kingsize", "kingsayz"]) || phrase(tokens, ["king", "size"])) {
    add("deluxe");
  }
  if (anyHit(tokens, ["twin", "tvin", "ikkialohida"]) || phrase(tokens, ["ikki", "alohida"])) add("twin");
  if (anyHit(tokens, ["double", "dubl", "ikkikishilik"]) || phrase(tokens, ["ikki", "kishilik"]) || phrase(tokens, ["katta", "karavot"])) {
    add("double");
  }
  if (anyHit(tokens, ["single", "singl", "birkishilik"]) || phrase(tokens, ["bir", "kishilik"])) add("single");
  return found;
}

function asksAgain(message: string): boolean {
  const text = fold(message);
  if (text.length > 90) return false;
  return /\b(shu|shuni|shunga|uni|uning|buni|yana|narxi|qancha|qilaman|qilamiz)\b/.test(text);
}

export function pickAssistantCards(message: string, path?: string, earlier?: string): AssistantCard[] {
  const tokens = fold(message).split(" ").filter(Boolean);
  const remembered = asksAgain(message) && earlier?.trim() ? namedRooms(fold(earlier).split(" ").filter(Boolean)) : [];
  const cards: AssistantCard[] = [];
  const seen = new Set<string>();
  const push = (card: AssistantCard) => {
    const key = card.href + card.title;
    if (seen.has(key)) return;
    seen.add(key);
    cards.push(card);
  };

  const roomWord = anyHit(tokens, ROOM_WORDS);
  const roomPlural = anyHit(tokens, ROOM_PLURAL);
  const asksWhich = anyHit(tokens, WHICH) || phrase(tokens, ["what", "rooms"]) || phrase(tokens, ["all", "rooms"]);
  const ownTypes = namedRooms(tokens);
  const specific =
    ownTypes.length > 0 ? ownTypes : remembered.length > 0 && !roomPlural && !asksWhich ? remembered : [];
  const thisRoom = phrase(tokens, ["bu", "xona"]) || phrase(tokens, ["shu", "xona"]) || phrase(tokens, ["this", "room"]) || phrase(tokens, ["etot", "nomer"]);
  const dining = anyHit(tokens, [
    "nonushta", "breakfast", "zavtrak", "restoran", "restaurant", "taom", "ovqat", "obed", "ujin", "halol", "bufet", "alakart", "menu",
  ]) || tokens.includes("bar");
  const booking = anyHit(tokens, [
    "bron", "book", "booking", "rezerv", "rezervatsiya", "qabulxona", "narx", "price", "stoimost", "band",
  ]);
  const garden = anyHit(tokens, ["bog", "hovli", "garden", "teras", "sad"]);
  const listedTogether = tokens.some((token) => token === "va" || token === "ham" || token === "and");
  const here = roomFromPath(path);

  if (booking) push(BOOKING);
  if (dining) push(DINING);
  if (garden && !dining) push(GARDEN);

  const foodOnlyRoom =
    dining && roomWord && specific.length === 0 && !thisRoom && !roomPlural && !asksWhich && !listedTogether;

  if (specific.length > 0) {
    specific.forEach((id) => push(ROOMS[id]));
  } else if (thisRoom && here && !roomPlural && !asksWhich) {
    push(ROOMS[here]);
  } else if (!foodOnlyRoom && (roomWord || asksWhich || thisRoom)) {
    (["deluxe", "double", "twin", "single"] as RoomId[]).forEach((id) => push(ROOMS[id]));
  } else if (here && anyHit(tokens, ["haqida", "ichida", "nimalar"]) && !dining && !garden) {
    push(ROOMS[here]);
  }

  return cards.slice(0, 5);
}

export function assistantGuide(
  message: string,
  path?: string,
  earlier?: string,
): { cards: AssistantCard[]; hint: string } {
  const cards = pickAssistantCards(message, path, earlier);
  const lines = [
    "Suhbat davom etyapti. Qaytadan salomlashma. Ism: Ko‘makchi AI. Qo‘shimchani ajratma: Ko‘makchi AIni, Ko‘makchi AIdan. Mehmonning oxirgi gapiga to‘g‘ri o‘zbekchada javob ber. Bu yo‘riqni yozma.",
  ];
  if (cards.some((card) => card.tone === "booking")) {
    lines.push(
      "BRON: joy faqat /contact formasi orqali so‘raladi. Qabulxona 24 soat. Sayt bronni tasdiqlamaydi va to‘lov olmaydi. Narx va bandlikni o‘ylab topma.",
    );
  }
  if (cards.some((card) => card.tone === "dining")) {
    lines.push("OVQAT: bufet nonushta 07:00–10:00, a la carte, halol. Havola /restaurant.");
  }
  if (cards.some((card) => card.tone === "place")) {
    lines.push("BOG‘: bog‘, ochiq teras, restoran va bar. Havola /spa.");
  }
  const rooms = cards.filter((card) => card.tone === "room");
  if (rooms.length) {
    lines.push(`XONALAR: ${rooms.map((card) => `${card.title} ${card.href}`).join(", ")}. Boshqa xona turi yo‘q.`);
  }
  if (cards.length === 0) lines.push("Aniq karta yo‘q. Bilmasang /contact ga yo‘naltir.");
  return { cards, hint: lines.join(" ") };
}
