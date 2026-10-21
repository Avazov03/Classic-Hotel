import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoomBySlug, roomDetails } from "@/data/rooms";
import styles from "../../ui.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return roomDetails.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return { title: "Room" };
  return {
    title: room.name,
    description: room.blurb,
  };
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  return (
    <>
      <section className={styles.sectionTight}>
        <div className="container">
          <p className={styles.meta}>
            <Link className={styles.link} href="/rooms">
              Rooms
            </Link>
          </p>
          <h1 style={{ marginTop: "1rem", marginBottom: "0.75rem" }}>{room.name}</h1>
          <p style={{ maxWidth: "40rem", color: "var(--color-dim-gray)" }}>{room.blurb}</p>
          <div className={styles.ctaRow}>
            <Link className={styles.btnPrimary} href="/contact">
              Book now
            </Link>
            <div className={styles.price} style={{ margin: 0, alignSelf: "center" }}>
              {room.price} / night
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionTight}>
        <div className={`container ${styles.detailGrid}`}>
          <div>
            <div className={styles.gallery}>
              {room.images.slice(0, 6).map((src) => (
                <figure key={src}>
                  <Image
                    src={src}
                    alt={room.name}
                    width={640}
                    height={480}
                    sizes="(max-width: 768px) 50vw, 28vw"
                  />
                </figure>
              ))}
            </div>
          </div>

          <aside className={styles.card}>
            <h3>Overview</h3>
            <p>{room.overview}</p>
            <div className={styles.specs}>
              <div>
                <strong>Rating:</strong>
                {room.specs.rating} · {room.specs.reviewLabel}
              </div>
              <div>
                <strong>Comfort:</strong>
                {room.specs.comfort}
              </div>
              <div>
                <strong>Facilities:</strong>
                {room.specs.facilities}
              </div>
              <div>
                <strong>Check-in:</strong>
                {room.specs.checkIn}
              </div>
              <div>
                <strong>Check-out:</strong>
                {room.specs.checkOut}
              </div>
            </div>
            <h3>Amenities</h3>
            <ul className={styles.list}>
              {room.amenities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className={styles.ctaRow}>
              <Link className={styles.btnPrimary} href="/contact">
                Reserve this room
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}