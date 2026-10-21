import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PageIntroBlock } from "@/components/PageIntro";
import { amenityItems, pageIntros } from "@/data/pages";
import styles from "../ui.module.css";

export const metadata: Metadata = {
  title: "Amenities",
  description: pageIntros.amenities.metaDescription,
};

export default function AmenitiesPage() {
  return (
    <>
      <PageHero page={pageIntros.amenities} />
      <PageIntroBlock>{pageIntros.amenities.intro}</PageIntroBlock>
      <section className={styles.section}>
        <div className={`container ${styles.grid3}`}>
          {amenityItems.map((item) => (
            <article key={item.title} className={styles.card}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="container" style={{ marginTop: "2rem" }}>
          <div className={styles.ctaRow} style={{ justifyContent: "center" }}>
            <Link className={styles.btnPrimary} href="/contact">
              Plan your stay
            </Link>
            <Link className={styles.btnGhost} href="/spa">
              Explore spa
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}