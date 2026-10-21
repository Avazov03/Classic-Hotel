import fs from "fs";
import path from "path";

const mirror = path.resolve("../elbergo.webflow.io");

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (name.endsWith(".html")) acc.push(full);
  }
  return acc;
}

const map = {};
for (const file of walk(mirror)) {
  const html = fs.readFileSync(file, "utf8");
  const m = html.match(/data-wf-page="([^"]+)"/);
  if (!m) continue;
  const rel = path.relative(mirror, file).replace(/\\/g, "/");
  map[rel] = m[1];
}
console.log(JSON.stringify(map, null, 2));
fs.writeFileSync(
  "src/data/wf-page-ids.json",
  JSON.stringify(map, null, 2) + "\n",
);
console.log("wrote", Object.keys(map).length, "ids");
