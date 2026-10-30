"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { DotLottieReact, setWasmUrl } from "@lottiefiles/dotlottie-react";
import {
  ASSISTANT_NAME,
  buildFabGreeting,
  getGreetingContextId,
  markContextGreeted,
  wasContextGreeted,
} from "./assistantContext";
import { useAssistant } from "./AssistantProvider";
import "@/styles/assistant.css";

setWasmUrl("/assets/assistant/dotlottie-player.wasm");

const STORAGE_KEY = "guremir-assistant-pos";
const FAB_SIZE = 117;
const MOBILE_FAB_SIZE = 109;
const EDGE = 12;
const DRAG_THRESHOLD = 6;
const TYPEWRITER_MS = 38;
const GREETING_DELAY_MS = 700;
const GREETING_HOLD_MS = 9000;
const SCROLL_HIDE_DEBOUNCE_MS = 220;

type Pos = { x: number; y: number };

type DragState = {
  active: boolean;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
  moved: boolean;
};

function getFabSize() {
  if (typeof window === "undefined") return FAB_SIZE;
  return window.innerWidth <= 768 ? MOBILE_FAB_SIZE : FAB_SIZE;
}

function clampPos(x: number, y: number, size: number): Pos {
  const maxX = Math.max(EDGE, window.innerWidth - size - EDGE);
  const maxY = Math.max(EDGE, window.innerHeight - size - EDGE);
  return {
    x: Math.min(maxX, Math.max(EDGE, x)),
    y: Math.min(maxY, Math.max(EDGE, y)),
  };
}

function defaultPos(size: number): Pos {
  return clampPos(window.innerWidth - size - 24, window.innerHeight - size - 24, size);
}

function readSavedPos(size: number): Pos | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Pos;
    if (typeof saved.x !== "number" || typeof saved.y !== "number") return null;
    return clampPos(saved.x, saved.y, size);
  } catch {
    return null;
  }
}

export function AssistantFab() {
  const pathname = usePathname();
  const { open, openChat } = useAssistant();
  const [pos, setPos] = useState<Pos | null>(null);
  const [dragging, setDragging] = useState(false);
  const [greetingVisible, setGreetingVisible] = useState(false);
  const [greetingText, setGreetingText] = useState("");
  const [greetingDone, setGreetingDone] = useState(false);
  const [scrollHidden, setScrollHidden] = useState(false);
  const contextId = useMemo(() => getGreetingContextId(pathname), [pathname]);
  const fullGreeting = useMemo(() => buildFabGreeting(pathname), [pathname]);
  const greetingDismissRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef<DragState>({
    active: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    moved: false,
  });
  const clearDismissTimer = useCallback(() => {
    if (greetingDismissRef.current) {
      clearTimeout(greetingDismissRef.current);
      greetingDismissRef.current = null;
    }
  }, []);

  const dismissGreeting = useCallback(
    (markGreeted = true) => {
      setGreetingVisible(false);
      setGreetingText("");
      setGreetingDone(false);
      setScrollHidden(false);
      clearDismissTimer();
      if (markGreeted) markContextGreeted(contextId);
    },
    [contextId, clearDismissTimer],
  );

  useEffect(() => {
    const size = getFabSize();
    setPos(readSavedPos(size) ?? defaultPos(size));
  }, []);

  useEffect(() => {
    const onResize = () => {
      setPos((current) => (current ? clampPos(current.x, current.y, getFabSize()) : current));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (open) {
      dismissGreeting(true);
      return;
    }
    if (wasContextGreeted(contextId)) {
      setGreetingVisible(false);
      return;
    }

    let cancelled = false;
    setGreetingVisible(false);
    setGreetingText("");
    setGreetingDone(false);
    clearDismissTimer();

    const showTimer = setTimeout(() => {
      if (!cancelled) setGreetingVisible(true);
    }, GREETING_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(showTimer);
    };
  }, [open, contextId, dismissGreeting, clearDismissTimer]);

  useEffect(() => {
    if (!greetingVisible) return;

    let index = 0;
    setGreetingText("");
    setGreetingDone(false);

    const typeTimer = setInterval(() => {
      index += 1;
      setGreetingText(fullGreeting.slice(0, index));
      if (index >= fullGreeting.length) {
        clearInterval(typeTimer);
        setGreetingDone(true);
        greetingDismissRef.current = setTimeout(() => dismissGreeting(true), GREETING_HOLD_MS);
      }
    }, TYPEWRITER_MS);

    return () => {
      clearInterval(typeTimer);
      clearDismissTimer();
    };
  }, [greetingVisible, fullGreeting, dismissGreeting, clearDismissTimer]);

  useEffect(() => {
    if (!greetingVisible) return;

    const onScroll = () => {
      setScrollHidden(true);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => setScrollHidden(false), SCROLL_HIDE_DEBOUNCE_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, { capture: true });
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [greetingVisible]);

  const savePos = useCallback((next: Pos) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!pos) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      originX: pos.x,
      originY: pos.y,
      moved: false,
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    drag.moved = true;
    setDragging(true);
    setPos(clampPos(drag.originX + dx, drag.originY + dy, getFabSize()));
  };

  const finishDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    const wasMoved = drag.moved;
    drag.active = false;
    setDragging(false);
    if (wasMoved) {
      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      const next = clampPos(drag.originX + dx, drag.originY + dy, getFabSize());
      setPos(next);
      savePos(next);
    } else if (!open) {
      openChat();
    }
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* pointer already released */
    }
  };

  if (!pos) return null;

  const showGreeting = greetingVisible && !open && !dragging;

  return (
    <div
      className={`assistant-fab${dragging ? " assistant-fab--dragging" : ""}${open ? " assistant-fab--hidden" : ""}${showGreeting ? " assistant-fab--greeting" : ""}`}
      style={{ left: pos.x, top: pos.y }}
      aria-label={ASSISTANT_NAME}
    >
      {showGreeting && (
        <div
          className={`assistant-fab__bubble${scrollHidden ? " assistant-fab__bubble--scroll-hidden" : ""}`}
          role="status"
          aria-live="polite"
        >
          <button
            type="button"
            className="assistant-fab__bubble-close"
            aria-label="Salomlashuvni yopish"
            onClick={(e) => {
              e.stopPropagation();
              dismissGreeting(true);
            }}
          >
            ×
          </button>
          <button type="button" className="assistant-fab__bubble-body" onClick={() => {
            dismissGreeting(true);
            openChat();
          }}>
            <span className="assistant-fab__bubble-label">{ASSISTANT_NAME}</span>
            <p className="assistant-fab__bubble-text">
              {greetingText}
              {!greetingDone && <span className="assistant-fab__cursor" aria-hidden="true" />}
            </p>
          </button>
        </div>
      )}
      <button
        type="button"
        className="assistant-fab__btn"
        aria-label={`${ASSISTANT_NAME}ni ochish yoki sudrab joylashtiring`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        <DotLottieReact
          src="/assets/assistant/ai-robot.lottie"
          loop
          autoplay
          className="assistant-fab__lottie"
        />
      </button>
    </div>
  );
}
