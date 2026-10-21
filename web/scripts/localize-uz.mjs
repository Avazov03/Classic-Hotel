/**
 * Classic Apartment — kontaktlar + o‘zbek lotin tarjimasi (baseline HTML + data).
 * Run: node scripts/localize-uz.mjs
 */
import fs from "fs";
import path from "path";

const root = path.resolve("src");

const CONTACT = [
  ["(888) 456 7890", "+998 94 344 03 27"],
  ["tel:8884567890", "tel:+998943440327"],
  ["info@example.com", "avazovogabek86@gmail.com"],
  ["mailto:info@example.com", "mailto:avazovogabek86@gmail.com"],
  ["Classic Hotel", "Classic Apartment"],
  ["Elbergo Hotel", "Classic Apartment"],
  ["Elbergo", "Classic Apartment"],
  ["ELBERGO", "CLASSIC APARTMENT"],
  ["Lincoln Donin", "Avazov Og‘abek"],
  ["Aspen Stanton", "Avazov Og‘abek"],
  ["Alena Lipshutz", "Avazov Og‘abek"],
  [
    "410 Sandtown, California 94001, USA",
    "Toshkent shahri, Sayilgoh ko‘chasi, 35-uy, TDYU 4-o‘quv binosi, Kovorking markazi",
  ],
  ["Singapore Address :", "Toshkent manzili :"],
  ["Usa Address :", "Ofis manzili :"],
  ["https://www.facebook.com/", "https://t.me/Avazov_fit"],
  ["https://www.linkedin.com/", "https://www.linkedin.com/in/ogabek-avazov-78758038a/?isSelfProfile=true"],
  ["https://x.com/", "https://www.instagram.com/avazov_fit/"],
  ["https://twitter.com/", "https://www.instagram.com/avazov_fit/"],
];

const LOGO_DARK =
  "https://cdn.prod.website-files.com/6927ddcc377dce6e20188e35/696dc22ca41861cb65f3c85f_Yellow balck logo.svg";
const LOGO_LIGHT =
  "https://cdn.prod.website-files.com/6927ddcc377dce6e20188e35/693bb3bf7dca1f4ebbc97ea5_Group 1597885545.svg";
const LOGO_FOOTER =
  "https://cdn.prod.website-files.com/6927ddcc377dce6e20188e35/693bb45bfe6c1f77d06ffdfd_Group 1597885543.svg";
const LOGO_WHITE_NAV =
  "https://cdn.prod.website-files.com/6927ddcc377dce6e20188e35/696dc22c";

/** Longer / phrase replacements — order matters (longer first). */
const PHRASES = [
  // Topbar
  [
    "New year offer : Free room upgrade on all bookings",
    "Yangi yil taklifi: barcha bronlar uchun bepul xona yangilash",
  ],
  [
    "Exclusive website offer : Free breakfast for all guests!",
    "Sayt maxsus taklifi: barcha mehmonlarga bepul nonushta!",
  ],
  [
    "Complimentary airport pickup on 3+ night bookings",
    "3+ kechalik bronlarda bepul aeroport kutib olish",
  ],

  // Nav / UI
  ["Book now", "Bron qilish"],
  ["BOOK NOW", "BRON QILISH"],
  ["Reserve Your Stay", "Dam olishni bron qiling"],
  ["Reserve your stay", "Dam olishni bron qiling"],
  ["RESERVE YOUR STAY", "DAM OLISHNI BRON QILING"],
  ["Explore rooms", "Xonalarni ko‘rish"],
  ["Explore More", "Batafsil"],
  ["View Gallery", "Galereyani ko‘rish"],
  ["Book Event Space", "Tadbir maydonini bron qilish"],
  ["Experience comfort", "Qulaylikni his eting"],
  ["Experience Comfort", "Qulaylikni his eting"],
  ["open lightbox", "Kattalashtirish"],
  ["previous slide", "Oldingi"],
  ["next slide", "Keyingi"],
  ["reserve now", "Hozir bron qiling"],
  ["Submit", "Yuborish"],
  ["Menu", "Menyu"],
  ["MENU", "MENYU"],
  [">Home<", ">Bosh sahifa<"],
  [">home one<", ">bosh sahifa bir<"],
  [">home two<", ">bosh sahifa ikki<"],
  [">home three<", ">bosh sahifa uch<"],
  ["About us", "Biz haqimizda"],
  [">about<", ">Biz haqimizda<"],
  [">rooms<", ">Xonalar<"],
  [">Rooms<", ">Xonalar<"],
  ["Rooms", "Xonalar"],
  ["room detail", "xona tafsiloti"],
  ["Amenities", "Qulayliklar"],
  ["Banquet", "Banket"],
  [">blog<", ">Blog<"],
  ["Blog", "Blog"],
  ["blog one", "blog bir"],
  ["blog two", "blog ikki"],
  ["blog three", "blog uch"],
  ["blog post", "blog maqola"],
  ["Restaurant", "Restoran"],
  [">contact<", ">Aloqa<"],
  ["Contact", "Aloqa"],
  ["contact one", "aloqa bir"],
  ["contact two", "aloqa ikki"],
  ["contact three", "aloqa uch"],
  ["Password Protected", "Parol bilan himoyalangan"],
  ["Password protected", "Parol bilan himoyalangan"],
  ["Style guide", "Uslub qo‘llanmasi"],
  ["License", "Litsenziya"],
  ["Changelog", "O‘zgarishlar jurnali"],
  ["Call 24/7", "24/7 qo‘ng‘iroq"],
  ["GEt a call", "Qo‘ng‘iroq qiling"],
  ["Get a call", "Qo‘ng‘iroq qiling"],
  ["Facebook", "Telegram"],
  ["Instagram", "Instagram"],
  ["LinkedIn", "LinkedIn"],
  ["Follow us", "Bizni kuzating"],
  ["Useful links", "Foydali havolalar"],
  ["Pages", "Sahifalar"],
  ["Utility pages", "Yordamchi sahifalar"],
  ["Name :", "Ism :"],
  ["Email :", "Email :"],
  ["Phone :", "Telefon :"],
  ["Message", "Xabar"],
  ["1 Adult", "1 kattalar"],
  ["2 Adults", "2 kattalar"],
  ["3 Adults", "3 kattalar"],
  ["4 Adults", "4 kattalar"],
  ["1 Children", "1 bola"],
  ["2 Childrens", "2 bola"],
  ["3 Childrens", "3 bola"],
  ["4 Childrens", "4 bola"],
  ["Check - in", "Kirish"],
  ["Check - out", "Chiqish"],
  ["Check-in", "Kirish"],
  ["Check-out", "Chiqish"],
  [
    "I accept all terms and conditions for this booking.",
    "Ushbu bronlashning barcha shartlarini qabul qilaman.",
  ],
  ["Room DETAILS", "XONA TAFSILOTI"],
  ["ROOM DETAILS", "XONA TAFSILOTI"],
  ["Room Details", "Xona tafsiloti"],
  ["Room over view", "Xona haqida"],
  ["Room overview", "Xona haqida"],
  ["Rooms information", "Xona ma’lumotlari"],
  ["Hotel information", "Mehmonxona ma’lumoti"],
  ["HOTEL INFORMATION", "MEHMONXONA MA’LUMOTI"],
  ["Hotel amenities", "Mehmonxona qulayliklari"],
  ["HOTEL AMENITIES", "MEHMONXONA QULAYLIKLARI"],
  ["HIGHLIGHT:", "AJRATILGAN:"],
  ["Highlight:", "Ajratilgan:"],
  ["PRICE:", "NARX:"],
  ["Price:", "Narx:"],
  ["per night", "bir kecha"],
  ["Based on 100 reviewers", "100 ta sharh asosida"],
  ["Comfortable", "Qulaylik"],
  ["Facilities", "Imkoniyatlar"],
  ["Kids friendly", "Bolalar uchun qulay"],
  ["Pets friendly", "Hayvonlar uchun qulay"],
  ["Heated pool", "Isitiladigan basseyn"],
  ["Daily breakfast", "Kundalik nonushta"],
  ["Daily housekeeping", "Kundalik tozalash"],
  ["Airport pickup & drop", "Aeroport kutib olish va kuzatib qo‘yish"],
  ["24/7 Rooms service", "24/7 xona xizmati"],
  ["Complimentary breakfast", "Bepul nonushta"],
  ["Free Wi - Fi", "Bepul Wi-Fi"],
  ["Free Wi-Fi", "Bepul Wi-Fi"],
  ["In room safe", "Xonada seyf"],
  ["1 Bathroom", "1 hammom"],
  ["Minibar", "Minibar"],
  ["Coffee kit", "Qahva to‘plami"],
  ["Room cleaning", "Xona tozalash"],
  ["Standard Room", "Standart xona"],
  ["Sea View Room", "Dengiz manzarali xona"],
  ["Executive Suite", "Ijrochi lyuks"],
  ["Deluxe Sea View Room", "Deluxe dengiz manzarali xona"],
  ["Sea View King Room", "Dengiz manzarali King xona"],
  ["Sea View Twin Room", "Dengiz manzarali juft xona"],
  ["Sea View Club Room", "Dengiz manzarali klub xona"],
  ["About the hotel", "Mehmonxona haqida"],
  ["LIMITED-TIME DECEMBER DISCOUNT", "CHEGIRMA — CHEKLANGAN MUDDAT"],
  ["Limited-Time December Discount", "Chegirma — cheklangan muddat"],
  ["Days", "Kun"],
  ["Hours", "Soat"],
  ["Minutes", "Daqiqa"],
  ["Blog details", "Blog tafsiloti"],
  ["Read more", "Batafsil"],
  ["Back to blog", "Blogga qaytish"],
  ["January 21, 2026", "21-yanvar, 2026"],
  ["Food menu", "Ovqat menyusi"],
  ["Hotel event", "Mehmonxona tadbiri"],
  ["Travel hotel", "Sayohat va mehmonxona"],
  ["Enter your password*", "Parolingizni kiriting*"],
  ["Wrong password", "Noto‘g‘ri parol"],
  ["404", "404"],
  ["Page not found", "Sahifa topilmadi"],
  ["Go back home", "Bosh sahifaga qaytish"],
  ["Photography", "Fotografiya"],
  ["Typography", "Tipografiya"],
  ["Colors", "Ranglar"],

  // Hero / long marketing (common)
  [
    "Your perfect escape for luxury comfort and peace",
    "Hashamatli qulaylik va tinchlik uchun mukammal dam olish",
  ],
  [
    "YOUR PERFECT ESCAPE FOR LUXURY COMFORT AND PEACE",
    "HASHAMATLI QULAYLIK VA TINCHLIK UCHUN MUKAMMAL DAM OLISH",
  ],
  [
    "Experience refined hospitality where comfort elegance and exceptional service come together to create unforgettable moments during every stay",
    "Har bir yashashda unutilmas lahzalar yaratish uchun qulaylik, nafislik va a’lo xizmat uyg‘unlashgan mehmondo‘stlikni his eting",
  ],
  [
    "Decades of trusted service and thousands of loyal guests showcase our dedication to crafting remarkable stays",
    "O‘nlab yillik ishonchli xizmat va minglab sodiq mehmonlar unutilmas dam olish yaratishga sodiqligimizni ko‘rsatadi",
  ],
  [
    "Versatile business and event spaces designed to host meetings conferences and celebrations",
    "Uchrashuv, konferensiya va bayramlar uchun mo‘ljallangan ko‘p maqsadli biznes va tadbir maydonlari",
  ],
  [
    "Discover a culinary haven where every dish tells a story every flavor captivates and every moment is truly memorable",
    "Har bir taom hikoya aytadigan, har bir ta’m maftun etadigan va har bir lahza unutilmas bo‘lgan oshxona makonini kashf eting",
  ],
  [
    "Expect the exceptional We promise an experience beyond compare",
    "A’lo natijani kuting — biz tengsiz tajriba va’da qilamiz",
  ],
  [
    "A visual journey through our finest moments and experiences",
    "Eng yaxshi lahzalar va tajribalar orqali vizual sayohat",
  ],
  [
    "Escape the ordinary and enjoy premium hospitality",
    "Oddiylikdan chiqing va premium mehmondo‘stlikdan bahramand bo‘ling",
  ],
  [
    "We create unforgettable stay experiences by blending comfort, thoughtful care, and warm,  genuine hospitality that makes every guest feel truly valued",
    "Biz qulaylik, e’tiborli g‘amxo‘rlik va chinakam mehmondo‘stlikni uyg‘unlashtirib, har bir mehmon o‘zini qadrlangan his qiladigan unutilmas dam olish tajribasini yaratamiz",
  ],
  [
    "We create unforgettable stay experiences by blending comfort, thoughtful care, and warm, genuine hospitality that makes every guest feel truly valued",
    "Biz qulaylik, e’tiborli g‘amxo‘rlik va chinakam mehmondo‘stlikni uyg‘unlashtirib, har bir mehmon o‘zini qadrlangan his qiladigan unutilmas dam olish tajribasini yaratamiz",
  ],
  ["Guest Needs Anticipated", "Mehmon ehtiyojlari oldindan hisobga olingan"],
  ["Repeat Guest Rate", "Qaytib keluvchi mehmonlar ulushi"],
  ["Dedicated Butler Guest Care", "Shaxsiy butler xizmati"],
  ["Awards in Hospitality & Dining", "Mehmondo‘stlik va ovqatlanish mukofotlari"],
  ["Rooms with Ocean/City View", "Dengiz/shahar manzarali xonalar"],
  ["Average Star Rating", "O‘rtacha yulduz reytingi"],
  ["Sea-Facing Urban Hub", "Dengizga qaragan shahar markazi"],
  ["Ocean-View Urban Hub", "Okean manzarali shahar markazi"],
  ["Waterfront Urban Hub", "Sohilbo‘yi shahar markazi"],
  ["Outdoor/Terrace Seating", "Tashqi/teras o‘rindiqlari"],
  ["Live Kitchen", "Jonli oshxona"],
  ["Panoramic sea view", "Panoramik dengiz manzarasi"],
  ["Oceanfront sea view", "Sohilbo‘yi dengiz manzarasi"],
  ["Scenic coastal panorama", "Manzarali sohil panoramasi"],
  ["Uninterrupted ocean horizon", "Uzilmagan okean ufqi"],
  ["King bed, Balcony views, Smart TV", "King karavot, balkon manzarasi, Smart TV"],
  ["Queen bed, City views, Smart TV", "Queen karavot, shahar manzarasi, Smart TV"],
  ["King bed, Ocean views, Smart TV", "King karavot, dengiz manzarasi, Smart TV"],
  ["King bed, Ocean balcony, Smart TV", "King karavot, dengiz balconi, Smart TV"],
  // HTML-escaped link labels in baseline strings
  [">Home<", ">Bosh sahifa<"],
  [">About us<", ">Biz haqimizda<"],
  ["Couples & leisure travelers", "Juftliklar va dam oluvchilar"],
  ["Couples & weekend getaways", "Juftliklar va dam olish kunlari"],
  ["Leisure guests & honeymooners", "Dam oluvchilar va asal oyi juftliklari"],
  ["Couples & vacation travelers", "Juftliklar va sayyohlar"],
  ["350 sq.ft", "350 kv.fut"],
  ["380 sq.ft", "380 kv.fut"],
  ["450 sq.ft", "450 kv.fut"],
  ["420 sq.ft", "420 kv.fut"],

  // Room blurbs
  [
    "Our Standard Room provides a cozy, well-appointed space with essential comforts, soft bedding, and a peaceful setting—perfect for guests seeking a simple, relaxing, and budget-friendly stay",
    "Standart xonamiz zarur qulayliklar, yumshoq to‘shak va tinch muhitga ega — oddiy, dam olishga qulay va byudjetga mos joy izlovchilar uchun ideal",
  ],
  [
    "Experience elevated comfort in our Executive Suite, featuring spacious interiors, premium amenities, and a refined atmosphere for a luxurious stay",
    "Keng interyer, premium qulayliklar va hashamatli dam olish uchun nafis muhitga ega Ijrochi lyuksimizda yuqori darajadagi qulaylikni his eting",
  ],
  [
    "Wake up to stunning sea views in our Sea View Room, thoughtfully designed for comfort with modern amenities and a relaxing coastal atmosphere",
    "Zamonaviy qulayliklar va sohil ruhidagi tinch muhit bilan jihozlangan Dengiz manzarali xonamizda ajoyib dengiz manzarasiga uyg‘oning",
  ],
  [
    "Experience the luxury of our Executive Suite, designed for guests who appreciate space, style, and comfort. Enjoy elegant interiors, premium furnishings, and modern amenities that elevate your stay. Whether for business or leisure, this suite offers a refined retreat with everything you need for a relaxing and memorable visit.",
    "Joy, uslub va qulaylikni qadrlaydigan mehmonlar uchun mo‘ljallangan Ijrochi lyuksimiz hashamatini his eting. Nafis interyer, premium mebel va zamonaviy qulayliklar yashashingizni yuksaltiradi.",
  ],
  [
    "Discover the elegance of our Executive Suite, designed to offer generous space, refined décor, and premium amenities. With a comfortable living area and a peaceful ambiance, it provides the perfect blend of luxury and relaxation for both business and leisure travelers.",
    "Keng joy, nafis bezak va premium qulayliklarni taklif etuvchi Ijrochi lyuks nafosatini kashf eting. Qulay yashash zonasi va tinch muhit biznes va dam olish mehmonlari uchun hashamat va osoyishtalik uyg‘unligini beradi.",
  ],
  [
    "Welcome to our hotel, where comfort meets elegance. Enjoy spacious, modern rooms, personalized service, and a range of premium amenities designed to make your stay memorable. From our fine dining options to our relaxing lounges, every detail is crafted to ensure a truly enjoyable experience.",
    "Qulaylik va nafislik uchrashgan mehmonxonamizga xush kelibsiz. Keng, zamonaviy xonalar, shaxsiy xizmat va unutilmas dam olish uchun premium qulayliklardan bahramand bo‘ling.",
  ],
  [
    "Experience comfort and elegance at our hotel, offering modern rooms, personalized service, and premium amenities. From fine dining to relaxing lounges, every detail is designed to ensure a memorable and enjoyable stay.",
    "Zamonaviy xonalar, shaxsiy xizmat va premium qulayliklarga ega mehmonxonamizda qulaylik va nafislikni his eting. Har bir detal unutilmas dam olish uchun o‘ylab topilgan.",
  ],
  [
    "Discover the elegance and comfort of our hotel through our photo gallery",
    "Foto galereyamiz orqali mehmonxonamiz nafosati va qulayligini kashf eting",
  ],

  // About / contact heroes
  ["About us", "Biz haqimizda"],
  ["Get in touch", "Bog‘laning"],
  ["Send us a message", "Bizga xabar yuboring"],
  ["Our location", "Manzilimiz"],
  ["Contact information", "Aloqa ma’lumotlari"],

  // Blog titles (keep meaning)
  [
    "Creating Memorable Stays Through Genuine Hospitality",
    "Chinakam mehmondo‘stlik orqali unutilmas dam olish",
  ],
  [
    "Making Every Business Event Smooth and Memorable",
    "Har bir biznes tadbirini silliq va unutilmas qilish",
  ],
  [
    "Indulge in luxurious rooms with panoramic sea views",
    "Panoramik dengiz manzarali hashamatli xonalardan bahramand bo‘ling",
  ],
  [
    "A taste journey through our hotels finest culinary creations",
    "Mehmonxonamizning eng yaxshi oshxona ijodlari orqali ta’m sayohati",
  ],
  [
    "Open the door to roomy living made for whatever you want",
    "Istalgan maqsadga mos keng yashash eshigini oching",
  ],
  [
    "Enjoy a vacation that feels like a touch of heaven",
    "Jannatdek dam olishni his eting",
  ],
  [
    "Crafting special events that turn into memories youll treasure",
    "Qadrli xotiralarga aylanadigan maxsus tadbirlar",
  ],
  [
    "Crafting special events that turn into memories you'll treasure",
    "Qadrli xotiralarga aylanadigan maxsus tadbirlar",
  ],
  [
    "The April issue of Travel Magazine featured Elbergo Hotel",
    "Travel Magazine aprel sonida Classic Apartment haqida",
  ],
  [
    "The April issue of Travel Magazine featured Classic Apartment",
    "Travel Magazine aprel sonida Classic Apartment haqida",
  ],
  [
    "Discover the latest menu updates coming this March",
    "Mart oyidagi eng so‘nggi menyu yangilanishlarini kashf eting",
  ],
];

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, acc);
    else if (/\.(ts|tsx|js|mjs|json|css|html)$/.test(name)) acc.push(full);
  }
  return acc;
}

function applyAll(text) {
  let out = text;

  // Logos
  out = out.split(LOGO_DARK).join("/brand/classic-apartment-wordmark.svg");
  out = out.split(LOGO_FOOTER).join("/brand/classic-apartment-wordmark-light.svg");
  // white nav logo variants (partial match for yellow/black and white logos)
  out = out.replace(
    /https:\/\/cdn\.prod\.website-files\.com\/6927ddcc377dce6e20188e35\/696dc22c[^"\\]*logo\.svg/gi,
    "/brand/classic-apartment-wordmark.svg",
  );
  out = out.replace(
    /https:\/\/cdn\.prod\.website-files\.com\/6927ddcc377dce6e20188e35\/693bb3bf[^"\\]*\.svg/gi,
    "/brand/classic-apartment-wordmark-light.svg",
  );

  for (const [from, to] of CONTACT) {
    if (!from) continue;
    out = out.split(from).join(to);
  }

  // Sort phrases by length desc so longer matches win
  const sorted = [...PHRASES].sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of sorted) {
    out = out.split(from).join(to);
  }

  return out;
}

const targets = [
  ...walk(path.join(root, "baseline")),
  ...walk(path.join(root, "data")),
  ...walk(path.join(root, "app")),
  ...walk(path.join(root, "components")),
].filter((f) => !f.includes("node_modules") && !f.endsWith("wf-page-ids.json"));

let changed = 0;
for (const file of targets) {
  const before = fs.readFileSync(file, "utf8");
  const after = applyAll(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log("updated", path.relative(process.cwd(), file));
  }
}
console.log(`done — ${changed} files`);
