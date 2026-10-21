import fs from "fs";
import path from "path";

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, acc);
    else if (/\.(ts|tsx)$/.test(name)) acc.push(full);
  }
  return acc;
}

const reps = [
  ["Welcome to Your Perfect Stay", "Mukammal dam olishga xush kelibsiz"],
  [
    "Welcome to our hotel, where comfort meets elegance. Enjoy spacious, modern rooms, personalized service, and a range of premium amenities designed to make your stay memorable. From our fine dining options to our relaxing lounges, every detail is crafted to ensure a truly enjoyable experience.",
    "Qulaylik va nafislik uchrashgan mehmonxonamizga xush kelibsiz. Keng, zamonaviy xonalar, shaxsiy xizmat va unutilmas dam olish uchun premium qulayliklardan bahramand bo‘ling.",
  ],
  [
    "Experience unmatched comfort in our Deluxe dengiz manzarali xona, featuring modern interiors, premium amenities, and breathtaking views of the ocean",
    "Zamonaviy interyer, premium qulayliklar va hayratlanarli dengiz manzarasi bilan Deluxe xonamizda tengsiz qulaylikni his eting",
  ],
  [
    "From thoughtfully styled rooms and inspired dining to attentive service and local experiences, uncover",
    "O‘ylab bezatilgan xonalar va ilhomli ovqatlanishdan e’tiborli xizmat va mahalliy tajribalargacha kashf eting:",
  ],
  [
    "genuine hospitality. From thoughtfully styled rooms and inspired dining to attentive service and local experiences, uncover",
    "chinakam mehmondo‘stlik. O‘ylab bezatilgan xonalar va ilhomli ovqatlanishdan e’tiborli xizmat va mahalliy tajribalargacha kashf eting:",
  ],
  ["Your comfort is our mission", "Sizning qulayligingiz — bizning maqsadimiz"],
  ["Sleep in Pure Comfort", "Sof qulaylikda uxlang"],
  ["Years of experience", "Yillar tajribasi"],
  ["Start the Conversation", "Suhbatni boshlang"],
  ["Get in touch with us", "Biz bilan bog‘laning"],
  ["Send us a message", "Bizga xabar yuboring"],
  ["Follow us on", "Bizni kuzating:"],
  ["Useful Links", "Foydali havolalar"],
  ["Quick Links", "Tezkor havolalar"],
  ["Company", "Kompaniya"],
  ["Address", "Manzil"],
  ["Phone number", "Telefon raqami"],
  ["Email address", "Email manzil"],
];

let n = 0;
for (const file of walk("src")) {
  let t = fs.readFileSync(file, "utf8");
  const before = t;
  for (const [a, b] of reps.sort((x, y) => y[0].length - x[0].length)) {
    t = t.split(a).join(b);
  }
  if (t !== before) {
    fs.writeFileSync(file, t);
    n++;
    console.log(path.relative(process.cwd(), file));
  }
}
console.log("pass3", n);
