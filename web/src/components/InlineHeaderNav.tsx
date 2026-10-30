"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { blogPosts } from "@/data/blog";
import { roomsListing } from "@/data/rooms";

type DropKey = "rooms" | "services" | "blog" | null;

const LEAVE_MS = 180;

const services = [
  { href: "/amenities", label: "Qulayliklar" },
  { href: "/banquet", label: "Teras" },
  { href: "/spa", label: "Bog‘" },
  { href: "/restaurant", label: "Restoran" },
] as const;

function Chevron() {
  return (
    <svg
      className="ca-nav-chevron"
      width="11"
      height="11"
      viewBox="0 0 10 10"
      aria-hidden
    >
      <path
        d="M2 3.5 L5 6.5 L8 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DropdownPanel({
  children,
  wide,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={`ca-nav-panel${wide ? " ca-nav-panel--wide" : ""}`}
      role="menu"
    >
      {children}
    </div>
  );
}

export function InlineHeaderNav() {
  const pathname = usePathname();
  const [mount, setMount] = useState<HTMLElement | null>(null);
  /** Hozir ko‘rinadigan panel (hover yoki pin) */
  const [open, setOpen] = useState<DropKey>(null);
  /** Bosib qoldirilgan panel — hoverdan keyin ham ochiq */
  const [pinned, setPinned] = useState<DropKey>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const baseId = useId();

  const clearLeave = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  }, []);

  const resetMenus = useCallback(() => {
    clearLeave();
    setOpen(null);
    setPinned(null);
  }, [clearLeave]);

  useEffect(() => {
    const place = () => {
      const wrapper = document.querySelector(".rt-navbar-v1-wrapper");
      if (!wrapper) return;
      let host = wrapper.querySelector(
        ".ca-inline-nav-host",
      ) as HTMLElement | null;
      if (!host) {
        host = document.createElement("div");
        host.className = "ca-inline-nav-host";
        const right = wrapper.querySelector(".rt-navbar-v1-right-wrapper");
        if (right) wrapper.insertBefore(host, right);
        else wrapper.appendChild(host);
      }
      setMount(host);
    };

    place();
    const t = window.setTimeout(place, 50);
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    resetMenus();
  }, [pathname, resetMenus]);

  useEffect(() => () => clearLeave(), [clearLeave]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") resetMenus();
    };
    const onPointer = (e: MouseEvent) => {
      const host = document.querySelector(".ca-inline-nav");
      if (!host?.contains(e.target as Node)) resetMenus();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [resetMenus]);

  const enterDrop = (key: DropKey) => {
    clearLeave();
    setOpen(key);
  };

  const leaveDrop = () => {
    clearLeave();
    leaveTimer.current = setTimeout(() => {
      setOpen(pinned);
    }, LEAVE_MS);
  };

  /** Hover ochadi; bosilsa pin; boshqasini bosilsa avvalgisi yopiladi */
  const onTriggerClick = (key: DropKey) => {
    clearLeave();
    if (pinned === key) {
      setPinned(null);
      setOpen(null);
      return;
    }
    setPinned(key);
    setOpen(key);
  };

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  if (!mount) return null;

  const roomsPreview = roomsListing.slice(0, 3);
  const blogPreview = blogPosts.slice(0, 2);
  const servicesActive = services.some((s) => isActive(s.href));

  return createPortal(
    <nav className="ca-inline-nav" aria-label="Asosiy navigatsiya">
      <Link
        href="/"
        className={`ca-nav-link${isActive("/") ? " is-active" : ""}`}
        onClick={resetMenus}
      >
        Asosiy
      </Link>
      <Link
        href="/about"
        className={`ca-nav-link${isActive("/about") ? " is-active" : ""}`}
        onClick={resetMenus}
      >
        Biz haqimizda
      </Link>

      <div
        className={`ca-nav-item${open === "rooms" ? " is-open" : ""}${
          pinned === "rooms" ? " is-pinned" : ""
        }`}
        onMouseEnter={() => enterDrop("rooms")}
        onMouseLeave={leaveDrop}
      >
        <button
          type="button"
          className={`ca-nav-link ca-nav-trigger${
            isActive("/rooms") ? " is-active" : ""
          }`}
          aria-expanded={open === "rooms"}
          aria-controls={`${baseId}-rooms`}
          onClick={() => onTriggerClick("rooms")}
        >
          Xonalar
          <Chevron />
        </button>
        <DropdownPanel>
          <div id={`${baseId}-rooms`} className="ca-nav-panel-list">
            <Link
              href="/rooms"
              className={`ca-nav-drop-link${
                pathname === "/rooms" ? " is-active" : ""
              }`}
              role="menuitem"
              onClick={resetMenus}
            >
              Barcha xonalar
            </Link>
            {roomsPreview.map((room) => (
              <Link
                key={room.slug}
                href={`/rooms/${room.slug}`}
                className={`ca-nav-drop-link${
                  isActive(`/rooms/${room.slug}`) ? " is-active" : ""
                }`}
                role="menuitem"
                onClick={resetMenus}
              >
                {room.name}
              </Link>
            ))}
          </div>
        </DropdownPanel>
      </div>

      <div
        className={`ca-nav-item${open === "services" ? " is-open" : ""}${
          pinned === "services" ? " is-pinned" : ""
        }`}
        onMouseEnter={() => enterDrop("services")}
        onMouseLeave={leaveDrop}
      >
        <button
          type="button"
          className={`ca-nav-link ca-nav-trigger${
            servicesActive ? " is-active" : ""
          }`}
          aria-expanded={open === "services"}
          aria-controls={`${baseId}-services`}
          onClick={() => onTriggerClick("services")}
        >
          Xizmatlar
          <Chevron />
        </button>
        <DropdownPanel wide>
          <div id={`${baseId}-services`} className="ca-nav-mega">
            <div className="ca-nav-mega-col">
              <div className="ca-nav-mega-title">Xizmatlar</div>
              <div className="ca-nav-panel-list">
                {services.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`ca-nav-drop-link${
                      isActive(item.href) ? " is-active" : ""
                    }`}
                    role="menuitem"
                    onClick={resetMenus}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="ca-nav-mega-promo">
              <p className="ca-nav-mega-promo-kicker">Maxsus</p>
              <p className="ca-nav-mega-promo-text">
                Dam olish yoki tadbir — bronni bir marta bosishda boshlang.
              </p>
              <Link
                href="/contact"
                className="ca-nav-mega-cta"
                onClick={resetMenus}
              >
                Bron qilish →
              </Link>
            </div>
          </div>
        </DropdownPanel>
      </div>

      <div
        className={`ca-nav-item${open === "blog" ? " is-open" : ""}${
          pinned === "blog" ? " is-pinned" : ""
        }`}
        onMouseEnter={() => enterDrop("blog")}
        onMouseLeave={leaveDrop}
      >
        <button
          type="button"
          className={`ca-nav-link ca-nav-trigger${
            isActive("/blog") ? " is-active" : ""
          }`}
          aria-expanded={open === "blog"}
          aria-controls={`${baseId}-blog`}
          onClick={() => onTriggerClick("blog")}
        >
          Blog
          <Chevron />
        </button>
        <DropdownPanel>
          <div id={`${baseId}-blog`} className="ca-nav-panel-list">
            <Link
              href="/blog"
              className={`ca-nav-drop-link${
                pathname === "/blog" ? " is-active" : ""
              }`}
              role="menuitem"
              onClick={resetMenus}
            >
              Barcha maqolalar
            </Link>
            {blogPreview.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`ca-nav-drop-link${
                  isActive(`/blog/${post.slug}`) ? " is-active" : ""
                }`}
                role="menuitem"
                onClick={resetMenus}
              >
                {post.title.length > 48
                  ? `${post.title.slice(0, 46)}…`
                  : post.title}
              </Link>
            ))}
          </div>
        </DropdownPanel>
      </div>

      <Link
        href="/contact"
        className={`ca-nav-link${isActive("/contact") ? " is-active" : ""}`}
        onClick={resetMenus}
      >
        Aloqa
      </Link>
    </nav>,
    mount,
  );
}
