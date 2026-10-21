import type { Metadata } from "next";
import { BaselineHtml } from "@/components/BaselineHtml";
import { html } from "@/baseline/html/amenities";
import { pageIntros } from "@/data/pages";

export const metadata: Metadata = {
  title: "Qulayliklar",
  description: pageIntros.amenities.metaDescription,
};

export default function QulayliklarPage() {
  return <BaselineHtml html={html} />;
}