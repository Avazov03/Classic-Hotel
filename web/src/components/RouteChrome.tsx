"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import { getWfPageId } from "@/data/wfPageId";
import { refreshWebflowIx2 } from "@/components/WebflowRuntime";

const HERO_TOP_PX = 80;

/** Marks home vs inner pages and syncs Webflow `data-wf-page` for IX2. */
export function RouteChrome() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const home = pathname === "/";
    const root = document.documentElement;
    root.classList.toggle("is-home", home);
    root.classList.toggle("is-inner", !home);

    const pageId = getWfPageId(pathname);
    const prev = root.getAttribute("data-wf-page");
    root.setAttribute("data-wf-page", pageId);

    // Soft re-init when navigating between Webflow page scopes
    if (prev && prev !== pageId) {
      refreshWebflowIx2();
    } else {
      window.dispatchEvent(new Event("resize"));
      window.dispatchEvent(new Event("scroll"));
    }
  }, [pathname]);

  /*
   * Shared chrome is Navbar v1; room/CMS pages' PAGE_SCROLL IX2 drives Navbar v2
   * (.rt-brand-*). Mirror white→dark chrome over full-bleed heroes via scroll class.
   */
  useEffect(() => {
    const root = document.documentElement;

    const syncHeroTop = () => {
      const hasHero = Boolean(
        document.querySelector(".rt-room-details-hero, .rt-inner-hero"),
      );
      const atTop = !hasHero || window.scrollY < HERO_TOP_PX;
      root.classList.toggle("is-hero-top", hasHero && atTop);
      root.classList.toggle("is-nav-solid", hasHero && !atTop);
    };

    syncHeroTop();
    window.addEventListener("scroll", syncHeroTop, { passive: true });
    window.addEventListener("resize", syncHeroTop);
    return () => {
      window.removeEventListener("scroll", syncHeroTop);
      window.removeEventListener("resize", syncHeroTop);
      root.classList.remove("is-hero-top", "is-nav-solid");
    };
  }, [pathname]);

  return null;
}
