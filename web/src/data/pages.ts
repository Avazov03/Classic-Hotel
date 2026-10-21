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
    title: "Mukammal dam olishga xush kelibsiz",
    subtitle:
      "Sizning qulayligingiz — bizning maqsadimiz; har bir lahza uydek his qilishingiz uchun yaratiladi",
    intro:
      "Classic Apartment qulaylik, g‘amxo‘rlik va ishonchga asoslangan — chinakam mehmondo‘stlik va mehmon mamnuniyati bilan o‘ylab ishlangan yashashlarni taklif etadi.",
    image: `${CDN}/69452c5ad14c210fde417f7d_6e8b8f07617e02360fd36671319429eb_about-banner-image.webp`,
    metaDescription:
      "Classic Apartment — qulaylik, g‘amxo‘rlik va chinakam mehmondo‘stlik bilan yaratilgan dam olish.",
  },
  rooms: {
    title: "Xonalarimiz",
    subtitle: "Sof qulaylikda uxlang",
    intro:
      "Zamonaviy interyer, yumshoq to‘shak va dam olish uchun zarur qulayliklarga ega Classic Apartment xonalarini kashf eting.",
    image: `${CDN}/694e312f0951a14b785ffd15_e568dbb1f01f309400cbfb4d237ffe6a_room-page-banner-image.webp`,
    metaDescription:
      "Classic Apartment xonalari — qulaylik va uslub uchun zamonaviy interyerlar.",
  },
  amenities: {
    eyebrow: "Qulayliklar haqida",
    title: "Har bir mehmon uchun a’lo qulayliklar",
    intro:
      "Hashamat cho‘qqisida — jahon darajasidagi SPA va ajoyib ovqatlanish. Zamonaviy imkoniyatlar va o‘ylab topilgan xizmatlar bilan tinch dam olish uchun qulayliklar.",
    image: `${CDN}/69527b3a5274ffb6de3d0349_image%20447-Picsart-AiImageEnhancer%201%20(1).webp`,
    metaDescription:
      "Classic Apartment qulayliklari — SPA, ovqatlanish va zamonaviy xizmatlar.",
  },
  banquet: {
    title: "Nafis banket maydonlari",
    intro:
      "To‘y, yig‘ilish va tadbirlar uchun nafis maydonlar, zamonaviy imkoniyatlar va e’tiborli xizmat — Classic Apartment banketida.",
    image: `${CDN}/6954dfb0643940014e8d7c27_image%20453-Picsart-AiImageEnhancer%201%20(1).webp`,
    metaDescription:
      "Classic Apartment banket maydonlari — to‘y va korporativ tadbirlar uchun.",
  },
  spa: {
    title: "Tana, ruh va ongni yangilang",
    subtitle:
      "Muvozanat va ichki osoyishtalikni tiklaydigan sog‘lomlashtirish tajribalari",
    intro:
      "Classic Apartment SPAda tinchlantiruvchi muolajalar, osoyishta muhit va mutaxassis g‘amxo‘rlik bilan dam oling.",
    image: `${CDN}/6953b6cbe9d3fb1df0e77f56_5a6f785dfa85045b71d807cfaff4a76a_spa-banner-image.webp`,
    metaDescription:
      "Classic Apartment SPA — tinchlantiruvchi muolajalar va osuda muhit.",
  },
  restaurant: {
    eyebrow: "Xizmat haqida",
    title: "Uslub bilan taqdim etilgan mazali taomlar",
    intro:
      "Ajoyib ta’m va nafislik uyg‘unlashgan ovqatlanish. Classic Apartment restoranida yangi mahsulotlar, mazali oshxona va iliq muhit.",
    image: `${CDN}/6954e9698b2e3670bc6d4911_image%20490-Picsart-AiImageEnhancer%20(1)%201%20(1).webp`,
    metaDescription:
      "Classic Apartment restorani — mazali taomlar va iliq atmosfera.",
  },
  blog: {
    title: "Bloglarimizni o‘qing",
    intro:
      "Sayohat maslahatlari, mehmonxona yangiliklari va mehmondo‘stlik hikoyalari — Classic Apartment blogida.",
    image: `${CDN}/695645e0708c845e290a1f9e_image%20508-Picsart-AiImageEnhancer%201%20(1).webp`,
    metaDescription:
      "Classic Apartment blog — sayohat va mehmondo‘stlik haqida foydali maqolalar.",
  },
  contact: {
    eyebrow: "Aloqa",
    title: "Suhbatni boshlang",
    subtitle: "Biz bilan bog‘laning",
    intro:
      "Savolingiz bormi? Bron, qulayliklar, ovqatlanish yoki maxsus so‘rovlar bo‘yicha jamoamiz tez yordam beradi.",
    image: `${CDN}/6954b29b8505845a7463cc60_image%20506-Picsart-AiImageEnhancer%201%20(1).webp`,
    metaDescription:
      "Classic Apartment bilan bog‘laning — bron va xizmatlar bo‘yicha savollaringiz uchun.",
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
    title: "Wellness va SPA",
    body: "Sayohat yoki shahar kuni oxirida kuchni tiklash uchun tinchlantiruvchi muolajalar va osoyishta joylar.",
  },
  {
    title: "Fitnes studio",
    body: "Zamonaviy jihozlar va moslashuvchan soatlar — mehmonxonadan chiqmasdan mashq qiling.",
  },
  {
    title: "Basseyn va teras",
    body: "Ochiq havoda dam olish: basseyn yonidagi o‘rindiqlar va osuda o‘tish.",
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
  "To‘y va ziyofatlar",
  "Korporativ uchrashuvlar",
  "Shaxsiy bayramlar",
  "Seminar va retreatlar",
  "Zamonaviy AV qo‘llab-quvvatlash",
  "Moslashtirilgan katering menyulari",
];

export const spaTreatments = [
  {
    title: "Imzoli massaj",
    body: "Zo‘riqishni kamaytirish va chuqur dam olishga qaratilgan to‘liq tana muolajasi.",
  },
  {
    title: "Yuz rituallari",
    body: "Sayohatdan keyin yangilanish, namlanish va porlash uchun yuz muolajalari.",
  },
  {
    title: "Juftlik wellness",
    body: "Birgalikda tinchlanish va bog‘lanish uchun yaratilgan SPA lahzalari.",
  },
  {
    title: "Tana terapiyalari",
    body: "Charchagan mushaklarni jonlantiradigan skrab va o‘ramalar.",
  },
];

export const restaurantHighlights = [
  "Mavsumiy menyular",
  "Yangi mahalliy mahsulotlar",
  "Imzoli fine dining",
  "Nonushta kiritilgan variantlar",
  "Shaxsiy ovqatlanish xonalari",
  "Kokteyl lounge",
];
