/**
 * Live fidelity probe against Next (:3000) — no Playwright required.
 * Run: node scripts/audit-live.mjs
 */
const BASE = process.env.E2E_BASE_URL || "http://localhost:3000";

const ROUTES = [
  "/",
  "/about",
  "/rooms",
  "/rooms/standard-room",
  "/rooms/sea-view-room",
  "/rooms/executive-suite",
  "/spa",
  "/restaurant",
  "/banquet",
  "/amenities",
  "/blog",
  "/contact",
  "/style-guide",
  "/license",
  "/changelog",
  "/not-found",
  "/password-protected",
];

const findings = [];

async function checkRoute(path) {
  const url = `${BASE}${path}`;
  const started = Date.now();
  try {
    const res = await fetch(url, { redirect: "follow" });
    const html = await res.text();
    const ms = Date.now() - started;
    const issues = [];
    if (res.status !== 200) issues.push(`HTTP ${res.status}`);
    if (html.length < 2000) issues.push("tiny HTML payload");
    if (!html.includes("rt-top-main-box") && path !== "/api/contact") {
      issues.push("missing chrome (rt-top-main-box)");
    }
    if (html.includes("Application error")) issues.push("Next application error");
    // Count opacity:0 leftovers that often break pages without IX2
    const opacity0 = (html.match(/opacity:\s*0/gi) || []).length;
    if (opacity0 > 40) issues.push(`many opacity:0 leftovers (${opacity0})`);
    findings.push({
      path,
      ok: issues.length === 0,
      status: res.status,
      ms,
      bytes: html.length,
      opacity0,
      issues,
    });
  } catch (e) {
    findings.push({
      path,
      ok: false,
      issues: [String(e.message || e)],
    });
  }
}

for (const r of ROUTES) await checkRoute(r);

const failed = findings.filter((f) => !f.ok);
console.log(JSON.stringify({ base: BASE, findings, failed: failed.length }, null, 2));
process.exit(failed.length ? 1 : 0);
