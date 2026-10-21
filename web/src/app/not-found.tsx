import Link from "next/link";
import styles from "./ui.module.css";

export default function NotFound() {
  return (
    <section className={styles.section}>
      <div className="container" style={{ textAlign: "center", maxWidth: "34rem" }}>
        <h1 style={{ marginBottom: "0.85rem" }}>Page not found</h1>
        <p style={{ color: "var(--color-dim-gray)", marginBottom: "1.75rem" }}>
          The page you are looking for may have moved. Return home or continue
          exploring rooms and experiences.
        </p>
        <div className={styles.ctaRow} style={{ justifyContent: "center" }}>
          <Link className={styles.btnPrimary} href="/">
            Back home
          </Link>
          <Link className={styles.btnGhost} href="/rooms">
            View rooms
          </Link>
        </div>
      </div>
    </section>
  );
}