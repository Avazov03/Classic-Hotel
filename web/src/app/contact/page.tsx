import type { Metadata } from "next";
import { BaselineHtml } from "@/components/BaselineHtml";
import { html } from "@/baseline/html/contact";
import { pageIntros } from "@/data/pages";

export const metadata: Metadata = {
  title: "Contact",
  description: pageIntros.contact.metaDescription,
};

export default function ContactPage() {
  return <BaselineHtml html={html} />;
}