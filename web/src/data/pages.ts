const CDN =
  "https://cdn.prod.website-files.com/6927ddcc377dce6e20188e35";

export type PageIntro = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  intro: string;
  image: string;
  metaDescription: string;
};

export const pageIntros = {
  about: {
    eyebrow: "Yillar tajribasi",
    title: "Shahar markazidagi joy",
    subtitle:
      "Sizning qulayligingiz — bizning maqsadimiz; har bir lahza uydek his qilishingiz uchun yaratiladi",
    intro:
      "Mehmonxona qulaylik, g‘amxo‘rlik va ishonchga asoslangan — chinakam mehmondo‘stlik va mehmon mamnuniyati bilan o‘ylab ishlangan yashashlarni taklif etadi.",
    image: `${CDN}/69452c5ad14c210fde417f7d_6e8b8f07617e02360fd36671319429eb_about-banner-image.webp`,
    metaDescription:
      "Mehmonxona — qulaylik, g‘amxo‘rlik va chinakam mehmondo‘stlik bilan yaratilgan dam olish.",
  },
  rooms: {
    title: "Xonalarimiz",
    subtitle: "Sof qulaylikda uxlang",
    intro:
      "Zamonaviy interyer, yumshoq to‘shak va dam olish uchun zarur qulayliklarga ega Mehmonxona xonalarini kashf eting.",
    image: `${CDN}/694e312f0951a14b785ffd15_e568dbb1f01f309400cbfb4d237ffe6a_room-page-banner-image.webp`,
    metaDescription:
      "Mehmonxona xonalari — qulaylik va uslub uchun zamonaviy interyerlar.",
  },
  amenities: {
    eyebrow: "Qulayliklar haqida",
    title: "Har bir mehmon uchun a’lo qulayliklar",
    intro:
      "Bog‘, teras, restoran va bar. 24 soat qabulxona, bepul Wi-Fi, bepul avtoturargoh va aeroport transferi.",
    image: `${CDN}/69527b3a5274ffb6de3d0349_image%20447-Picsart-AiImageEnhancer%201%20(1).webp`,
    metaDescription:
      "Mehmonxona qulayliklari — bog‘, teras, restoran, bar va transfer.",
  },
  banquet: {
    title: "Restoran va teras",
    intro:
      "Restoran, bar va Ochiq teras. Shahar manzarasi teradan ko‘rinadi. Alohida banket zali e’lon qilinmagan.",
    image: `${CDN}/6954dfb0643940014e8d7c27_image%20453-Picsart-AiImageEnhancer%201%20(1).webp`,
    metaDescription:
      "Mehmonxona — restoran va shahar manzarali teras.",
  },
  spa: {
    title: "Bog‘, teras va tinch hovli",
    subtitle: "Alohida SPA ro‘yxati yo‘q",
    intro:
      "Dam olish bog‘, hovli va ochiq terada. Teradan shahar manzarasi ko‘rinishi mumkin.",
    image: `${CDN}/6953b6cbe9d3fb1df0e77f56_5a6f785dfa85045b71d807cfaff4a76a_spa-banner-image.webp`,
    metaDescription:
      "Mehmonxona — bog‘, teras va hovli.",
  },
  restaurant: {
    eyebrow: "Xizmat haqida",
    title: "Uslub bilan taqdim etilgan mazali taomlar",
    intro:
      "Ajoyib ta’m va nafislik uyg‘unlashgan ovqatlanish. Mehmonxona restoranida yangi mahsulotlar, mazali oshxona va iliq muhit.",
    image: `${CDN}/6954e9698b2e3670bc6d4911_image%20490-Picsart-AiImageEnhancer%20(1)%201%20(1).webp`,
    metaDescription:
      "Mehmonxona restorani — mazali taomlar va iliq atmosfera.",
  },
  blog: {
    title: "Bloglarimizni o‘qing",
    intro:
      "Sayohat maslahatlari, mehmonxona yangiliklari va mehmondo‘stlik hikoyalari — Mehmonxona blogida.",
    image: `${CDN}/695645e0708c845e290a1f9e_image%20508-Picsart-AiImageEnhancer%201%20(1).webp`,
    metaDescription:
      "Mehmonxona blog — sayohat va mehmondo‘stlik haqida foydali maqolalar.",
  },
  contact: {
    eyebrow: "Aloqa",
    title: "Suhbatni boshlang",
    subtitle: "Biz bilan bog‘laning",
    intro:
      "Savolingiz bormi? Bron, qulayliklar, ovqatlanish yoki maxsus so‘rovlar bo‘yicha jamoamiz tez yordam beradi.",
    image: `${CDN}/6954b29b8505845a7463cc60_image%20506-Picsart-AiImageEnhancer%201%20(1).webp`,
    metaDescription:
      "Mehmonxona bilan bog‘laning — bron va xizmatlar bo‘yicha savollaringiz uchun.",
  },
} satisfies Record<string, PageIntro>;

export const aboutFeatures = [
  {
    title: "E’tiborli mehmondo‘stlik",
    body: "Har bir yashash — e’tiborli xizmat, tinch muhit va mehmonni kelganidan ketgunicha chinakam kutib oladigan detallar bilan shakllanadi.",
  },
  {
    title: "Qulaylik uchun yaratilgan",
    body: "Xonalar, lounge va umumiy joylar nafis dizayn bilan amaliy qulaylikni uyg‘unlashtiradi — biznes va dam olish mehmonlari uchun.",
  },
  {
    title: "Mahalliy ildizlar",
    body: "Ovqatlanishdan tavsiyalargacha — shahar ruhini his qildiramiz, mehmonxona tajribasini esa oson saqlaymiz.",
  },
];

export const amenityItems = [
  {
    title: "Bog‘ va hovli",
    body: "Mehmonxona bog‘i va hovlisida tinch dam olish.",
  },
  {
    title: "Kir yuvish",
    body: "Kir yuvish xonasi soat 08:00 dan 18:00 gacha ishlaydi.",
  },
  {
    title: "Ochiq teras",
    body: "Terasdan shahar manzarasi ko‘rinishi mumkin.",
  },
  {
    title: "Konsyerj yordami",
    body: "Bron, transfer, restoran band qilish va maxsus so‘rovlar — kerak bo‘lganda yordam.",
  },
  {
    title: "Biznes uchun tayyor",
    body: "Tezkor Wi-Fi, uchrashuvga qulay burchaklar va samarali ish uchun tinch joylar.",
  },
  {
    title: "Oilaviy qulay",
    body: "Bolalar bilan sayohatni osonlashtiradigan moslashuvchan xona variantlari va qo‘shimchalar.",
  },
];

export const banquetHighlights = [
  "Restoran",
  "Bar",
  "Ochiq teras",
  "Shahar manzarasi",
  "Bufet nonushta",
  "Halol va alakart taomlar",
];

export const spaTreatments = [
  {
    title: "Bog‘ va hovli",
    body: "Mehmonxona bog‘i va hovlisida tinch dam olish.",
  },
  {
    title: "Ochiq teras",
    body: "Shahar manzarasi shu teradan ko‘rinadi.",
  },
  {
    title: "Restoran va bar",
    body: "Bufet nonushta, alakart va halol taomlar.",
  },
  {
    title: "Aeroport transferi",
    body: "Aeroport yaqin. Transferni qabulxonadan so‘rang.",
  },
];

export const restaurantHighlights = [
  "Bufet nonushta, 07:00–10:00",
  "Alakart taomlar",
  "Halol oshxona",
  "Nonushta bilan tarif",
  "Xona xizmati",
  "Bar",
];
