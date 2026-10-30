"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LOCALE_COOKIE, type Locale } from "@/i18n/locale";

const OPTIONS: { id: Locale; code: string; name: string }[] = [
  { id: "uz", code: "UZ", name: "O‘zbekcha" },
  { id: "ru", code: "RU", name: "Русский" },
  { id: "en", code: "EN", name: "English" },
];

const ARIA: Record<Locale, string> = {
  uz: "Til",
  ru: "Язык",
  en: "Language",
};

function Flag({ code }: { code: Locale }) {
  const raw = useId().replace(/:/g, "");
  if (code === "uz") {
    return (
      <svg viewBox="0 0 30 15" aria-hidden>
        <rect width="30" height="15" fill="#1EB53A" />
        <rect width="30" height="10" fill="#fff" />
        <rect width="30" height="5" fill="#0099B5" />
        <rect y="4.55" width="30" height="0.45" fill="#CE1126" />
        <rect y="10" width="30" height="0.45" fill="#CE1126" />
        <circle cx="4.15" cy="2.45" r="1.15" fill="#fff" />
        <circle cx="4.55" cy="2.45" r="0.88" fill="#0099B5" />
        <g fill="#fff">
          <circle cx="6.35" cy="1.35" r="0.22" />
          <circle cx="7.1" cy="1.75" r="0.22" />
          <circle cx="7.6" cy="2.35" r="0.22" />
          <circle cx="7.75" cy="3.05" r="0.22" />
          <circle cx="7.4" cy="3.7" r="0.22" />
        </g>
      </svg>
    );
  }
  if (code === "ru") {
    return (
      <svg viewBox="0 0 30 15" aria-hidden>
        <rect width="30" height="15" fill="#fff" />
        <rect y="5" width="30" height="5" fill="#0039A6" />
        <rect y="10" width="30" height="5" fill="#D52B1E" />
      </svg>
    );
  }
  const frame = `ca-en-s-${raw}`;
  const band = `ca-en-t-${raw}`;
  return (
    <svg viewBox="0 0 60 30" aria-hidden>
      <defs>
        <clipPath id={frame}>
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id={band}>
          <path d="M30,15 h30 v15 z v-15 h-30 z h-30 v-15 z v15 h30 z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${frame})`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          clipPath={`url(#${band})`}
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`ca-lang-chevron${open ? " is-open" : ""}`}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      aria-hidden
    >
      <path
        d="M2.2 3.6 L5 6.3 L7.8 3.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * One language at a time, in front of the booking button.
 * Opening the list reloads after a choice so the page animations start
 * on the translated text.
 */
export function LanguageSwitch({ locale }: { locale: Locale }) {
  const [mount, setMount] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [menuBox, setMenuBox] = useState<{ top: number; left: number } | null>(
    null,
  );
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const current = OPTIONS.find((item) => item.id === locale) ?? OPTIONS[0];

  useEffect(() => {
    const place = () => {
      const right = document.querySelector(".rt-navbar-v1-right-wrapper");
      if (!right) return;
      document.querySelectorAll(".ca-lang-host").forEach((node) => {
        if (node.parentElement !== right) node.remove();
      });
      let host = right.querySelector(".ca-lang-host") as HTMLElement | null;
      if (!host) {
        host = document.createElement("div");
        host.className = "ca-lang-host";
        const button = right.querySelector(".rt-navbar-v1-button-wrapper");
        if (button) right.insertBefore(host, button);
        else right.insertBefore(host, right.firstChild);
      }
      setMount(host);
    };

    place();
    const t = window.setTimeout(place, 50);
    return () => window.clearTimeout(t);
  }, [locale]);

  useEffect(() => {
    if (!open) return;
    const placeMenu = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const width = 188;
      let left = rect.right - width;
      if (left < 8) left = 8;
      if (left + width > window.innerWidth - 8) {
        left = window.innerWidth - 8 - width;
      }
      setMenuBox({ top: rect.bottom + 8, left });
    };
    placeMenu();
    const close = () => setOpen(false);
    let armed = false;
    const arm = window.setTimeout(() => {
      armed = true;
    }, 80);
    const onScroll = () => {
      if (armed) close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      close();
    };
    window.addEventListener("resize", onScroll);
    window.addEventListener("scroll", onScroll, true);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      window.clearTimeout(arm);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scroll", onScroll, true);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  function choose(code: Locale) {
    setOpen(false);
    if (code === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${code}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.reload();
  }

  if (!mount) return null;

  return (
    <>
      {createPortal(
        <div className="ca-lang">
          <button
            ref={triggerRef}
            type="button"
            className="ca-lang-trigger"
            aria-label={ARIA[locale]}
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="ca-lang-flag">
              <Flag code={locale} />
            </span>
            <span>{current.code}</span>
            <Chevron open={open} />
          </button>
        </div>,
        mount,
      )}
      {open && menuBox
        ? createPortal(
            <div
              ref={menuRef}
              className="ca-lang-menu"
              role="listbox"
              aria-label={ARIA[locale]}
              style={{ top: menuBox.top, left: menuBox.left }}
            >
              {OPTIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={item.id === locale}
                  className={`ca-lang-option${
                    item.id === locale ? " is-current" : ""
                  }`}
                  onClick={() => choose(item.id)}
                >
                  <span className="ca-lang-flag">
                    <Flag code={item.id} />
                  </span>
                  <span className="ca-lang-name">{item.name}</span>
                  {item.id === locale ? (
                    <svg
                      className="ca-lang-check"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      aria-hidden
                    >
                      <path
                        d="M3 7.2 L5.7 10 L11 4.2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </button>
              ))}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
