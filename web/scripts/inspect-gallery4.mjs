import fs from "fs";

const css = fs.readFileSync("src/styles/webflow/elbergo.shared.css", "utf8");
for (const name of [
  "rt-image-change-dimension",
  "w-background-video",
  "rt-gallery-image-wrapper",
  "rt-radius-15",
]) {
  const re = new RegExp(
    `\\.${name.replace(/-/g, "\\-")}[^{]*\\{[^}]+\\}`,
    "gi",
  );
  const hits = [...css.matchAll(re)].map((m) => m[0]);
  console.log("\n==", name, hits.length);
  console.log(hits.slice(0, 8).join("\n"));
}

// original html poster
const src = fs.readFileSync("../baseline/elbergo.webflow.io/home-one.html", "utf8");
const i = src.toLowerCase().indexOf("live kitchen");
console.log("\n--- original ---");
console.log(src.slice(i - 700, i + 120));
