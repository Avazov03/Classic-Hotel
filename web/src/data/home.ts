const CDN =
  "https://cdn.prod.website-files.com/6927ddcc377dce6e20188e35";

export const homeHero = {
  title: "Gur Emir Palace — Samarqanddagi tinch mehmonxona",
  cta: "Dam olishni bron qiling",
  ctaHref: "/contact",
  offer: "Bron kunida 15% chegirma",
  poster: `${CDN}/694e6076e77e5b3348ce2188_18705145-hd_1920_1080_30fps%20(1)_poster.0000000.jpg`,
  videoWebm: `${CDN}/694e6076e77e5b3348ce2188_18705145-hd_1920_1080_30fps%20(1)_webm.webm`,
  videoMp4: `${CDN}/694e6076e77e5b3348ce2188_18705145-hd_1920_1080_30fps%20(1)_mp4.mp4`,
};

export const homeAbout = {
  eyebrow: "Biz haqimizda",
  titles: [
    "Samarqand markazi",
    "Tarixiy shahar",
    "Gur Emir yonida",
  ],
  body: "Bog‘, teras, restoran va bar — Samarqanddagi tinch mehmonxona",
  cta: "Xonalarni ko‘rish",
  ctaHref: "/rooms",
  images: [
    `${CDN}/6931319859f3f47cbae93570_image%209-Picsart-AiImageEnhancer%201.webp`,
    `${CDN}/69313766db72be49e3b25c9d_image%208-Picsart-AiImageEnhancer%201.webp`,
    `${CDN}/69313766c80bb7026ddf9a8f_febrian-zakaria-gwV9eklemSg-unsplash-Picsart-AiImageEnhancer%201.webp`,
  ],
} as const;

export const featuredRooms = [
  {
    name: "Deluxe king size",
    blurb:
      "25 m² lik xona: king size karavot, shkaf, alohida hammom, fen, terlik, sochiqlar, televizor, elektr choynak va ish stoli.",
    size: "25 m²",
    view: "Shaharning tarixiy qismi mumkin",
    features: "King size, hammom, televizor",
    perfectFor: "Juftliklar va dam oluvchilar",
    image: `${CDN}/69316279603aa77764416443_image%2015-Picsart-AiImageEnhancer%201.webp`,
  },
  {
    name: "Standard Double",
    blurb:
      "Bitta katta karavotli ikki kishilik xona. Zamonaviy interyer va yashash uchun zarur qulayliklar.",
    size: "Ikki kishilik",
    view: "Bitta katta karavot",
    features: "Katta karavot, televizor",
    perfectFor: "Juftliklar va dam olish kunlari",
    image: `${CDN}/694a220502bfae7bbbd483da_image%2014-Picsart-AiImageEnhancer%201.webp`,
  },
  {
    name: "Standard Twin",
    blurb:
      "26 m². Ikki alohida karavot, ish joyi, bepul Wi-Fi va konditsioner.",
    size: "26 m²",
    view: "Ikki alohida karavot",
    features: "Ikki karavot, 26 m², Wi-Fi",
    perfectFor: "Dam oluvchilar va asal oyi juftliklari",
    image: `${CDN}/694a22058acf0ce292e687df_image%20432-Picsart-AiImageEnhancer%201.webp`,
  },
  {
    name: "Standard Single",
    blurb:
      "15 m² lik bir kishilik xona: shkaf, seyf, alohida hammom, televizor, elektr choynak va ish stoli.",
    size: "15 m²",
    view: "15 m²",
    features: "Seyf, fen, ish stoli",
    perfectFor: "Juftliklar va sayyohlar",
    image: `${CDN}/694a22051baed5b350dc6d7d_image%20430-Picsart-AiImageEnhancer%201.webp`,
  },
];

export const homeStats = {
  intro:
    "Samarqandda, Shohruh Mirzo ko‘chasida: bog‘, teras, restoran, bar va 24 soat qabulxona",
  items: [
    { value: "7 km", label: "Samarqand aeroporti" },
    { value: "24 soat", label: "Qabulxona" },
    { value: "07:00", label: "Bufet nonushta boshlanadi" },
    { value: "6", label: "Xona toifasi" },
    { value: "4", label: "Qavatdagi tarixiy teras" },
    { value: "Bepul", label: "Avtoturargoh va Wi-Fi" },
    { value: "Halol", label: "Alakart taomlar" },
    { value: "10:00", label: "Nonushta tugaydi" },
  ],
  images: [
    `${CDN}/6932619969ad70245135cf5a_image%20391-Picsart-AiImageEnhancer%20(1)%201.webp`,
    `${CDN}/6932616fcf7cf36ded1a13d4_image%20388-Picsart-AiImageEnhancer%201.webp`,
    `${CDN}/6932616f50656eb91097c8bb_image%20390-Picsart-AiImageEnhancer%201.webp`,
    `${CDN}/6932616fdf1a9a0d22fcfbb8_image%20389-Picsart-AiImageEnhancer%201.webp`,
  ],
};

export const homeBusiness = {
  title: "Teras va restoran",
  body: "4-qavatdagi terasdan shaharning tarixiy qismi ko‘rinadi. Restoranda bufet nonushta, alakart va halol taomlar.",
  cta: "Narxni so‘rash",
  ctaHref: "/banquet",
  images: [
    `${CDN}/693266cb0d38c5e5209caa4e_image%2016-Picsart-AiImageEnhancer%201.webp`,
    `${CDN}/693267e620071783e1ab606b_2150167242%201.webp`,
  ],
};

export const homeDining = {
  eyebrow: "Ovqatlanish tajribasi",
  title:
    "Har kuni bufet nonushta, alakart va halol taomlar. Nonushta 07:00 dan 10:00 gacha.",
  tags: [
    "Teras",
    "Restoran",
    "Bar",
    "Bufet nonushta, 07:00–10:00",
    "Halol taomlar",
    "Alakart",
    "Xona xizmati",
  ],
  images: [
    `${CDN}/69327199f5558c90f6e5c83f_Mask%20group%20-%202025-12-05T110746.363%20(1).webp`,
    `${CDN}/693273db74c49f01f74eac4d_Mask%20group%20-%202025-12-05T110817.299%20(1).webp`,
    `${CDN}/69327198d267c913caf8c986_Mask%20group%20-%202025-12-05T110844.683%20(1).webp`,
    `${CDN}/6966378eb6463dd27b293bb1_pexels-keeganjchecks-19199133%20(1)%201.webp`,
  ],
};

export const homeExperience = {
  eyebrow: "Nimani his qilasiz",
  title: "A’lo natijani kuting — biz tengsiz tajriba va’da qilamiz",
  cta: "Galereyani ko‘rish",
  ctaHref: "#gallery",
  items: [
    {
      title: "Silliq va do‘stona kutib olish",
      body: "Dam olishingizni oson boshlang — iliq kutib olish va samarali ro‘yxatdan o‘tish. Birinchi lahzadan qulayligingiz ustuvor.",
    },
    {
      title: "Tez va qulay ro‘yxatdan o‘tish",
      body: "Tez va muammosiz kirish — eshikdan o‘tganingizdan boshlab dam olish boshlanadi.",
    },
  ],
  images: [
    `${CDN}/6932aa6298bbb2085a04e48b_Mask%20group%20-%202025-12-05T151743.140.webp`,
    `${CDN}/6932aa62bc54d1e8a0f3884e_90549%201.webp`,
  ],
};

export const homeGallery = [
  {
    label: "bog‘",
    src: `${CDN}/69438ddf3b026974c61e1d8e_image%20213-Picsart-AiImageEnhancer%201.webp`,
  },
  {
    label: "teras",
    src: `${CDN}/69438ddf641c80e912060899_5697%201.webp`,
  },
  {
    label: "bufet",
    src: `${CDN}/69438de04d6267d938a345cf_9391%201.webp`,
  },
  {
    label: "mehmonxona",
    src: `${CDN}/69438ddfe3ab23cceada7edf_90549%201%20(1).webp`,
  },
];

export const homeTestimonials = [
  {
    name: "Emerson Geidt",
    role: "Lifestyle bloger va sayohat muallifi",
    quote:
      "Iliq kutib olishdan eng kichik e’tiborli detallargacha har bir lahza silliq va samimiy edi. Jamoa ehtiyojlarimizni oldindan bilib, a’lo xizmat ko‘rsatdi.",
    image: `${CDN}/6943a0c62611ec5f7d72661e_Mask%20group%20-%202025-12-18T120403.371.webp`,
  },
  {
    name: "Oliver Bennett",
    role: "Sayohat kontent yaratuvchisi",
    quote:
      "Boshidan oxirigacha a’lo — har bir muloqot chinakam, professional va e’tiborli edi. Muhit va xizmat kutganimizdan oshib ketdi.",
    image: `${CDN}/6943a0c6cfc7fa4f759608c3_Mask%20group%20-%202025-12-18T120540.982.webp`,
  },
  {
    name: "Mehmon",
    role: "Samarqand",
    quote:
      "Bog‘, teras va 24 soat qabulxona. Nonushta har kuni 07:00 dan 10:00 gacha.",
    image: `${CDN}/6943a0c6112009db1bcc3d53_Mask%20group%20-%202025-12-18T120456.254.webp`,
  },
];

export const homeCta = {
  title: "Samarqandda qoling — Gur Emir Palace",
  cta: "Hozir bron qiling",
  ctaHref: "/contact",
  image: `${CDN}/693b8de4d00c720d07d2645c_image%2026-Picsart-AiImageEnhancer%201%20(1).webp`,
};
