const CDN_POST =
  "https://cdn.prod.website-files.com/693106e31a556f4c90b2ff6a";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category?: string;
  author?: string;
  body: string[];
};

const sharedBodyBlocks = [
  "Hashamatli xonalardan mahalliy javohirlargacha — blogimiz har bir dam olishni abadiy xotiraga aylantiradigan hikoya va ma’lumotlarni ulashadi",
  "Strategiya, ilhom va hissiyotni bog‘laydigan hikoya, maslahat va ma’lumotlarga sho‘ng‘ing — unutilmas tajribalar uchun",
  "Mehmondo‘stlik yuragini ochadigan va har bir mehmonxona dam olishini unutilmas qiladigan hikoya va maslahatlarni kashf eting",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "creating-memorable-stays-through-genuine-hospitality",
    title: "Chinakam mehmondo‘stlik orqali unutilmas dam olish",
    excerpt:
      "Tanlangan hikoyalar — o‘ylab ishlangan dizayn, iliq xizmat, nafis ovqatlanish va mahalliy tajribalar har bir dam olishni abadiy xotiraga aylantiradi.",
    image: `${CDN_POST}/695b3bb9394b4ab580c6adae_image-Picsart-AiImageEnhancer%20(7)%201%20(2).webp`,
    date: "21-yanvar, 2026",
    category: "Ovqat menyusi",
    author: "Avazov Og‘abek",
    body: [
      "Har bir mehmonxona dam olishini unutilmas qiladigan hikoya va ma’lumotlarni kashf eting",
      ...sharedBodyBlocks,
    ],
  },
  {
    slug: "making-every-business-event-smooth-and-memorable",
    title: "Har bir biznes tadbirini silliq va unutilmas qilish",
    excerpt:
      "Nafis xonalar, e’tiborli xizmat va mahalliy kashfiyotlar — oddiy dam olishni unutilmas tajribaga aylantiruvchi ortidagi hikoyalar.",
    image: `${CDN_POST}/695b3bc626bdde8ccb66ede0_image-Picsart-AiImageEnhancer%20(5)%201%20(2).webp`,
    date: "21-yanvar, 2026",
    category: "Mehmonxona tadbiri",
    author: "Avazov Og‘abek",
    body: [
      "Har bir mehmonxona dam olishini unutilmas qiladigan hikoya va ma’lumotlarni oching",
      ...sharedBodyBlocks,
    ],
  },
  {
    slug: "indulge-in-luxurious-rooms-with-panoramic-sea-views",
    title: "Ikki alohida karavot, ish joyi, bepul Wi-Fi va konditsioner.",
    excerpt:
      "Nafis qulaylik, shaxsiy xizmat va mahalliy joziba haqidagi ilhomli hikoyalar — mehmonlar uzoq eslab qoladigan mazmunli dam olish.",
    image: `${CDN_POST}/695b3bd55fed08c9b8eee002_image%20511%20(2).webp`,
    date: "21-yanvar, 2026",
    category: "Sayohat",
    author: "Avazov Og‘abek",
    body: [
      "Har bir mehmonxona dam olishini unutilmas qiladigan hikoya va ma’lumotlarni kashf eting",
      ...sharedBodyBlocks,
    ],
  },
  {
    slug: "a-taste-journey-through-our-hotels-finest-culinary-creations",
    title: "Mehmonxonamizning eng yaxshi oshxona ijodiyoti bo‘ylab ta’m sayohati",
    excerpt:
      "Uslubli xonalar, nafis ovqatlanish, e’tiborli xizmat va chinakam mahalliy lahzalar ortidagi tafsilotlar haqida foydali hikoyalar.",
    image: `${CDN_POST}/695b3be980836a102f8ce989_image-Picsart-AiImageEnhancer%20(4)%201%20(2).webp`,
    date: "21-yanvar, 2026",
    category: "Mazali taom",
    author: "Avazov Og‘abek",
    body: [
      "Har bir mehmonxona dam olishini unutilmas qiladigan hikoya va ma’lumotlarni kashf eting",
      "Hashamatli xonalardan mahalliy javohirlargacha — blogimiz har bir dam olishni abadiy xotiraga aylantiradi",
      sharedBodyBlocks[1],
      sharedBodyBlocks[2],
    ],
  },
  {
    slug: "open-the-door-to-roomy-living-made-for-whatever-you-want",
    title: "Istalgan maqsadga mos keng yashash eshigini oching",
    excerpt:
      "Qulaylik, ijod va g‘amxo‘rlikni nishonlaydigan tanlangan hikoyalar — o‘ylab topilgan detallar har bir dam olishni yuksaltiradi.",
    image: `${CDN_POST}/695b3c069765b079b0346bc5_pexels-ahmetcotur-31817153-Picsart-AiImageEnhancer%201%20(2).webp`,
    date: "21-yanvar, 2026",
    category: "Dam olish",
    author: "Avazov Og‘abek",
    body: [
      "Har bir mehmonxona dam olishini unutilmas qiladigan hikoya va ma’lumotlarni kashf eting",
      ...sharedBodyBlocks,
    ],
  },
  {
    slug: "enjoy-a-vacation-that-feels-like-a-touch-of-heaven",
    title: "Jannatdek dam olishni his eting",
    excerpt:
      "Nafis dizayn, ilhomli ovqatlanish va shaxsiy xizmat haqidagi mehmondo‘stlik hikoyalari — oddiy tashrifni unutilmas dam olishga aylantiradi.",
    image: `${CDN_POST}/695b3c1cd763a2a11296bdef_image-Picsart-AiImageEnhancer%20(2)%201%20(2).webp`,
    date: "21-yanvar, 2026",
    author: "Avazov Og‘abek",
    body: [
      "Har bir mehmonxona dam olishini unutilmas qiladigan hikoya va ma’lumotlarni kashf eting",
      ...sharedBodyBlocks,
    ],
  },
  {
    slug: "crafting-special-events-that-turn-into-memories-youll-treasure",
    title: "Qadrlaydigan xotiralarga aylanadigan maxsus tadbirlar",
    excerpt:
      "Nafis maydonlar, iliq xizmat va mahalliy madaniyat uyg‘unligi — har bir dam olishni maxsus va uzoq esda qoladigan qiladi.",
    image: `${CDN_POST}/695b3c31ae117b4f685d4e3d_image-Picsart-AiImageEnhancer%20(3)%201%20(2).webp`,
    date: "21-yanvar, 2026",
    body: [
      "Har bir mehmonxona dam olishini unutilmas qiladigan hikoya va ma’lumotlarni oching",
      ...sharedBodyBlocks,
    ],
  },
  {
    slug: "discover-the-latest-menu-updates-coming-this-march",
    title: "Mart oyidagi eng so‘nggi menyu yangilanishlarini kashf eting",
    excerpt:
      "Mehmondo‘stlik san’atini aks ettiruvchi hikoyalar — chiroyli xonalardan har bir mehmonda iz qoldiradigan mahalliy tajribalargacha.",
    image: `${CDN_POST}/695b3c409f475ee318c50c0d_image-Picsart-AiImageEnhancer%20(1)%201%20(2).webp`,
    date: "21-yanvar, 2026",
    body: [
      "Har bir mehmonxona dam olishini unutilmas qiladigan hikoya va ma’lumotlarni kashf eting",
      ...sharedBodyBlocks,
    ],
  },
  {
    slug: "the-april-issue-of-travel-magazine-featured-elbergo-hotel",
    title: "Mehmonxonada dam olish: nimalarga e’tibor berish kerak",
    excerpt:
      "Har bir dam olish ortida qulaylik, g‘amxo‘rlik va detal bor — mehmonxonalar qanday mazmunli tajriba yaratishini kashf eting.",
    image: `${CDN_POST}/695b3c537b6f44e4fa4251e6_image-Picsart-AiImageEnhancer%201%20(2).webp`,
    date: "21-yanvar, 2026",
    body: [
      "Har bir mehmonxona dam olishini unutilmas qiladigan hikoya va ma’lumotlarni kashf eting",
      ...sharedBodyBlocks,
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
