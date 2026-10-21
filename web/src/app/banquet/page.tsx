import type { Metadata } from "next";
import { BaselineHtml } from "@/components/BaselineHtml";
import { html } from "@/baseline/html/banquet";
import { pageIntros } from "@/data/pages";

export const metadata: Metadata = {
  title: "Banquet",
  description: pageIntros.banquet.metaDescription,
};

export default function BanquetPage() {
  return <BaselineHtml html={html} />;
}