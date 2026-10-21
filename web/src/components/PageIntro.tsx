import styles from "./PageIntro.module.css";

export function PageIntroBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.intro}>
      <p className={`container ${styles.text}`}>{children}</p>
    </div>
  );
}