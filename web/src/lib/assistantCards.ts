import { featuredRooms, homeBusiness, homeDining } from "@/data/home";
import { roomsListing } from "@/data/rooms";

export type AssistantCard = {
  href: string;
  title: string;
  image: string;
  meta: string;
  facts: string;
  blurb: string;
};

type RoomId = "single" | "twin" | "double" | "deluxe";

function facts(items: readonly string[]): string {
  return items.filter((item) => !/so.rang/i.test(item)).slice(0, 3).join(" · ");
}

const ROOMS: Record<RoomId, AssistantCard> = {
  single: {
    href: "/rooms/standard-room",
    title: "Standard Single",
    image: roomsListing[0].image,
    meta: "Bir kishilik · narx so‘raladi",
    facts: facts(roomsListing[0].highlights),
    blurb: roomsListing[0].blurb,
  },
  deluxe: {
    href: "/rooms/executive-suite",
    title: "Deluxe king size",
    image: roomsListing[1].image,
    meta: "King size · narx so‘raladi",
    facts: facts(roomsListing[1].highlights),
    blurb: roomsListing[1].blurb,
  },
  twin: {
    href: "/rooms/sea-view-room",
    title: "Standard Twin",
    image: roomsListing[2].image,
    meta: "Ikki alohida karavot · narx so‘raladi",
    facts: facts(roomsListing[2].highlights),
    blurb: roomsListing[2].blurb,
  },
  double: {
    href: "/rooms",
    title: "Standard Double",
    image: featuredRooms[1].image,
    meta: "Ikki kishilik · narx so‘raladi",
    facts: "Bitta katta karavot · Televizor · Zamonaviy interyer",
    blurb: featuredRooms[1].blurb,
  },
};

const DINING: AssistantCard = {
  href: "/restaurant",
  title: "Restoran va nonushta",
  image: homeDining.images[0],
  meta: "Bufet 07:00–10:00",
  facts: "Bufet · Alakart · Halol taomlar",
  blurb: homeBusiness.body,
};

const BOOKING: AssistantCard = {
  href: "/contact",
  title: "Bron va qabulxona",
  image: homeBusiness.images[0],
  meta: "Qabulxona 24 soat",
  facts: "Narx · Bandlik · Aeroport transferi",
  blurb: "Narx va bo‘sh xonani qabulxona tasdiqlaydi. Forma orqali yozing.",
};

const GARDEN: AssistantCard = {
  href: "/spa",
  title: "Bog‘ va teras",
  image: homeBusiness.images[1],
  meta: "Ochiq teras",
  facts: "Bog‘ · Teras · Restoran va bar",
  blurb: "Tinch hovli, ochiq teras, restoran va bar.",
};

const ROOM_RULES: { id: RoomId; test: RegExp }[] = [
  { id: "deluxe", test: /deluxe|king\s*size|lyuks|люкс|кинг/i },
  { id: "twin", test: /\btwin\b|ikki alohida|твин|две отдельн/i },
  { id: "double", test: /\bdouble\b|ikki kishilik|katta karavot|дабл|двуспальн/i },
  { id: "single", test: /\bsingle\b|bir kishilik|сингл|одномест/i },
];

const ALL_ROOMS =
  /qanday xona|qaysi xona|xonalar bor|xonalar haqida|all rooms|what rooms|какие номер|номера есть|номера есть|какие есть номер/i;
const ROOM_TOPIC = /xona|xonalar|\broom\b|\brooms\b|номер|номера|karavot|кровать|yotoq/i;
const THIS_ROOM = /bu xona|shu xona|this room|этот номер|об этом номер/i;
const FOOD = /nonushta|restoran|taom|ovqat|breakfast|restaurant|обед|ужин|halol|халяль|bar\b|teras/i;
const BOOK = /bron|band qil|narx|price|book|заброн|стоимость|qabulxona|регистрац/i;
const GARDEN_TOPIC = /bog‘|bog'|hovli|garden|сад|teras/i;

function roomFromPath(path: string | undefined): RoomId | null {
  const slug = path?.match(/^\/rooms\/([^/]+)/)?.[1];
  if (slug === "standard-room") return "single";
  if (slug === "sea-view-room") return "twin";
  if (slug === "executive-suite") return "deluxe";
  return null;
}

function namedRooms(text: string): RoomId[] {
  return ROOM_RULES.filter((rule) => rule.test.test(text)).map((rule) => rule.id);
}

export function pickAssistantCards(
  message: string,
  reply: string,
  path?: string,
): AssistantCard[] {
  const ask = message;
  const spoken = `${message}\n${reply}`;
  const cards: AssistantCard[] = [];
  const seen = new Set<string>();

  const push = (card: AssistantCard) => {
    if (seen.has(card.href + card.title)) return;
    seen.add(card.href + card.title);
    cards.push(card);
  };

  const here = roomFromPath(path);
  const askedTypes = namedRooms(ask);
  const mentioned = namedRooms(spoken);
  const wantsRooms = ROOM_TOPIC.test(ask) || THIS_ROOM.test(ask) || askedTypes.length > 0;

  if (ALL_ROOMS.test(ask) || (wantsRooms && askedTypes.length === 0 && !THIS_ROOM.test(ask))) {
    (["deluxe", "double", "twin", "single"] as RoomId[]).forEach((id) => push(ROOMS[id]));
  } else if (THIS_ROOM.test(ask) && here) {
    push(ROOMS[here]);
  } else if (askedTypes.length > 0) {
    askedTypes.forEach((id) => push(ROOMS[id]));
  } else if (wantsRooms && mentioned.length > 0) {
    mentioned.forEach((id) => push(ROOMS[id]));
  } else if (here && /haqida|nimalar bor|qanday|about|что внутри/i.test(ask)) {
    push(ROOMS[here]);
  }

  if (FOOD.test(ask)) push(DINING);
  if (GARDEN_TOPIC.test(ask) && !FOOD.test(ask)) push(GARDEN);
  if (BOOK.test(ask)) push(BOOKING);

  return cards.slice(0, 5);
}
