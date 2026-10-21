import fs from "fs";
import path from "path";

const reps = [
  [
    "We create unforgettable stay experiences by blending comfort, thoughtful care, and warm,  genuine hospitality that makes every guest feel truly valued",
    "Biz qulaylik, e’tiborli g‘amxo‘rlik va chinakam mehmondo‘stlikni uyg‘unlashtirib, har bir mehmon o‘zini qadrlangan his qiladigan unutilmas dam olish tajribasini yaratamiz",
  ],
  [
    "We create unforgettable stay experiences by blending comfort, thoughtful care, and warm, genuine hospitality that makes every guest feel truly valued",
    "Biz qulaylik, e’tiborli g‘amxo‘rlik va chinakam mehmondo‘stlikni uyg‘unlashtirib, har bir mehmon o‘zini qadrlangan his qiladigan unutilmas dam olish tajribasini yaratamiz",
  ],
  ["Our Featured Xonalar", "Tanlangan xonalar"],
  ["dining experience", "ovqatlanish tajribasi"],
  [
    "All graphical assets in this template are licensed for personal and commercial use. If you'd like to use a specific asset, please check the license below.",
    "Ushbu shablondagi barcha grafik materiallar shaxsiy va tijorat foydalanish uchun litsenziyalangan. Muayyan materialdan foydalanmoqchi bo‘lsangiz, quyidagi litsenziyani tekshiring.",
  ],
  [
    "All graphical assets in this template are licensed for personal and commercial use. If you&#x27;d like to use a specific asset, please check the license below.",
    "Ushbu shablondagi barcha grafik materiallar shaxsiy va tijorat foydalanish uchun litsenziyalangan. Muayyan materialdan foydalanmoqchi bo‘lsangiz, quyidagi litsenziyani tekshiring.",
  ],
  ["What you'll experience", "Nimani his qilasiz"],
  ["Expect the exceptional. We promise an experience beyond compare", "A’lo natijani kuting — biz tengsiz tajriba va’da qilamiz"],
  ["Smooth & Friendly Arrival", "Silliq va do‘stona kutib olish"],
  ["Fast & Friendly Check-In", "Tez va qulay ro‘yxatdan o‘tish"],
  ["Business & Event Spaces", "Biznes va tadbir maydonlari"],
  ["Reserve now", "Hozir bron qiling"],
  ["Call Us", "Qo‘ng‘iroq qiling"],
  ["Email Us", "Email yozing"],
  ["Visit Us", "Tashrif buyuring"],
  ["Get Directions", "Yo‘nalishni ochish"],
  ["Send Message", "Xabar yuborish"],
  ["Your Name", "Ismingiz"],
  ["Your Email", "Emailingiz"],
  ["Your Phone", "Telefoningiz"],
  ["Your Message", "Xabaringiz"],
  ["Thank you!", "Rahmat!"],
  ["Oops!", "Xato!"],
];

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, acc);
    else if (/\.(ts|tsx)$/.test(name)) acc.push(full);
  }
  return acc;
}

const files = [
  ...walk("src/baseline"),
  ...walk("src/data"),
  ...walk("src/components"),
  ...walk("src/app"),
];

let n = 0;
for (const file of files) {
  let t = fs.readFileSync(file, "utf8");
  const before = t;
  for (const [a, b] of reps.sort((x, y) => y[0].length - x[0].length)) {
    t = t.split(a).join(b);
  }
  if (t !== before) {
    fs.writeFileSync(file, t);
    n++;
    console.log("ok", file);
  }
}
console.log("pass2", n);

// restaurant page name
const rp = "src/app/restaurant/page.tsx";
if (fs.existsSync(rp)) {
  let t = fs.readFileSync(rp, "utf8");
  t = t.replace("function RestoranPage", "function RestaurantPage");
  fs.writeFileSync(rp, t);
}
