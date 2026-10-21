import { Footer } from "./Footer";
import { Header } from "./Header";
import { Topbar } from "./Topbar";
import styles from "./SiteShell.module.css";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <Topbar />
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}