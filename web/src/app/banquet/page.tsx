import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PageIntroBlock } from "@/components/PageIntro";
import { banquetHighlights, pageIntros } from "@/data/pages";
import styles from "../ui.module.css";

export const metadata: Metadata = {
  title: "Banquet",
  description: pageIntros.banquet.metaDescription,
};

export default function BanquetPage() {
  return (
    <>
      <PageHero page={pageIntros.banquet} />
      <PageIntroBlock>{pageIntros.banquet.intro}</PageIntroBlock>
      <section className={styles.section}>
        <div className={`container ${styles.detailGrid}`}>
          <div>
            <h2 style={{ marginBottom: "1rem" }}>Spaces for every occasion</h2>
            <p style={{ color: "var(--color-dim-gray)", maxWidth: "36rem" }}>
              Versatile banquet and event spaces designed to host meetings,
              conferences, workshops, and celebrations with modern amenities and
              attentive service.
            </p>
            <div className={styles.tags} style={{ marginTop: "1.5rem" }}>
              {banquetHighlights.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={styles.ctaRow}>
              <Link className={styles.btnPrimary} href="/contact">
                Book event space
              </Link>
            </div>
          </div>
          <div className={styles.media} style={{ borderRadius: "var(--radius-md)", overflow: "hidden" }}>
            <Image
              src={pageIntros.banquet.image}
              alt="Banquet hall"
              width={900}
              height={700}
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}