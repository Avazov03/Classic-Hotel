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

type LoaderState = {
  promise?: Promise<void>;
  done?: boolean;
};

const LOADER_KEY = "__elbergoWebflowLoader";

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

async function ensureWebflowScripts() {
  for (const src of WF_SCRIPTS) {
    await loadScript(src);
  }
  // Do NOT Webflow.destroy() here — it wipes ix2.init({events}) from vendor chunks.
  window.dispatchEvent(new Event("resize"));
  window.dispatchEvent(new Event("scroll"));
}

/**
 * Loads the mirrored Webflow + jQuery runtime so IX2 scroll chapters
 * (About pills, etc.) run with the original interaction DNA.
 * Shared promise survives React Strict Mode remounts.
 */
export function WebflowRuntime() {
  useEffect(() => {
    const w = window as Window & { [LOADER_KEY]?: LoaderState };
    const state = (w[LOADER_KEY] ??= {});

    // Defer past React hydration to avoid DOM mismatch overlays
    const timer = window.setTimeout(() => {
      if (!state.promise) {
        state.promise = ensureWebflowScripts()
          .then(() => {
            state.done = true;
          })
          .catch((err) => {
            console.error("[WebflowRuntime]", err);
            delete w[LOADER_KEY];
          });
      }
    }, 50);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
