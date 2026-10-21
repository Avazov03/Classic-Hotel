import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import styles from "../../ui.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Blog" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <section className={styles.sectionTight}>
        <div className="container" style={{ maxWidth: "52rem" }}>
          <Link className={styles.link} href="/blog">
            Back to blog
          </Link>
          <div className={styles.meta} style={{ marginTop: "1.25rem" }}>
            {post.category ? <span className={styles.chip}>{post.category}</span> : null}
            <span className={styles.chip}>{post.date}</span>
          </div>
          <h1 style={{ marginTop: "1rem", marginBottom: "0.85rem" }}>{post.title}</h1>
          {post.author ? (
            <p style={{ color: "var(--color-deep-mocha-brown)", marginBottom: "1.5rem" }}>
              By {post.author}
            </p>
          ) : null}
          <div
            className={styles.media}
            style={{
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              marginBottom: "2rem",
              aspectRatio: "16 / 9",
            }}
          >
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={675}
              sizes="(max-width: 900px) 100vw, 52rem"
              priority
            />
          </div>
          <div className={styles.prose}>
            <p>{post.excerpt}</p>
            {post.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.ctaRow}>
            <Link className={styles.btnPrimary} href="/contact">
              Reserve your stay
            </Link>
            <Link className={styles.btnGhost} href="/blog">
              More stories
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}