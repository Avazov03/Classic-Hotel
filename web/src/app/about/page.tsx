import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PageIntroBlock } from "@/components/PageIntro";
import { aboutFeatures, pageIntros } from "@/data/pages";
import styles from "../ui.module.css";

export const metadata: Metadata = {
  title: "About us",
  description: pageIntros.about.metaDescription,
};

export default function AboutPage() {
  return (
    <>
      <PageHero page={pageIntros.about} />
      <PageIntroBlock>{pageIntros.about.intro}</PageIntroBlock>
      <section className={styles.section}>
        <div className={`container ${styles.grid3}`}>
          {aboutFeatures.map((item) => (
            <article key={item.title} className={styles.card}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}