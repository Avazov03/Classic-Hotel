import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
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
          <ContactForm />
        </div>
      </section>
    </>
  );
}