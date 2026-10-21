import styles from "./Topbar.module.css";

const OFFERS = [
  "Yangi yil taklifi: barcha bronlar uchun bepul xona yangilash",
  "Sayt maxsus taklifi: barcha mehmonlarga bepul nonushta!",
  "3+ kechalik bronlarda bepul aeroport kutib olish",
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