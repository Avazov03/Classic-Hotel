"use client";

import { useEffect } from "react";

const WF_SCRIPTS = [
  "/vendor/webflow/jquery-3.5.1.min.js",
  "/vendor/webflow/webflow.schunk.36b8fb49256177c8.js",
  "/vendor/webflow/webflow.schunk.5aaf8a1a22b05d61.js",
  "/vendor/webflow/webflow.schunk.0bffbd01531adf31.js",
  "/vendor/webflow/webflow.schunk.bdf58efcee47c042.js",
  "/vendor/webflow/webflow.schunk.9dfb96661114d3db.js",
  "/vendor/webflow/webflow.b99141db.c8f655e8bc914122.js",
] as const;

type Ix2Config = Record<string, unknown>;

type LoaderState = {
  promise?: Promise<void>;
  done?: boolean;
  ix2Config?: Ix2Config;
};

const LOADER_KEY = "__elbergoWebflowLoader";

type WfWindow = Window & {
  [LOADER_KEY]?: LoaderState;
  Webflow?: {
    require: (name: string) => {
      init?: (config: Ix2Config) => void;
      destroy?: () => void;
      store?: { getState?: () => { ixData?: Ix2Config } };
    };
    destroy?: () => void;
    ready?: () => void;
  };
};

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-elbergo-wf="${src}"]`,
    );
    if (existing) {
      if (existing.dataset.loaded === "1") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error(`Failed to load ${src}`)),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.elbergoWf = src;
    script.onload = () => {
      script.dataset.loaded = "1";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

function getLoaderState(): LoaderState {
  const w = window as WfWindow;
  return (w[LOADER_KEY] ??= {});
}

/** Cache IX2 DNA so we can re-init after SPA route changes without wiping it. */
function installIx2InitCapture() {
  const w = window as WfWindow;
  const state = getLoaderState();
  if (state.ix2Config || !w.Webflow?.require) return;

  try {
    const ix2 = w.Webflow.require("ix2");
    if (!ix2?.init) return;
    const original = ix2.init.bind(ix2);
    ix2.init = (config: Ix2Config) => {
      state.ix2Config = config;
      return original(config);
    };
  } catch {
    /* ix2 module not ready yet */
  }
}

function kickMediaAndScroll() {
  document
    .querySelectorAll<HTMLVideoElement>(".w-background-video video")
    .forEach((video) => {
      video.muted = true;
      video.playsInline = true;
      const play = video.play();
      if (play && typeof play.catch === "function") play.catch(() => {});
    });
  window.dispatchEvent(new Event("resize"));
  window.dispatchEvent(new Event("scroll"));
}

const STUCK_IX2_SKIP =
  /rt-faq|rt-image-overlay|rt-navbar|rt-nav-logo|rt-dropdown-icon|w-slide|backgroundvideoplaypausebutton|rt-counter-train/i;

let stuckRevealTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * IX2 while-in-view sometimes never fires (SPA / shared CMS page ids).
 * After a short grace period, force-show leftover content blocks.
 */
export function revealStuckIx2Content(delayMs = 1400) {
  if (typeof window === "undefined") return;
  if (stuckRevealTimer) clearTimeout(stuckRevealTimer);
  stuckRevealTimer = setTimeout(() => {
    stuckRevealTimer = null;
    document.querySelectorAll<HTMLElement>("main [data-w-id]").forEach((el) => {
      const cls = el.className?.toString?.() || "";
      if (STUCK_IX2_SKIP.test(cls)) return;
      const op = parseFloat(getComputedStyle(el).opacity);
      if (op > 0.05) return;
      const r = el.getBoundingClientRect();
      if (r.width < 4 || r.height < 8) return;
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("transform", "none", "important");
      el.style.setProperty("filter", "none", "important");
    });
  }, delayMs);
}

async function ensureWebflowScripts() {
  installIx2InitCapture();

  for (const src of WF_SCRIPTS) {
    // Patch again right before the IX2 DNA chunk runs
    if (src.includes("0bffbd01531adf31")) {
      installIx2InitCapture();
    }
    await loadScript(src);
    installIx2InitCapture();
  }

  // Prefer store snapshot if monkey-patch missed the first init
  const state = getLoaderState();
  if (!state.ix2Config) {
    try {
      const ixData = (window as WfWindow).Webflow?.require("ix2")?.store?.getState
        ?.()?.ixData;
      if (ixData) state.ix2Config = ixData as Ix2Config;
    } catch {
      /* ignore */
    }
  }

  kickMediaAndScroll();
}

/**
 * Re-bind IX2 after `data-wf-page` changes (client navigations).
 * Caches init config so destroy/ready does not lose interaction DNA.
 */
export function refreshWebflowIx2() {
  if (typeof window === "undefined") return;
  const w = window as WfWindow;
  const state = getLoaderState();
  if (!state.done || !w.Webflow) {
    kickMediaAndScroll();
    return;
  }

  const config = state.ix2Config;
  try {
    const ix2 = w.Webflow.require("ix2");
    if (ix2?.destroy) ix2.destroy();
    else if (w.Webflow.destroy) w.Webflow.destroy();

    if (config && ix2?.init) {
      ix2.init(config);
    } else if (w.Webflow.ready) {
      w.Webflow.ready();
    }
  } catch (err) {
    console.warn("[WebflowRuntime] IX2 refresh failed", err);
  }

  document.documentElement.classList.add("w-mod-ix");
  kickMediaAndScroll();
  revealStuckIx2Content();
}

/**
 * Loads the mirrored Webflow + jQuery runtime so IX2 scroll chapters
 * run with the original interaction DNA.
 * Shared promise survives React Strict Mode remounts.
 */
export function WebflowRuntime() {
  useEffect(() => {
    const state = getLoaderState();

    // Defer past React hydration; RouteChrome useLayoutEffect already set page id
    const timer = window.setTimeout(() => {
      if (!state.promise) {
        state.promise = ensureWebflowScripts()
          .then(() => {
            state.done = true;
            revealStuckIx2Content(1800);
          })
          .catch((err) => {
            console.error("[WebflowRuntime]", err);
            delete (window as WfWindow)[LOADER_KEY];
          });
      }
    }, 50);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
