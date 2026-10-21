import Image from "next/image";
import Link from "next/link";
import { featuredRooms } from "@/data/home";
import styles from "./FeaturedRooms.module.css";

export function FeaturedRooms() {
  return (
    <section className={styles.section} aria-labelledby="rooms-heading">
      <div className="container">
        <div className={styles.head}>
          <h2 id="rooms-heading">Our Featured Rooms</h2>
        </div>

        <div className={styles.grid}>
          {featuredRooms.map((room) => (
            <article key={room.name} className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={room.image}
                  alt={room.name}
                  width={640}
                  height={440}
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 25vw"
                />
              </div>
              <div className={styles.body}>
                <h3>{room.name}</h3>
                <p className={styles.blurb}>{room.blurb}</p>
                <div className={styles.meta}>
                  <div>
                    <strong>Size:</strong>
                    {room.size}
                  </div>
                  <div>
                    <strong>View:</strong>
                    {room.view}
                  </div>
                  <div>
                    <strong>Features:</strong>
                    {room.features}
                  </div>
                  <div>
                    <strong>Perfect for:</strong>
                    {room.perfectFor}
                  </div>
                </div>
                <Link className={styles.link} href="/rooms">
                  Experience comfort
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}