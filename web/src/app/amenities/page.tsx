import type { Metadata } from "next";
import { BaselineHtml } from "@/components/BaselineHtml";
import { html } from "@/baseline/html/amenities";
import { pageIntros } from "@/data/pages";

export const metadata: Metadata = {
  title: "Amenities",
  description: pageIntros.amenities.metaDescription,
};

export default function AmenitiesPage() {
  return <BaselineHtml html={html} />;
}