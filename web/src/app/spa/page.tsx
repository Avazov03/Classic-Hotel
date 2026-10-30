import type { Metadata } from "next";
import { BaselineHtml } from "@/components/BaselineHtml";
import { html } from "@/baseline/html/spa";
import { pageIntros } from "@/data/pages";

export const metadata: Metadata = {
  title: "Bog‘ va teras",
  description: pageIntros.spa.metaDescription,
};

export default function SpaPage() {
  return <BaselineHtml html={html} />;
}