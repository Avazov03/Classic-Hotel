import type { Metadata } from "next";
import { BaselineHtml } from "@/components/BaselineHtml";
import { html } from "@/baseline/html/rooms";
import { pageIntros } from "@/data/pages";

export const metadata: Metadata = {
  title: "Xonalar",
  description: pageIntros.rooms.metaDescription,
};

export default function RoomsPage() {
  return <BaselineHtml html={html} />;
}