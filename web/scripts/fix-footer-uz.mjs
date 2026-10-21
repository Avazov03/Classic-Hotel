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

const uz =
  "Biz qulaylik, e’tiborli g‘amxo‘rlik va chinakam mehmondo‘stlikni uyg‘unlashtirib, har bir mehmon o‘zini qadrlangan his qiladigan unutilmas dam olish tajribasini yaratamiz";

const re =
  /We create unforgettable stay experiences by blending comfort, thoughtful care, and warm,[\s\u00a0]+genuine hospitality that makes every guest feel truly valued/g;

const more = [
  [
    /All rights reserved\.?/gi,
    "Barcha huquqlar himoyalangan.",
  ],
  [/Explore the Classic Apartment Blog/g, "Classic Apartment blogini o‘qing"],
  [/Discover inspiring hotel stories/g, "Ilhomlantiruvchi mehmonxona hikoyalarini kashf eting"],
  [/Our team/g, "Jamoamiz"],
];

let n = 0;
for (const file of walk("src")) {
  let t = fs.readFileSync(file, "utf8");
  const before = t;
  t = t.replace(re, uz);
  for (const [r, to] of more) t = t.replace(r, to);
  if (t !== before) {
    fs.writeFileSync(file, t);
    n++;
    console.log(file);
  }
}
console.log("fixed", n);
