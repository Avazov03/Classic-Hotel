"use client";

import { useState } from "react";
import styles from "@/app/ui.module.css";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error || "Xatolik yuz berdi. Qayta urinib ko‘ring.");
        return;
      }
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
      setError("Tarmoq xatosi. Qayta urinib ko‘ring.");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label htmlFor="name">To‘liq ism</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="phone">Telefon</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className={styles.field}>
        <label htmlFor="topic">Mavzu</label>
        <select id="topic" name="topic" defaultValue="reservation">
          <option value="reservation">Bronlash</option>
          <option value="event">Tadbir / banket</option>
          <option value="dining">Ovqatlanish</option>
          <option value="spa">SPA</option>
          <option value="other">Boshqa</option>
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="message">Xabar</label>
        <textarea id="message" name="message" required />
      </div>
      <button
        className={styles.btnPrimary}
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Yuborilmoqda…" : "Xabar yuborish"}
      </button>
      {status === "ok" ? (
        <p
          role="status"
          style={{ color: "var(--color-deep-mocha-brown)", margin: 0 }}
        >
          Rahmat — xabaringiz qabul qilindi.
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" style={{ color: "#8a2a2a", margin: 0 }}>
          {error}
        </p>
      ) : null}
    </form>
  );
}
