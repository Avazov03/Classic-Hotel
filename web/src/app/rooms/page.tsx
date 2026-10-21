import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PageIntroBlock } from "@/components/PageIntro";
import { pageIntros } from "@/data/pages";
import { roomsListing } from "@/data/rooms";
import styles from "../ui.module.css";

export const metadata: Metadata = {
  title: "Rooms",
  description: pageIntros.rooms.metaDescription,
};

export default function RoomsPage() {
  return (
    <>
      <PageHero page={pageIntros.rooms} />
      <PageIntroBlock>{pageIntros.rooms.intro}</PageIntroBlock>
      <section className={styles.section}>
        <div className={`container ${styles.grid3}`}>
          {roomsListing.map((room) => (
            <article key={room.slug} className={styles.mediaCard}>
              <div className={styles.media}>
                <Image
                  src={room.image}
                  alt={room.name}
                  width={720}
                  height={500}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className={styles.body}>
                <h3>{room.name}</h3>
                <p>{room.blurb}</p>
                <div className={styles.meta}>
                  {room.highlights.slice(0, 3).map((h) => (
                    <span key={h} className={styles.chip}>
                      {h}
                    </span>
                  ))}
                </div>
                <div className={styles.price}>{room.price} / night</div>
                <Link className={styles.link} href={`/rooms/${room.slug}`}>
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}