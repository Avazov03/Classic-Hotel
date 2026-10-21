import styles from "./Topbar.module.css";

const OFFERS = [
  "New year offer : Free room upgrade on all bookings",
  "Exclusive website offer : Free breakfast for all guests!",
  "Complimentary airport pickup on 3+ night bookings",
];

export function Topbar() {
  const loop = [...OFFERS, ...OFFERS, ...OFFERS];

  return (
    <div className={styles.topbar} aria-label="Promotions">
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