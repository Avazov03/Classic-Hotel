import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BaselineHtml } from "@/components/BaselineHtml";
import { html as standard } from "@/baseline/html/room-standard-room";
import { html as seaView } from "@/baseline/html/room-sea-view-room";
import { html as executive } from "@/baseline/html/room-executive-suite";
import { getRoomBySlug, roomDetails } from "@/data/rooms";

const htmlBySlug: Record<string, string> = {
  "standard-room": standard,
  "sea-view-room": seaView,
  "executive-suite": executive,
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return roomDetails.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return { title: "Xona" };
  return { title: room.name, description: room.blurb };
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  const html = htmlBySlug[slug];
  if (!html) notFound();
  return <BaselineHtml html={html} />;
}