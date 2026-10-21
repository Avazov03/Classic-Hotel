import type { Metadata } from "next";
import { BaselineHtml } from "@/components/BaselineHtml";
import { html } from "@/baseline/html/about";
import { pageIntros } from "@/data/pages";

export const metadata: Metadata = {
  title: "About us",
  description: pageIntros.about.metaDescription,
};

export default function AboutPage() {
  return <BaselineHtml html={html} />;
}