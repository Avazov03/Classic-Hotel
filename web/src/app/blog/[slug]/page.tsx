import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BaselineHtml } from "@/components/BaselineHtml";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";

type Props = { params: Promise<{ slug: string }> };

const postModules: Record<string, () => Promise<{ html: string }>> = {
  "creating-memorable-stays-through-genuine-hospitality": () =>
    import("@/baseline/html/post-creating-memorable-stays-through-genuine-hospitality"),
  "making-every-business-event-smooth-and-memorable": () =>
    import("@/baseline/html/post-making-every-business-event-smooth-and-memorable"),
  "indulge-in-luxurious-rooms-with-panoramic-sea-views": () =>
    import("@/baseline/html/post-indulge-in-luxurious-rooms-with-panoramic-sea-views"),
  "a-taste-journey-through-our-hotels-finest-culinary-creations": () =>
    import("@/baseline/html/post-a-taste-journey-through-our-hotels-finest-culinary-creations"),
  "open-the-door-to-roomy-living-made-for-whatever-you-want": () =>
    import("@/baseline/html/post-open-the-door-to-roomy-living-made-for-whatever-you-want"),
  "enjoy-a-vacation-that-feels-like-a-touch-of-heaven": () =>
    import("@/baseline/html/post-enjoy-a-vacation-that-feels-like-a-touch-of-heaven"),
  "crafting-special-events-that-turn-into-memories-youll-treasure": () =>
    import("@/baseline/html/post-crafting-special-events-that-turn-into-memories-youll-treasure"),
  "discover-the-latest-menu-updates-coming-this-march": () =>
    import("@/baseline/html/post-discover-the-latest-menu-updates-coming-this-march"),
  "the-april-issue-of-travel-magazine-featured-elbergo-hotel": () =>
    import("@/baseline/html/post-the-april-issue-of-travel-magazine-featured-elbergo-hotel"),
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Blog" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const loader = postModules[slug];
  if (!loader) notFound();
  const { html } = await loader();
  return <BaselineHtml html={html} />;
}