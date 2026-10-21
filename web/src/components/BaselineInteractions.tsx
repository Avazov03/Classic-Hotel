"use client";

import { useEffect } from "react";

/**
 * Minimal stand-in for Webflow IX2: mega menu + dropdown toggles.
 * Visual CSS still comes from the baseline stylesheet.
 */
export function BaselineInteractions() {
  useEffect(() => {
    const root = document.documentElement;

    function closeMenu() {
      root.classList.remove("rt-menu-open");
      document
        .querySelectorAll(".rt-mega-menu-wrapper")
        .forEach((el) => el.classList.remove("rt-is-open"));
    }

    function toggleMenu() {
      const open = root.classList.toggle("rt-menu-open");
      document.querySelectorAll(".rt-mega-menu-wrapper").forEach((el) => {
        el.classList.toggle("rt-is-open", open);
      });
    }

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const menuBtn = target.closest(
        ".rt-navbar-v1-menu-wrapper, .rt-navbar-v1-menu-bar-wrap",
      );
      if (menuBtn) {
        e.preventDefault();
        toggleMenu();
        return;
      }

      const dropToggle = target.closest(".rt-dropdown-toggle");
      if (dropToggle) {
        const dropdown = dropToggle.closest(".w-dropdown");
        if (dropdown) {
          e.preventDefault();
          dropdown.classList.toggle("w--open");
        }
        return;
      }

      // Close menu when navigating
      const link = target.closest("a");
      if (link && root.classList.contains("rt-menu-open")) {
        closeMenu();
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}