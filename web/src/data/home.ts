const CDN =
  "https://cdn.prod.website-files.com/6927ddcc377dce6e20188e35";

export const homeHero = {
  title: "Hashamatli qulaylik va tinchlik uchun mukammal dam olish",
  cta: "Dam olishni bron qiling",
  ctaHref: "/contact",
  offer: "Chegirma — cheklangan muddat",
  poster: `${CDN}/694e6076e77e5b3348ce2188_18705145-hd_1920_1080_30fps%20(1)_poster.0000000.jpg`,
  videoWebm: `${CDN}/694e6076e77e5b3348ce2188_18705145-hd_1920_1080_30fps%20(1)_webm.webm`,
  videoMp4: `${CDN}/694e6076e77e5b3348ce2188_18705145-hd_1920_1080_30fps%20(1)_mp4.mp4`,
};

export const homeAbout = {
  eyebrow: "Biz haqimizda",
  titles: [
    "Dengizga qaragan shahar markazi",
    "Okean manzarali shahar markazi",
    "Sohilbo‘yi shahar markazi",
  ],
  body: "Har bir yashashda unutilmas lahzalar yaratish uchun qulaylik, nafislik va a’lo xizmat uyg‘unlashgan mehmondo‘stlikni his eting",
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
    name: "Deluxe dengiz manzarali xona",
    blurb:
      "Zamonaviy interyer, premium qulayliklar va hayratlanarli dengiz manzarasi bilan Deluxe xonamizda tengsiz qulaylikni his eting",
    size: "350 kv.fut",
    view: "Panoramik dengiz manzarasi",
    features: "King karavot, balkon manzarasi, Smart TV",
    perfectFor: "Juftliklar va dam oluvchilar",
    image: `${CDN}/69316279603aa77764416443_image%2015-Picsart-AiImageEnhancer%201.webp`,
  },
  {
    name: "Dengiz manzarali King xona",
    blurb:
      "Nafis interyer, zamonaviy qulayliklar va keng dengiz manzarasiga ega Premium xonada yuqori darajadagi qulaylikdan bahramand bo‘ling",
    size: "380 kv.fut",
    view: "Sohilbo‘yi dengiz manzarasi",
    features: "Queen karavot, shahar manzarasi, Smart TV",
    perfectFor: "Juftliklar va dam olish kunlari",
    image: `${CDN}/694a220502bfae7bbbd483da_image%2014-Picsart-AiImageEnhancer%201.webp`,
  },
  {
    name: "Dengiz manzarali juft xona",
    blurb:
      "Nafis bezak, yuqori sifatli jihozlar va sohil panoramasiga ega hashamatli xonada dam oling",
    size: "450 kv.fut",
    view: "Manzarali sohil panoramasi",
    features: "King karavot, dengiz manzarasi, Smart TV",
    perfectFor: "Dam oluvchilar va asal oyi juftliklari",
    image: `${CDN}/694a22058acf0ce292e687df_image%20432-Picsart-AiImageEnhancer%201.webp`,
  },
  {
    name: "Dengiz manzarali klub xona",
    blurb:
      "Uslubli interyer, o‘ylab topilgan qulayliklar va tinchlantiruvchi dengiz manzarasiga ega Ijrochi xonada nafis yashashni his eting",
    size: "420 kv.fut",
    view: "Uzilmagan okean ufqi",
    features: "King karavot, dengiz balconi, Smart TV",
    perfectFor: "Juftliklar va sayyohlar",
    image: `${CDN}/694a22051baed5b350dc6d7d_image%20430-Picsart-AiImageEnhancer%201.webp`,
  },
];

export const homeStats = {
  intro:
    "O‘nlab yillik ishonchli xizmat va minglab sodiq mehmonlar unutilmas dam olish yaratishga sodiqligimizni ko‘rsatadi",
  items: [
    { value: "98%", label: "Mehmon ehtiyojlari oldindan hisobga olingan" },
    { value: "85%", label: "Qaytib keluvchi mehmonlar ulushi" },
    { value: "40%", label: "Shaxsiy butler xizmati" },
    { value: "25", label: "Mehmondo‘stlik va ovqatlanish mukofotlari" },
    { value: "90+", label: "Dengiz/shahar manzarali xonalar" },
    { value: "4.9", label: "O‘rtacha yulduz reytingi" },
    { value: "200", label: "Tanlangan vino kolleksiyasi" },
    { value: "5+", label: "Mukofotli restoranlar" },
  ],
  images: [
    `${CDN}/6932619969ad70245135cf5a_image%20391-Picsart-AiImageEnhancer%20(1)%201.webp`,
    `${CDN}/6932616fcf7cf36ded1a13d4_image%20388-Picsart-AiImageEnhancer%201.webp`,
    `${CDN}/6932616f50656eb91097c8bb_image%20390-Picsart-AiImageEnhancer%201.webp`,
    `${CDN}/6932616fdf1a9a0d22fcfbb8_image%20389-Picsart-AiImageEnhancer%201.webp`,
  ],
};

export const homeBusiness = {
  title: "Biznes va tadbir maydonlari",
  body: "Uchrashuv, konferensiya, seminar va bayramlar uchun moslashuvchan biznes maydonlarimiz zamonaviy qulayliklar va professional muhit bilan jihozlangan",
  cta: "Tadbir maydonini bron qilish",
  ctaHref: "/banquet",
  images: [
    `${CDN}/693266cb0d38c5e5209caa4e_image%2016-Picsart-AiImageEnhancer%201.webp`,
    `${CDN}/693267e620071783e1ab606b_2150167242%201.webp`,
  ],
};

export const homeDining = {
  eyebrow: "Ovqatlanish tajribasi",
  title:
    "Har bir taom hikoya aytadigan, har bir ta’m maftun etadigan va har bir lahza unutilmas bo‘lgan oshxona makonini kashf eting",
  tags: [
    "Tashqi/teras o‘rindiqlari",
    "Moslashtirilgan menyu variantlari",
    "Kundalik bepul nonushta",
    "Bir nechta restoran",
    "Keng vino ro‘yxati",
    "Shaxsiy ovqatlanish",
    "Imzoli fine dining",
    "Mavzuli kokteyl bar/lounge",
    "Mahalliy mahsulotlar",
    "Jonli oshxona",
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
    label: "basseyn",
    src: `${CDN}/69438ddf3b026974c61e1d8e_image%20213-Picsart-AiImageEnhancer%201.webp`,
  },
  {
    label: "banket",
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
    name: "Avazov Og‘abek",
    role: "Fullstack dasturchi va dizayner",
    quote:
      "Har bir detalga e’tibor va mehmon uchun qulay tajriba yaratish — Classic Apartment va Huquqiy texnologiyalar va sun’iy intellekt laboratoriyasi MChJ jamoasi uchun muhim qadriyat.",
    image: `${CDN}/6943a0c6112009db1bcc3d53_Mask%20group%20-%202025-12-18T120456.254.webp`,
  },
];

export const homeCta = {
  title: "Oddiylikdan chiqing va premium mehmondo‘stlikdan bahramand bo‘ling",
  cta: "Hozir bron qiling",
  ctaHref: "/contact",
  image: `${CDN}/693b8de4d00c720d07d2645c_image%2026-Picsart-AiImageEnhancer%201%20(1).webp`,
};
