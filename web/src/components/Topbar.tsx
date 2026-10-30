import styles from "./Topbar.module.css";

const OFFERS = [
  "Bron kunida maxsus taklif: nonushta, Wi-Fi va avtoturargoh",
  "Har kuni bufet nonushta, soat 07:00–10:00",
  "3 kecha va undan uzoq yashashda maxsus taklif",
];

export function Topbar() {
  const loop = [...OFFERS, ...OFFERS, ...OFFERS];

  return (
    <div className={styles.topbar} aria-label="Aksiyalar">
      <div className={styles.track}>
        {loop.map((text, i) => (
          <span className={styles.item} key={`${text}-${i}`}>
            {text}
            <span className={styles.dot} aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}