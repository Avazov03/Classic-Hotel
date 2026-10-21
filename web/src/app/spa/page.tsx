import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PageIntroBlock } from "@/components/PageIntro";
import { pageIntros, spaTreatments } from "@/data/pages";
import styles from "../ui.module.css";

export const metadata: Metadata = {
  title: "SPA",
  description: pageIntros.spa.metaDescription,
};

export default function SpaPage() {
  return (
    <>
      <PageHero page={pageIntros.spa} />
      <PageIntroBlock>{pageIntros.spa.intro}</PageIntroBlock>
      <section className={styles.section}>
        <div className={`container ${styles.grid2}`}>
          {spaTreatments.map((item) => (
            <article key={item.title} className={styles.card}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="container" style={{ marginTop: "2rem" }}>
          <div className={styles.ctaRow} style={{ justifyContent: "center" }}>
            <Link className={styles.btnPrimary} href="/contact">
              Book a treatment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}