import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PageIntroBlock } from "@/components/PageIntro";
import { pageIntros, restaurantHighlights } from "@/data/pages";
import styles from "../ui.module.css";

export const metadata: Metadata = {
  title: "Restaurant",
  description: pageIntros.restaurant.metaDescription,
};

export default function RestaurantPage() {
  return (
    <>
      <PageHero page={pageIntros.restaurant} />
      <PageIntroBlock>{pageIntros.restaurant.intro}</PageIntroBlock>
      <section className={styles.section}>
        <div className="container">
          <div className={styles.tags} style={{ justifyContent: "center" }}>
            {restaurantHighlights.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className={styles.ctaRow} style={{ justifyContent: "center" }}>
            <Link className={styles.btnPrimary} href="/contact">
              Reserve a table
            </Link>
            <Link className={styles.btnGhost} href="/blog">
              Culinary stories
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}