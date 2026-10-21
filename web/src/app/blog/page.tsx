import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PageIntroBlock } from "@/components/PageIntro";
import { blogPosts } from "@/data/blog";
import { pageIntros } from "@/data/pages";
import styles from "../ui.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: pageIntros.blog.metaDescription,
};

export default function BlogPage() {
  return (
    <>
      <PageHero page={pageIntros.blog} />
      <PageIntroBlock>{pageIntros.blog.intro}</PageIntroBlock>
      <section className={styles.section}>
        <div className={`container ${styles.grid3}`}>
          {blogPosts.map((post) => (
            <article key={post.slug} className={styles.mediaCard}>
              <div className={styles.media}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={720}
                  height={500}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className={styles.body}>
                {post.category ? (
                  <div className={styles.meta}>
                    <span className={styles.chip}>{post.category}</span>
                  </div>
                ) : null}
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <p style={{ marginBottom: "0.85rem", fontSize: "0.8rem" }}>
                  {post.date}
                  {post.author ? ` · ${post.author}` : ""}
                </p>
                <Link className={styles.link} href={`/blog/${post.slug}`}>
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}