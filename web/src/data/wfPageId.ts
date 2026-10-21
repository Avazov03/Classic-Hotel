import wfPageIds from "@/data/wf-page-ids.json";

/** Home One — default site landing. */
export const WF_PAGE_HOME = wfPageIds["home-one.html"];

/** CMS Room template (all room detail pages share this). */
export const WF_PAGE_ROOM = wfPageIds["room/sea-view-room.html"];

/** CMS Blog post template. */
export const WF_PAGE_POST = wfPageIds[
  "post/enjoy-a-vacation-that-feels-like-a-touch-of-heaven.html"
];

/**
 * Next.js pathname → Webflow `data-wf-page`.
 * IX2 targets are `pageId|elementId`; wrong page leaves opacity:0 stuck.
 */
export const WF_PAGE_BY_PATH: Record<string, string> = {
  "/": WF_PAGE_HOME,
  "/about": wfPageIds["about-us.html"],
  "/amenities": wfPageIds["amenities.html"],
  "/banquet": wfPageIds["banquet.html"],
  "/blog": wfPageIds["blog-one.html"],
  "/changelog": wfPageIds["changelog.html"],
  "/contact": wfPageIds["contact-two.html"],
  "/license": wfPageIds["license.html"],
  "/password-protected": wfPageIds["401.html"],
  "/restaurant": wfPageIds["restaurant.html"],
  "/rooms": wfPageIds["rooms.html"],
  "/rooms/executive-suite": WF_PAGE_ROOM,
  "/rooms/sea-view-room": WF_PAGE_ROOM,
  "/rooms/standard-room": WF_PAGE_ROOM,
  "/spa": wfPageIds["spa.html"],
  "/style-guide": wfPageIds["style-guide.html"],
  "/not-found": wfPageIds["404.html"],
};

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

export function getWfPageId(pathname: string): string {
  const path = normalizePathname(pathname);
  if (WF_PAGE_BY_PATH[path]) return WF_PAGE_BY_PATH[path];
  if (path.startsWith("/rooms/")) return WF_PAGE_ROOM;
  if (path.startsWith("/blog/")) return WF_PAGE_POST;
  return WF_PAGE_HOME;
}

/** Inline bootstrap — runs before React/Webflow so IX2 sees the right page. */
export function getWfPageBootstrapScript(): string {
  const mapJson = JSON.stringify(WF_PAGE_BY_PATH);
  return `(function(){var m=${mapJson};var p=location.pathname.replace(/\\/+$/,"")||"/";var id=m[p];if(!id){if(p.indexOf("/rooms/")===0)id="${WF_PAGE_ROOM}";else if(p.indexOf("/blog/")===0)id="${WF_PAGE_POST}";else id="${WF_PAGE_HOME}";}document.documentElement.setAttribute("data-wf-page",id);})();`;
}
