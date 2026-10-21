import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PageIntroBlock } from "@/components/PageIntro";
import { pageIntros } from "@/data/pages";
import { contact } from "@/data/site";
import styles from "../ui.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: pageIntros.contact.metaDescription,
};

export default function ContactPage() {
  return (
    <>
      <PageHero page={pageIntros.contact} />
      <PageIntroBlock>{pageIntros.contact.intro}</PageIntroBlock>
      <section className={styles.section}>
        <div className={`container ${styles.contactGrid}`}>
          <div className={styles.contactCard}>
            <h3>Reach us</h3>
            <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <p>{contact.address}</p>
            <p style={{ marginTop: "1rem" }}>
              Our support team is available to assist with bookings, inquiries,
              and special requests.
            </p>
          </div>

          <form className={styles.form} action="#" method="post">
            <div className={styles.field}>
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" type="text" required autoComplete="name" />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <div className={styles.field}>
              <label htmlFor="topic">Topic</label>
              <select id="topic" name="topic" defaultValue="reservation">
                <option value="reservation">Reservation</option>
                <option value="event">Event / banquet</option>
                <option value="dining">Dining</option>
                <option value="spa">Spa</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required />
            </div>
            <button className={styles.btnPrimary} type="submit">
              Send message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}