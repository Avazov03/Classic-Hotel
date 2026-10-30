"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { AssistantCard } from "@/lib/assistantCards";
import { ASSISTANT_NAME, getContextualSuggestions } from "./assistantContext";
import { useAssistant } from "./AssistantProvider";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  cards?: AssistantCard[];
};

function AssistantCards({ cards }: { cards: AssistantCard[] }) {
  return (
    <div className="assistant-chat__cards">
      {cards.map((card) => (
        <a key={card.href + card.title} href={card.href} className="assistant-chat__card">
          <img className="assistant-chat__card-img assistant-chat__card-img--photo" src={card.image} alt={card.title} />
          <span className="assistant-chat__card-body">
            <span className="assistant-chat__card-title">{card.title}</span>
            <span className="assistant-chat__card-meta">{card.meta}</span>
            {card.facts ? <span className="assistant-chat__card-desc">{card.facts}</span> : null}
            <span className="assistant-chat__card-open">Sahifani ochish</span>
          </span>
        </a>
      ))}
    </div>
  );
}

function IconNewChat() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 4v4h4M8 16l8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconExpand() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12l16-7-7 16-2-7-7-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function MessageText({ text }: { text: string }) {
  const parts = text.split(/(\/[a-z0-9\-]+(?:\/[a-z0-9\-]+)?)/gi);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("/") ? (
          <a key={i} href={part}>
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function AssistantChatPanel() {
  const { open, expanded, closeChat, toggleExpanded, newChat, chatKey } = useAssistant();
  const pathname = usePathname();
  const suggestions = useMemo(() => getContextualSuggestions(pathname), [pathname]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMessages([]);
    setInput("");
    setError(null);
    setLoading(false);
  }, [chatKey]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, loading]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;
      setError(null);
      setInput("");
      const userMsg: ChatMessage = { role: "user", content: trimmed };
      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setLoading(true);
      try {
        const locale = document.documentElement.lang || "uz";
        const res = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            history: messages.slice(-10),
            pageContext: { path: pathname, locale },
          }),
        });
        const data = (await res.json()) as {
          reply?: string;
          error?: string;
          cards?: AssistantCard[];
        };
        if (!res.ok || !data.reply) {
          throw new Error(data.error || "Javob olishda xatolik");
        }
        setMessages([
          ...nextMessages,
          { role: "assistant", content: data.reply, cards: data.cards ?? [] },
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Javob olishda xatolik. Keyinroq urinib ko‘ring.");
        setMessages(messages);
        setInput(trimmed);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages, pathname],
  );

  if (!open) return null;

  return (
    <div
      className={`assistant-chat${expanded ? " assistant-chat--expanded" : ""}`}
      role="dialog"
      aria-label={ASSISTANT_NAME}
    >
      <header className="assistant-chat__header">
        <h2 className="assistant-chat__title">{ASSISTANT_NAME}</h2>
        <div className="assistant-chat__header-actions">
          <button type="button" className="assistant-chat__icon-btn" onClick={newChat} aria-label="Yangi suhbat">
            <IconNewChat />
          </button>
          <button type="button" className="assistant-chat__icon-btn" onClick={toggleExpanded} aria-label="Kengaytirish">
            <IconExpand />
          </button>
          <button type="button" className="assistant-chat__icon-btn" onClick={closeChat} aria-label="Yopish">
            <IconClose />
          </button>
        </div>
      </header>

      <div className="assistant-chat__body" ref={bodyRef}>
        {messages.length === 0 ? (
          <div className="assistant-chat__welcome">
            <p className="assistant-chat__greeting">Salom, mehmon</p>
            <p className="assistant-chat__subtitle">Sizga qanday yordam beray?</p>
            <div className="assistant-chat__suggestions">
              {suggestions.map((s) => (
                <button
                  key={s.text}
                  type="button"
                  className={`assistant-chat__chip assistant-chat__chip--${s.align}`}
                  onClick={() => void sendMessage(s.text)}
                  disabled={loading}
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="assistant-chat__messages">
            {messages.map((m, i) => (
              <div key={`${m.role}-${i}`} className={`assistant-chat__msg assistant-chat__msg--${m.role}`}>
                {m.role === "assistant" ? (
                  <>
                    <MessageText text={m.content} />
                    {m.cards && m.cards.length > 0 ? <AssistantCards cards={m.cards} /> : null}
                  </>
                ) : (
                  m.content
                )}
              </div>
            ))}
            {loading && (
              <div className="assistant-chat__msg assistant-chat__msg--assistant assistant-chat__typing">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>
        )}
        {error && <p className="assistant-chat__error">{error}</p>}
      </div>

      <footer className="assistant-chat__footer">
        <form
          className="assistant-chat__form"
          onSubmit={(e) => {
            e.preventDefault();
            void sendMessage(input);
          }}
        >
          <div className="assistant-chat__input-wrap">
            <textarea
              ref={inputRef}
              className="assistant-chat__input"
              placeholder="Savol bering"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void sendMessage(input);
                }
              }}
              rows={1}
              disabled={loading}
            />
            <button
              type="submit"
              className="assistant-chat__input-icon assistant-chat__send"
              aria-label="Yuborish"
              disabled={loading || !input.trim()}
            >
              <IconSend />
            </button>
          </div>
        </form>
        <p className="assistant-chat__disclaimer">
          Narx va bandlikni qabulxona tasdiqlaydi.{" "}
          <a href="/contact">Aloqa</a>
        </p>
      </footer>
    </div>
  );
}
