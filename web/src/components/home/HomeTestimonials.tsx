import Image from "next/image";
import { homeTestimonials } from "@/data/home";
import styles from "./HomeTestimonials.module.css";

export function HomeTestimonials() {
  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <div className="container">
        <div className={styles.head}>
          <div className={styles.rating}> Sharhlar</div>
          <h2 id="testimonials-heading">
            Farqni ularning ko‘zi bilan ko‘ring
          </h2>
          <p>
            Har bir detalda g‘amxo‘rlikni his qilgan mehmonlardan chinakam
            fikrlar — jahon darajasidagi mehmondo‘stlik haqida.
          </p>
        </div>

        <div className={styles.grid}>
          {homeTestimonials.map((item) => (
            <article key={item.name} className={styles.card}>
              <p className={styles.quote}>{item.quote}</p>
              <div className={styles.person}>
                <Image
                  className={styles.avatar}
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                />
                <div>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.role}>{item.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}