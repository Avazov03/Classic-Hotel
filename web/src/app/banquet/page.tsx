import type { Metadata } from "next";
import { BaselineHtml } from "@/components/BaselineHtml";
import { html } from "@/baseline/html/banquet";
import { pageIntros } from "@/data/pages";

export const metadata: Metadata = {
  title: "Restoran",
  description: pageIntros.banquet.metaDescription,
};

export default function BanketPage() {
  return <BaselineHtml html={html} />;
}